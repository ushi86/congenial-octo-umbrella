import Header from '../components/Header';
export default function Presentation(){
  return (
    <div style={{fontFamily:'sans-serif'}}>
      <Header />
      <main style={{padding:32,maxWidth:800,margin:'0 auto'}}>
        <h1>Presentation</h1>
        <ol>
          <li>Capture transaction details</li>
          <li>Score via heuristic model</li>
          <li>Create record & display reasoning</li>
          <li>Analyst marks outcome to simulate feedback loop</li>
        </ol>
      </main>
    </div>
  );
}
