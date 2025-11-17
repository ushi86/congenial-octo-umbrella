import type { NextApiRequest, NextApiResponse } from 'next';

export interface Reason { feature: string; contribution: number; description?: string }
export interface Transaction {
  id: string; amount: number; merchant: string; merchant_category: string; txn_type: string;
  device_new: boolean; timestamp: string; score: number; decision: 'allow'|'review'|'block';
  reasons: Reason[]; model_version: string; user_marked?: 'genuine'|'fraud';
}

let transactions: Transaction[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.json({ transactions });
  }
  if (req.method === 'POST') {
    const { amount, merchant, merchant_category, txn_type, device_new, score, decision, reasons, model_version } = req.body;
    if ([amount, merchant, merchant_category, txn_type, device_new, score, decision, reasons, model_version].some(v => v === undefined)) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const txn: Transaction = {
      id: Math.random().toString(36).slice(2),
      amount, merchant, merchant_category, txn_type, device_new,
      timestamp: new Date().toISOString(), score, decision, reasons, model_version
    };
    transactions.unshift(txn);
    return res.status(201).json({ transaction: txn });
  }
  if (req.method === 'PUT') {
    const { id, user_marked } = req.body as { id: string; user_marked: 'genuine'|'fraud' };
    const idx = transactions.findIndex(t => t.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    transactions[idx].user_marked = user_marked;
    return res.json({ transaction: transactions[idx] });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
