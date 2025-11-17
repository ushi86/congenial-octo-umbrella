import type { NextApiRequest, NextApiResponse } from 'next';

interface ScoreBody {
  amount: number;
  merchant: string;
  merchant_category: string;
  txn_type: string;
  device_new: boolean;
}

function sigmoid(x: number) { return 1 / (1 + Math.exp(-x)); }

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { amount, merchant, merchant_category, txn_type, device_new } = req.body as ScoreBody;
  if (amount == null) return res.status(400).json({ error: 'Missing amount' });
  const amtFactor = Math.log10(Math.max(1, amount));
  const deviceFactor = device_new ? 1.5 : 0.4;
  const catFactor = ['luxury','gambling'].includes(merchant_category.toLowerCase()) ? 1.3 : 0.5;
  const typeFactor = txn_type === 'transfer' ? 1.1 : 0.6;
  const raw = amtFactor * 0.8 + deviceFactor * 0.7 + catFactor * 0.6 + typeFactor * 0.5;
  const score = sigmoid(raw) * 100;
  let decision: 'allow'|'review'|'block' = 'allow';
  if (score > 80) decision = 'block'; else if (score > 55) decision = 'review';
  const reasons = [
    { feature: 'amount', contribution: amtFactor, description: 'Magnitude of transaction amount' },
    { feature: 'device_new', contribution: deviceFactor, description: 'New device risk weight' },
    { feature: 'merchant_category', contribution: catFactor, description: 'Category risk profile' },
    { feature: 'txn_type', contribution: typeFactor, description: 'Transaction type pattern' }
  ];
  res.json({ score, decision, reasons, model_version: 'v1-demo' });
}
