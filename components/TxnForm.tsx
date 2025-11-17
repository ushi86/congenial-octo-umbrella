import { useState } from 'react';
import { scoreTxn, createTxn } from '../lib/mockClient';

interface Props { onCreated: () => void }

export default function TxnForm({ onCreated }: Props) {
  const [amount,setAmount] = useState(100);
  const [merchant,setMerchant] = useState('Store');
  const [merchantCategory,setMerchantCategory] = useState('general');
  const [txnType,setTxnType] = useState('purchase');
  const [deviceNew,setDeviceNew] = useState(false);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState<string|undefined>();
  const [result,setResult] = useState<any>(null);

  async function handleSubmit(e:any){
    e.preventDefault();
    setLoading(true); setError(undefined); setResult(null);
    try {
      const scored = await scoreTxn({ amount, merchant, merchant_category: merchantCategory, txn_type: txnType, device_new: deviceNew });
      const created = await createTxn({ amount, merchant, merchant_category: merchantCategory, txn_type: txnType, device_new: deviceNew, score: scored.score, decision: scored.decision, reasons: scored.reasons, model_version: scored.model_version });
      setResult(created.transaction); onCreated();
    } catch (err:any){ setError(err.message); } finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} style={{background:'#fff',padding:16,border:'1px solid #ddd',borderRadius:8,display:'flex',flexDirection:'column',gap:8}}>
      <h3>Create Transaction</h3>
      <label>Amount <input type="number" value={amount} onChange={e=>setAmount(parseFloat(e.target.value)||0)} /></label>
      <label>Merchant <input value={merchant} onChange={e=>setMerchant(e.target.value)} /></label>
      <label>Category <input value={merchantCategory} onChange={e=>setMerchantCategory(e.target.value)} /></label>
      <label>Type <select value={txnType} onChange={e=>setTxnType(e.target.value)}><option>purchase</option><option>transfer</option></select></label>
      <label><input type="checkbox" checked={deviceNew} onChange={e=>setDeviceNew(e.target.checked)} /> New Device?</label>
      <button disabled={loading} style={{padding:'8px 12px',background:'#2563eb',color:'#fff',border:'none',borderRadius:4}}>{loading?'Scoring...':'Score & Create'}</button>
      {error && <div style={{color:'red'}}>{error}</div>}
      {result && <div style={{fontSize:12}}>Created ID: {result.id} Decision: {result.decision} Score: {Math.round(result.score)}</div>}
    </form>
  );
}
