import { useEffect, useState } from 'react';
interface Breakdown { amtFactor:number; deviceFactor:number; catFactor:number; typeFactor:number; timeFactor:number }
export default function ScoreBreakdown({ score, breakdown }: { score:number; breakdown:Breakdown }) {
  const [displayScore,setDisplayScore] = useState(0);
  useEffect(()=>{ const timer = setTimeout(()=>setDisplayScore(score),50); return ()=>clearTimeout(timer); },[score]);
  
  const factors = [
    {label:'Amount',val:breakdown.amtFactor,icon:'💰',weight:25,color:'#6366f1'},
    {label:'Device',val:breakdown.deviceFactor,icon:'📱',weight:30,color:'#a855f7'},
    {label:'Category',val:breakdown.catFactor,icon:'🏷️',weight:25,color:'#ec4899'},
    {label:'Type',val:breakdown.typeFactor,icon:'📤',weight:15,color:'#3b82f6'},
    {label:'Time',val:breakdown.timeFactor,icon:'🕐',weight:5,color:'#22c55e'}
  ];
  
  const getDecision = (score: number) => {
    if (score <= 60) return { label: 'ALLOW', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' };
    if (score <= 80) return { label: 'REVIEW', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' };
    return { label: 'BLOCK', color: '#dc2626', bg: 'rgba(220,38,38,0.1)' };
  };
  
  const decision = getDecision(displayScore);
  
  return (
    <div className="card card-elevated">
      <div style={{marginBottom:24}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <h3 style={{margin:0}}>Risk Breakdown</h3>
          <div style={{padding:'6px 16px',borderRadius:50,background:decision.bg,border:`1px solid ${decision.color}`}}>
            <span style={{fontWeight:700,color:decision.color,fontSize:12}}>{decision.label}</span>
          </div>
        </div>
        
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:12}}>
          <span style={{fontSize:12,opacity:.7,fontWeight:600}}>Score</span>
          <span style={{fontSize:48,fontWeight:700,background:`linear-gradient(135deg,#2563eb,${displayScore>80?'#dc2626':displayScore>60?'#f59e0b':'#10b981'})`,backgroundClip:'text',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{displayScore.toFixed(0)}</span>
        </div>
        
        <div style={{height:10,background:'#1e293b',borderRadius:6,overflow:'hidden'}}>
          <div style={{height:'100%',background:`linear-gradient(90deg,#10b981 0%,#f59e0b 50%,#dc2626 100%)`,width:`${displayScore}%`,transition:'width .6s cubic-bezier(.34,.1,.68,.55)'}} />
        </div>
        
        <div style={{display:'flex',justifyContent:'space-between',marginTop:10,fontSize:11,opacity:0.6}}>
          <span>Allow (0-60)</span>
          <span>Review (60-80)</span>
          <span>Block (80-100)</span>
        </div>
      </div>
      
      <div style={{borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:24}}>
        <h4 style={{margin:'0 0 16px 0',fontSize:12,opacity:0.7,textTransform:'uppercase',fontWeight:700}}>Factor Contributions</h4>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(110px,1fr))',gap:12}}>
          {factors.map(({label,val,icon,weight,color})=>{
            const contribution = val * weight;
            return (
              <div key={label} style={{background:`linear-gradient(135deg,${color}20,${color}05)`,padding:12,borderRadius:10,border:`1px solid ${color}30`,textAlign:'center'}}>
                <div style={{fontSize:24,marginBottom:6}}>{icon}</div>
                <div style={{fontSize:10,opacity:.7,marginBottom:4,fontWeight:600}}>{label}</div>
                <div style={{display:'flex',flexDirection:'column',gap:2}}>
                  <div style={{fontSize:12,fontWeight:700,color:color}}>{(val*100).toFixed(0)}%</div>
                  <div style={{fontSize:9,opacity:.6}}>×{weight}w</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div style={{borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:16,marginTop:16}}>
        <p style={{margin:0,fontSize:12,opacity:0.7,lineHeight:1.6}}>
          <strong>💡 Tip:</strong> Higher device factor = less trusted. Change device status to see score drop. Unusual categories & late-night transactions increase risk.
        </p>
      </div>
    </div>
  );
}
