import { markTxn, type Transaction } from '../lib/mockClient';
import { useState } from 'react';

interface Props { transactions: Transaction[]; onUpdate: () => void }

export default function TxnTable({ transactions, onUpdate }: Props) {
  const [marking,setMarking] = useState<string|null>(null);

  async function doMark(id:string, value:'genuine'|'fraud') {
    setMarking(id);
    try { await markTxn(id, value); onUpdate(); } finally { setMarking(null); }
  }

  return (
    <div style={{background:'#fff',padding:16,border:'1px solid #ddd',borderRadius:8}}>
      <h3>Transactions ({transactions.length})</h3>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
        <thead>
          <tr style={{textAlign:'left'}}>
            <th>ID</th><th>Amt</th><th>Merchant</th><th>Score</th><th>Decision</th><th>User Mark</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id} style={{borderTop:'1px solid #eee'}}>
              <td>{t.id.slice(0,6)}</td>
              <td>{t.amount}</td>
              <td>{t.merchant}</td>
              <td>{t.score.toFixed(1)}</td>
              <td>{t.decision}</td>
              <td>{t.user_marked || '-'}</td>
              <td>
                <button disabled={marking===t.id} onClick={()=>doMark(t.id,'genuine')} style={{marginRight:4}}>Genuine</button>
                <button disabled={marking===t.id} onClick={()=>doMark(t.id,'fraud')}>Fraud</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
