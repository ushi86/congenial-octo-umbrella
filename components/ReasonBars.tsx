interface Reason { feature:string; contribution:number; description?:string }
export default function ReasonBars({ reasons }: { reasons: Reason[] }) {
  const max = Math.max(...reasons.map(r=>Math.abs(r.contribution)),1);
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Top Contributions</h3>
      <div className="reasons">
        {reasons.map(r => {
          const pct = Math.round(Math.abs(r.contribution)/max * 100);
          return (
            <div key={r.feature} className="reason-bar" title={`${r.feature}: ${pct}%`}>
              <div className="reason-bar-fill" style={{height:`${pct}%`}} />
              <span>{r.feature}</span>
            </div>
          );
        })}
      </div>
      <p style={{fontSize:12,opacity:.7,marginTop:8}}>Bars scale relative to largest absolute contribution.</p>
    </div>
  );
}
