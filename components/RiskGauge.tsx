import { useEffect, useState } from 'react';
export default function RiskGauge({ score }: { score: number }) {
  const [display,setDisplay] = useState(0);
  useEffect(()=>{ const start=display; const end=score; const t0=performance.now(); const dur=600; function step(ts:number){ const p=Math.min(1,(ts-t0)/dur); const eased=1-Math.pow(1-p,3); setDisplay(start + (end-start)*eased); if(p<1) requestAnimationFrame(step); } requestAnimationFrame(step); },[score]);
  const pct = Math.min(100, Math.max(0, display));
  const strokePct = pct / 100 * 283; // circumference ~ 2*pi*45
  let badgeClass = 'badge-allow';
  if (score > 80) badgeClass = 'badge-block'; else if (score > 55) badgeClass = 'badge-review';
  return (
    <div className="card" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12}}>
      <h3 style={{margin:0}}>Risk Gauge</h3>
      <div style={{position:'relative'}}>
        <svg className="gauge" viewBox="0 0 120 120">
          <circle cx={60} cy={60} r={45} stroke="#334155" strokeWidth={12} fill="none" />
          <circle cx={60} cy={60} r={45} stroke="url(#grad)" strokeWidth={12} fill="none" strokeLinecap="round" strokeDasharray="283" strokeDashoffset={283-strokePct} style={{transition:'stroke-dashoffset .3s'}} />
          <defs>
            <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
          <text x={60} y={65} textAnchor="middle" fontSize={28} fontWeight={600} fill="var(--fg)">{Math.round(pct)}</text>
        </svg>
      </div>
      <span className={`badge ${badgeClass}`}>{badgeClass.replace('badge-','').toUpperCase()}</span>
    </div>
  );
}
