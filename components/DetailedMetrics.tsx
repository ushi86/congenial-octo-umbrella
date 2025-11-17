interface Reason { feature:string; contribution:number; subScore?:number; description?:string }
export default function DetailedMetrics({ reasons }: { reasons: Reason[] }) {
  return (
    <div className="card card-elevated">
      <h3 style={{marginTop:0}}>Metric Breakdown</h3>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {reasons.map(r => (
          <div key={r.feature} style={{background:'rgba(255,255,255,.05)',padding:12,borderRadius:8,borderLeft:'3px solid #2563eb'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
              <span style={{fontWeight:600,fontSize:14}}>{r.feature}</span>
              <span style={{fontSize:12,opacity:.7}}>{r.description}</span>
            </div>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <div style={{flex:1,height:6,background:'#334155',borderRadius:3,overflow:'hidden'}}>
                <div style={{height:'100%',background:'linear-gradient(90deg,#2563eb,#9333ea)',width:`${Math.min(100,(r.subScore||0)*100)}%`}} />
              </div>
              <span style={{fontSize:11,opacity:.6,minWidth:45}}>{((r.subScore||0)*100).toFixed(0)}%</span>
            </div>
            <span style={{fontSize:11,opacity:.5,marginTop:4,display:'block'}}>Weight: {(r.contribution*100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
