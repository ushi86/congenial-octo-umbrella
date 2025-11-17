import Link from 'next/link';
import { useState, useMemo } from 'react';

interface Reason { feature: string; contribution: number; description?: string }
interface ScoreResult { score: number; decision: 'allow' | 'review' | 'block'; reasons: Reason[] }

// Enhanced fraud scoring heuristic with detailed sub-scores
function computeScore(params: {
  amount: number;
  merchantName: string;
  merchantCategory: string;
  deviceNew: boolean;
  timeOfDay: number; // 0-23
  velocity: number; // txns per hour
  locationRisk: number; // 0-1
  type: 'purchase' | 'transfer';
  previousTxnAmount: number;
  amountDeviation: number; // std dev factor
}): ScoreResult {
  const reasons: Reason[] = [];

  // Amount scoring (0-100, normalized log)
  const amountLog = Math.log10(Math.max(1, params.amount));
  const expectedAvg = 5; // log(100000)
  const amountDeviation = Math.abs(amountLog - expectedAvg) * 15;
  reasons.push({ feature: 'amount', contribution: Math.min(20, amountDeviation), description: `${params.amount} rupees deviation` });

  // Device scoring (20 if new)
  const deviceScore = params.deviceNew ? 20 : 2;
  reasons.push({ feature: 'device', contribution: deviceScore, description: params.deviceNew ? 'New/unregistered device' : 'Known device' });

  // Time of day scoring (late night = higher risk)
  let timeScore = 0;
  if (params.timeOfDay >= 2 && params.timeOfDay <= 5) timeScore = 18; // 2-5 AM
  else if (params.timeOfDay >= 0 || params.timeOfDay <= 1) timeScore = 12; // midnight-1 AM
  else if (params.timeOfDay >= 23) timeScore = 12; // 11 PM onwards
  else timeScore = 3; // Normal hours
  reasons.push({ feature: 'time', contribution: timeScore, description: `${params.timeOfDay}:00 - Unusual timing` });

  // Category scoring
  let categoryScore = 0;
  const riskyCategories = ['gambling', 'luxury', 'adult', 'crypto'];
  const moderateCategories = ['travel', 'dating'];
  if (riskyCategories.includes(params.merchantCategory.toLowerCase())) categoryScore = 18;
  else if (moderateCategories.includes(params.merchantCategory.toLowerCase())) categoryScore = 10;
  else categoryScore = 2;
  reasons.push({ feature: 'category', contribution: categoryScore, description: params.merchantCategory });

  // Velocity scoring (transactions per hour)
  const velocityScore = Math.min(25, params.velocity * 4); // Up to 25
  reasons.push({ feature: 'velocity', contribution: velocityScore, description: `${params.velocity} txns/hour` });

  // Location scoring (0-1 risk score maps to 0-15)
  const locationScore = params.locationRisk * 15;
  reasons.push({ feature: 'location', contribution: locationScore, description: locationScore > 8 ? 'Distant from usual area' : 'Normal location' });

  // Type scoring
  const typeScore = params.type === 'transfer' ? 12 : 4;
  reasons.push({ feature: 'type', contribution: typeScore, description: params.type === 'transfer' ? 'Peer transfer (higher risk)' : 'Merchant purchase' });

  // Amount variance scoring (consistency)
  let varianceScore = 0;
  if (params.amountDeviation > 2) varianceScore = 15; // Unusual variance
  else if (params.amountDeviation > 1) varianceScore = 8;
  else varianceScore = 0;
  reasons.push({ feature: 'variance', contribution: varianceScore, description: `Deviation: ${params.amountDeviation.toFixed(1)}x normal` });

  // Sum all contributions
  const rawScore = reasons.reduce((sum, r) => sum + r.contribution, 0);
  
  // Apply sigmoid and scale to 0-100
  const sigmoid = (x: number) => 100 / (1 + Math.exp(-x / 15));
  const score = Math.min(100, sigmoid(rawScore - 20));

  // Decision thresholds
  let decision: 'allow' | 'review' | 'block' = 'allow';
  if (score > 85) decision = 'block';
  else if (score > 55) decision = 'review';

  return { score, decision, reasons };
}

