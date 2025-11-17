import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { fetchTxns, type Transaction } from '../lib/mockClient';

export default function Admin(){
  const [txns,setTxns] = useState<Transaction[]>([]);
  useEffect(()=>{ fetchTxns().then(d=>setTxns(d.transactions)); },[]);
  const flagged = txns.filter(t=>t.decision!=='allow').length;
  const fraudMarked = txns.filter(t=>t.user_marked==='fraud').length;
  return (
    <div style={{fontFamily:'sans-serif'}}>
      <Header />
      <main style={{padding:32,maxWidth:900,margin:'0 auto'}}>
        <h1>Admin Dashboard</h1>
        <p>Total Transactions: {txns.length}</p>
        <p>Flagged (review/block): {flagged}</p>
        <p>Marked Fraud: {fraudMarked}</p>
        <p>Precision Demo: {flagged? (fraudMarked/flagged).toFixed(2):'n/a'}</p>
      </main>
    </div>
  );
}
