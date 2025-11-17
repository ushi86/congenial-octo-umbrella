import { useState } from 'react';
export default function FormFieldsets({ amount, setAmount, deviceNew, setDeviceNew, category, setCategory, type, setType, hour, setHour }: any) {
  const [amountError, setAmountError] = useState('');
  
  const handleAmount = (val: number) => {
    setAmount(val);
    if (val > 10000) setAmountError('⚠️ Very high amount');
    else if (val < 1) setAmountError('❌ Min ₹1');
    else setAmountError('');
  };

  return (
    <div className="card card-form">
      <h2 style={{marginTop:0,marginBottom:16}}>Transaction Details</h2>
      
      <fieldset className="form-fieldset">
        <legend>Amount & Timing</legend>
        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <div style={{position:'relative'}}>
            <span style={{position:'absolute',left:10,top:10,fontSize:18}}>₹</span>
            <input id="amount" type="number" value={amount} onChange={e=>handleAmount(parseFloat(e.target.value)||0)} style={{paddingLeft:28}} min={0} max={100000} />
          </div>
          {amountError && <span style={{fontSize:11,color:'#f59e0b'}}>{amountError}</span>}
          <span style={{fontSize:11,opacity:.6}}>Typical: ₹50–₹5000</span>
        </div>

        <div className="form-group">
          <label htmlFor="hour">Time of Day</label>
          <input id="hour" type="range" min={0} max={23} value={hour} onChange={e=>setHour(parseInt(e.target.value))} style={{width:'100%'}} />
          <span style={{fontSize:11,opacity:.6}}>{String(hour).padStart(2,'0')}:00 {hour<6 || hour>=22 ? '🌙 Night risk' : '☀️ Normal hours'}</span>
        </div>
      </fieldset>

      <fieldset className="form-fieldset">
        <legend>Transaction Profile</legend>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" value={category} onChange={e=>setCategory(e.target.value)}>
            <option value="food">🍔 Food & Groceries</option>
            <option value="utilities">⚡ Utilities & Bills</option>
            <option value="general">🛍️ General Retail</option>
            <option value="luxury">💎 Luxury Goods</option>
            <option value="gambling">🎰 Gaming & Gambling</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="type">Transaction Type</label>
          <select id="type" value={type} onChange={e=>setType(e.target.value)}>
            <option value="purchase">💳 Purchase</option>
            <option value="transfer">💸 Transfer</option>
          </select>
        </div>
      </fieldset>

      <fieldset className="form-fieldset">
        <legend>Device Risk</legend>
        <label className="checkbox-label">
          <input type="checkbox" checked={deviceNew} onChange={e=>setDeviceNew(e.target.checked)} />
          <span>New or Unrecognized Device</span>
          {deviceNew && <span style={{fontSize:11,marginLeft:8,color:'#ef4444'}}>⚠️ High risk</span>}
        </label>
      </fieldset>
    </div>
  );
}