export default function SimulatePage() {
  const [amount, setAmount] = useState(500);
  const [merchantName, setMerchantName] = useState('Starbucks');
  const [merchantCategory, setMerchantCategory] = useState('food');
  const [deviceNew, setDeviceNew] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState(14);
  const [velocity, setVelocity] = useState(2);
  const [locationRisk, setLocationRisk] = useState(0.2);
  const [type, setType] = useState<'purchase' | 'transfer'>('purchase');
  const [previousTxnAmount, setPreviousTxnAmount] = useState(300);
  const [amountDeviation, setAmountDeviation] = useState(0.5);

  const result = useMemo(() => {
    return computeScore({
      amount, merchantName, merchantCategory, deviceNew, timeOfDay,
      velocity, locationRisk, type, previousTxnAmount, amountDeviation
    });
  }, [amount, merchantName, merchantCategory, deviceNew, timeOfDay, velocity, locationRisk, type, previousTxnAmount, amountDeviation]);

  return (
    <div style={{ minHeight: '100vh', position:'relative', overflow:'hidden', background: 'linear-gradient(135deg, #0a0118 0%, #1e0a3c 50%, #0a0118 100%)' }}>
      {/* Background orbs + grid */}
      <div style={{position:'absolute',top:'-20%',right:'-10%',width:'700px',height:'700px',background:'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)',borderRadius:'50%',pointerEvents:'none'}} />
      <div style={{position:'absolute',bottom:'-20%',left:'-10%',width:'600px',height:'600px',background:'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',borderRadius:'50%',pointerEvents:'none'}} />
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)',backgroundSize:'50px 50px',opacity:.25,pointerEvents:'none'}} />

      {/* Header */}
      <div style={{ position:'sticky', top:0, zIndex:5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px', backdropFilter:'blur(10px)', background:'rgba(17,24,39,0.35)', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
        <Link href="/">
          <span className="nav-back">← Back</span>
        </Link>
        <div style={{display:'inline-flex',alignItems:'baseline',gap:8}}>
          <span style={{fontFamily:'Oswald, sans-serif',fontSize:22,fontWeight:800,letterSpacing:1}}>UFD</span>
          <span style={{opacity:.8,fontSize:12}}>Simulator</span>
        </div>
        <div />
      </div>

      <div className="container">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', maxWidth: '1400px' }}>
          {/* Form Section */}
          <div className="card card-form fade-in" style={{backdropFilter:'blur(14px)'}}>
            <h2 style={{ marginTop: 0 }}>Transaction Parameters</h2>

            <fieldset className="form-fieldset">
              <legend>Amount & Merchant</legend>
              <div className="form-group">
                <label>Transaction Amount (₹)</label>
                <input type="number" value={amount} onChange={e => setAmount(parseFloat(e.target.value) || 0)} min="1" max="100000" />
                <small style={{opacity:.6}}>₹{amount}</small>
              </div>
              <div className="form-group">
                <label>Merchant Name</label>
                <input type="text" value={merchantName} onChange={e => setMerchantName(e.target.value)} placeholder="e.g., Starbucks" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={merchantCategory} onChange={e => setMerchantCategory(e.target.value)}>
                  <option value="food">🍔 Food & Dining</option>
                  <option value="retail">🛍️ Retail</option>
                  <option value="travel">✈️ Travel</option>
                  <option value="entertainment">🎬 Entertainment</option>
                  <option value="utilities">💡 Utilities</option>
                  <option value="luxury">💎 Luxury</option>
                  <option value="gambling">🎰 Gambling</option>
                  <option value="crypto">₿ Crypto</option>
                </select>
              </div>
            </fieldset>

            <fieldset className="form-fieldset">
              <legend>Device & Location</legend>
              <label className="checkbox-label">
                <input type="checkbox" checked={deviceNew} onChange={e => setDeviceNew(e.target.checked)} />
                New/Unregistered Device?
              </label>
              <div className="form-group">
                <label>Location Risk (0 = home, 1 = distant)</label>
                <input type="range" min="0" max="1" step="0.1" value={locationRisk} onChange={e => setLocationRisk(parseFloat(e.target.value))} />
                <small style={{opacity:.6}}>{(locationRisk * 100).toFixed(0)}% risk</small>
              </div>
            </fieldset>

            <fieldset className="form-fieldset">
              <legend>Timing & Behavior</legend>
              <div className="form-group">
                <label>Time of Day (Hour)</label>
                <input type="range" min="0" max="23" value={timeOfDay} onChange={e => setTimeOfDay(parseInt(e.target.value))} />
                <small style={{opacity:.6}}>{String(timeOfDay).padStart(2, '0')}:00 {timeOfDay < 12 ? 'AM' : 'PM'}</small>
              </div>
              <div className="form-group">
                <label>Transaction Velocity (per hour)</label>
                <input type="range" min="0" max="10" step="0.5" value={velocity} onChange={e => setVelocity(parseFloat(e.target.value))} />
                <small style={{opacity:.6}}>{velocity} transactions/hour</small>
              </div>
              <div className="form-group">
                <label>Amount Deviation (vs normal spending)</label>
                <input type="range" min="0.1" max="5" step="0.1" value={amountDeviation} onChange={e => setAmountDeviation(parseFloat(e.target.value))} />
                <small style={{opacity:.6}}>{amountDeviation.toFixed(1)}x normal</small>
              </div>
            </fieldset>

            <fieldset className="form-fieldset">
              <legend>Transaction Type</legend>
              <label className="checkbox-label">
                <input type="radio" name="type" value="purchase" checked={type === 'purchase'} onChange={() => setType('purchase')} />
                Merchant Purchase
              </label>
              <label className="checkbox-label">
                <input type="radio" name="type" value="transfer" checked={type === 'transfer'} onChange={() => setType('transfer')} />
                Peer-to-Peer Transfer
              </label>
            </fieldset>
          </div>

          {/* Results Section */}
          <div className="fade-in">
            <div className="card card-elevated" style={{ textAlign: 'center', marginBottom: 24, backdropFilter:'blur(14px)' }}>
              <h2 style={{ margin: '0 0 24px' }}>Risk Score</h2>
              <svg viewBox="0 0 120 120" style={{ width: 180, height: 180, margin: '0 auto' }}>
                <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,.1)" strokeWidth="12" fill="none" />
                <circle
                  cx="60" cy="60" r="50" stroke={result.decision === 'block' ? '#ef4444' : result.decision === 'review' ? '#f59e0b' : '#10b981'}
                  strokeWidth="12" fill="none" strokeLinecap="round"
                  strokeDasharray={`${(result.score / 100) * 314} 314`}
                  style={{ transition: 'stroke-dasharray .4s cubic-bezier(.4,.2,.2,1)' }}
                />
                <text x="60" y="70" textAnchor="middle" fontSize="36" fontWeight="700" fill="var(--fg)">{Math.round(result.score)}</text>
              </svg>
              <p style={{ margin: '12px 0 0', opacity: 0.8 }}>
                Decision: <span className={`badge badge-${result.decision}`}>{result.decision.toUpperCase()}</span>
              </p>
            </div>

            <div className="card card-elevated" style={{backdropFilter:'blur(14px)'}}>
              <h3 style={{ marginTop: 0 }}>Contribution Breakdown</h3>
              {(() => {
                const icon = (key:string) => ({
                  amount:'💰', device:'📱', time:'🕐', category:'🏷️', velocity:'⚡', location:'📍', type:'📤', variance:'📈'
                } as Record<string,string>)[key.toLowerCase()] || '🔹';
                const label = (key:string) => key.charAt(0).toUpperCase()+key.slice(1);
                const max = Math.max(...result.reasons.map(x=>x.contribution), 1);
                const sorted = [...result.reasons].sort((a,b)=>b.contribution-a.contribution);
                return (
                  <div style={{display:'grid',gap:12,marginTop:12}}>
                    {sorted.map((r,i)=>{
                      const pct = Math.min(100, (r.contribution / max) * 100);
                      const hue = 220 - Math.min(200, Math.round(pct*2));
                      return (
                        <div key={r.feature} style={{
                          display:'grid', gridTemplateColumns:'auto 1fr auto', alignItems:'center', gap:14,
                          background:'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
                          border:'1px solid rgba(255,255,255,0.12)', borderRadius:12, padding:12
                        }}>
                          <div style={{
                            width:40,height:40,borderRadius:10,display:'grid',placeItems:'center',
                            background:`linear-gradient(135deg, hsla(${hue},80%,60%,.35), hsla(${hue+20},80%,55%,.2))`,
                            border:'1px solid rgba(255,255,255,0.15)'
                          }}>{icon(r.feature)}</div>
                          <div>
                            <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                              <strong style={{fontFamily:'Oswald, sans-serif',letterSpacing:.5}}>{label(r.feature)}</strong>
                              {r.description && (
                                <span style={{fontSize:11,opacity:.75,background:'rgba(255,255,255,0.06)',padding:'4px 8px',borderRadius:999,border:'1px solid rgba(255,255,255,0.1)'}}>{r.description}</span>
                              )}
                            </div>
                            <div style={{height:8,background:'rgba(255,255,255,0.08)',borderRadius:6,marginTop:8,overflow:'hidden'}}>
                              <div style={{width:`${pct}%`,height:'100%',background:`linear-gradient(90deg, hsla(${hue},85%,60%,1), hsla(${hue+20},85%,60%,.9))`,transition:'width .5s cubic-bezier(.4,.2,.2,1)'}} />
                            </div>
                          </div>
                          <div style={{
                            fontSize:12,fontWeight:800,letterSpacing:.5,background:'rgba(255,255,255,0.06)',padding:'6px 10px',borderRadius:999,border:'1px solid rgba(255,255,255,0.12)'
                          }}>{r.contribution.toFixed(1)} pts</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
