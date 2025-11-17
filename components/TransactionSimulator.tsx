import { useState, useMemo } from 'react';
import FormFieldsets from './FormFieldsets';
import RiskGauge from './RiskGauge';
import DetailedMetrics from './DetailedMetrics';
import ScoreBreakdown from './ScoreBreakdown';

interface Reason { feature:string; contribution:number; description?:string; subScore?:number }

function sigmoid(x:number){ return 1/(1+Math.exp(-x)); }
function scoreHeuristic(amount:number, deviceNew:boolean, category:string, type:string, hour:number=12){
  const amtSubScore = amount > 5000 ? 0.95 : amount < 10 ? 0.85 : Math.log10(Math.max(1, amount))/Math.log10(5000);
  const amtFactor = amtSubScore * 0.25;
  
  const deviceSubScore = deviceNew ? 0.9 : 0.2;
  const deviceFactor = deviceSubScore * 0.30;
  
  const catMap: Record<string,number> = { 'luxury':0.95, 'gambling':0.98, 'general':0.4, 'food':0.15, 'utilities':0.2 };
  const catSubScore = catMap[category.toLowerCase()] || 0.4;
  const catFactor = catSubScore * 0.25;
  
  const typeSubScore = type === 'transfer' ? 0.7 : 0.3;
  const typeFactor = typeSubScore * 0.15;
  
  const timeSubScore = (hour < 6 || hour >= 22) ? 0.75 : 0.25;
  const timeFactor = timeSubScore * 0.05;
  
  const raw = amtFactor + deviceFactor + catFactor + typeFactor + timeFactor;
  const score = Math.min(100, raw * 100);
  
  let decision: 'allow'|'review'|'block' = 'allow';
  if (score > 80) decision = 'block'; else if (score > 60) decision = 'review';
  
  const reasons:Reason[] = [
    { feature:'Amount', contribution:amtFactor, description:`₹${amount}`, subScore:amtSubScore },
    { feature:'Device', contribution:deviceFactor, description:deviceNew?'New':'Known', subScore:deviceSubScore },
    { feature:'Category', contribution:catFactor, description:category, subScore:catSubScore },
    { feature:'Type', contribution:typeFactor, description:type, subScore:typeSubScore },
    { feature:'Time', contribution:timeFactor, description:`${String(hour).padStart(2,'0')}:00`, subScore:timeSubScore }
  ];
  
  return { score, decision, reasons, breakdown: { amtFactor, deviceFactor, catFactor, typeFactor, timeFactor } };
}

export default function TransactionSimulator(){
  const [amount,setAmount] = useState(250);
  const [deviceNew,setDeviceNew] = useState(false);
  const [category,setCategory] = useState('general');
  const [type,setType] = useState('purchase');
  const [hour,setHour] = useState(12);
  const { score, decision, reasons, breakdown } = useMemo(()=> scoreHeuristic(amount, deviceNew, category, type, hour), [amount, deviceNew, category, type, hour]);

  return (
    <div className="grid">
      <FormFieldsets amount={amount} setAmount={setAmount} deviceNew={deviceNew} setDeviceNew={setDeviceNew} category={category} setCategory={setCategory} type={type} setType={setType} hour={hour} setHour={setHour} />
      
      <div style={{display:'grid',gap:24,gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))'}}>
        <div>
          <RiskGauge score={score} />
          <div className="card fade-in" style={{marginTop:12}}>
            <span className={`badge badge-${decision}`}>{decision.toUpperCase()}</span>
          </div>
        </div>
        <ScoreBreakdown score={score} breakdown={breakdown} />
      </div>
      
      <DetailedMetrics reasons={reasons} />
    </div>
  );
}
