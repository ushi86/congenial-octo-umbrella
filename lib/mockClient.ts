export interface Reason { feature: string; contribution: number; description?: string }
export interface ScoreResponse { score: number; decision: 'allow'|'review'|'block'; reasons: Reason[]; model_version: string }
export interface Transaction extends ScoreResponse {
  id: string; amount: number; merchant: string; merchant_category: string; txn_type: string; device_new: boolean; timestamp: string; user_marked?: 'genuine'|'fraud';
}

export async function scoreTxn(body: { amount: number; merchant: string; merchant_category: string; txn_type: string; device_new: boolean }): Promise<ScoreResponse> {
  const res = await fetch('/api/mock/score', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error('Score failed');
  return res.json();
}

export async function createTxn(body: { amount: number; merchant: string; merchant_category: string; txn_type: string; device_new: boolean; score: number; decision: string; reasons: Reason[]; model_version: string }) {
  const res = await fetch('/api/mock/transactions', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
  if (!res.ok) throw new Error('Create failed');
  return res.json();
}

export async function fetchTxns(): Promise<{ transactions: Transaction[] }> {
  const res = await fetch('/api/mock/transactions');
  if (!res.ok) throw new Error('Fetch failed');
  return res.json();
}

export async function markTxn(id: string, user_marked: 'genuine'|'fraud') {
  const res = await fetch('/api/mock/transactions', { method: 'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id, user_marked }) });
  if (!res.ok) throw new Error('Mark failed');
  return res.json();
}
