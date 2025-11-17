import Link from 'next/link';
import { useState } from 'react';

export default function LandingPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    {
      q: 'What is UPI Fraud?',
      a: 'UPI fraud occurs when unauthorized individuals use your Unified Payments Interface account to transfer money. Common methods: phishing OTPs, malware, SIM swaps, social engineering.'
    },
    {
      q: 'How does fraud detection work?',
      a: 'Systems analyze transaction patterns: amounts, merchants, devices, timing, velocity. Anomalies trigger review or block. This demo uses heuristic scoring (not ML).'
    },
    {
      q: 'What should I do if I suspect fraud?',
      a: 'Immediately report to your bank via app or phone. Block the card/UPI. File an FIR if needed. Most banks cover fraud within 7 days of reporting.'
    },
    {
      q: 'Can I be liable for fraud?',
      a: 'In India, if you report within 3-7 days, banks typically cover losses. Delay may shift liability. RBI guidelines protect consumers.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero fade-in" style={{background: 'linear-gradient(135deg, #0a0118 0%, #1e0a3c 50%, #0a0118 100%)', position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {/* Animated gradient orbs */}
        <div style={{position: 'absolute', top: '-20%', right: '-10%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', animation: 'pulse 8s ease-in-out infinite'}} />
        <div style={{position: 'absolute', bottom: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', animation: 'pulse 6s ease-in-out infinite reverse'}} />
        <div style={{position: 'absolute', top: '30%', left: '50%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', animation: 'pulse 10s ease-in-out infinite', transform: 'translateX(-50%)'}} />
        
        {/* Grid overlay */}
        <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px', opacity: 0.3, pointerEvents: 'none'}} />
        
        <div style={{maxWidth: 1200, padding: '0 24px', position: 'relative', zIndex: 1}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:40,alignItems:'center'}}>
            {/* Left Glass Card */}
            <div style={{display:'flex',justifyContent:'center'}}>
              <div className="card" style={{
                width: 420,
                height: 260,
                borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.15))',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.45), 0 0 60px rgba(99,102,241,0.25)',
                backdropFilter: 'blur(14px)',
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.08)',padding:'6px 12px',borderRadius:999,border:'1px solid rgba(255,255,255,0.15)'}}>
                    <span style={{fontWeight:800,letterSpacing:1}}>UFD</span>
                    <span style={{opacity:.8,fontSize:12}}>Project</span>
                  </div>
                  <div style={{fontSize:20,opacity:.85}}>(((</div>
                </div>
                
                <div>
                  <div style={{fontFamily:'Oswald, sans-serif',fontSize:28,letterSpacing:1,marginBottom:8}}>Prevent UPI Fraud</div>
                  <div style={{opacity:.7,letterSpacing:6,fontSize:18}}>•••• •••• •••• 2411</div>
                </div>
                
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{fontSize:11,opacity:.7,letterSpacing:1}}>CARD HOLDER</div>
                    <div style={{fontWeight:700}}>DEPT OF AIDS</div>
                  </div>
                  <div>
                    <div style={{fontSize:11,opacity:.7,letterSpacing:1}}>VALID</div>
                    <div style={{fontWeight:700}}>11/25</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Headline + CTAs */}
            <div style={{textAlign:'left'}}>
              <div style={{display:'inline-flex', alignItems:'center', gap:8, background:'rgba(99,102,241,0.15)', padding:'8px 24px', borderRadius:50, marginBottom:24, border:'1px solid rgba(99,102,241,0.35)', backdropFilter:'blur(10px)'}}>
                <span style={{fontSize:13,fontWeight:800,letterSpacing:1}}>UFD</span>
                <span style={{fontSize:12,opacity:.8}}>UPI Fraud Detection</span>
              </div>
              <h1 style={{fontSize:'64px',lineHeight:1.1,margin:'0 0 12px'}}>Prevent UPI Fraud with UFD</h1>
              <div style={{fontSize:22,opacity:.9,marginBottom:18}}>UPI Fraud Detection using Machine Learning</div>
              <p style={{fontSize:16,opacity:.8,maxWidth:560,margin:'0 0 28px',lineHeight:1.8}}>Glassmorphism interface, gradient glows, and real-time scoring. Explore how machine learning analyzes amount, device, category, type, and time to stop fraud.</p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                <Link href="/simulate">
                  <button className="button" style={{padding:'14px 36px',fontSize:16}}>Start Simulation</button>
                </Link>
                <a onClick={() => document.getElementById('team-section')?.scrollIntoView({behavior:'smooth'})} className="nav-back" style={{border:'1px solid rgba(99,102,241,0.35)',padding:'12px 24px',borderRadius:10,cursor:'pointer'}}>Meet the Team</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team-section" className="section container" style={{marginTop: 80, paddingTop: 80, borderTop: '1px solid rgba(99,102,241,0.2)'}}>
        <div style={{textAlign: 'center', marginBottom: 60}}>
          <div style={{display: 'inline-block', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))', padding: '8px 24px', borderRadius: 50, marginBottom: 16, border: '1px solid rgba(99,102,241,0.3)'}}>
            <span style={{fontSize: 13, fontWeight: 700, background: 'linear-gradient(135deg, #6366f1, #a855f7)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '1px'}}>DEVELOPED BY</span>
          </div>
          <h2 style={{fontSize: 42, fontWeight: 800, marginBottom: 16, background: 'linear-gradient(135deg, #60a5fa, #a855f7)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Meet the Innovators</h2>
          <p style={{fontSize: 18, opacity: 0.7, maxWidth: 600, margin: '0 auto'}}>A talented team pushing the boundaries of fraud detection technology</p>
        </div>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, maxWidth: 1000, margin: '0 auto'}}>
          {[
            {name: 'Karthayayini.B', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)'},
            {name: 'Sanjana K.M', gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)'},
            {name: 'Vishnu Priya.G', gradient: 'linear-gradient(135deg, #a855f7, #ec4899)'},
            {name: 'Likitha.S', gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)'}
          ].map((member, i) => (
            <div key={i} className="card fade-in" style={{animationDelay: `${i * 0.1}s`, background: 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(168,85,247,0.05))', border: '1px solid rgba(99,102,241,0.2)', padding: 32, textAlign: 'center', transition: 'all 0.3s', cursor: 'default'}}>
              <div style={{width: 80, height: 80, margin: '0 auto 20px', borderRadius: '50%', background: member.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 900, color: 'white', boxShadow: '0 10px 30px rgba(99,102,241,0.3)'}}>
                {member.name.charAt(0)}
              </div>
              <h3 style={{fontSize: 20, fontWeight: 700, marginBottom: 8, background: member.gradient, backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{member.name}</h3>
              <p style={{fontSize: 13, opacity: 0.6, margin: 0, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600}}>Developer</p>
            </div>
          ))}
        </div>
      </section>

      {/* What is UPI Fraud */}
      <section className="section container">
        <h2>What is UPI Fraud?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon">🔒</div>
            <h3>Account Compromise</h3>
            <p>Attackers gain access via phishing, weak passwords, or malware then drain accounts with rapid transactions.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🎭</div>
            <h3>Identity Fraud</h3>
            <p>Criminals use stolen documents to open fake accounts and make unauthorized transactions.</p>
          </div>
          <div className="feature-card">
            <div className="icon">📱</div>
            <h3>Device Takeover</h3>
            <p>New or unrecognized devices attempting unusual transactions from strange locations trigger alerts.</p>
          </div>
          <div className="feature-card">
            <div className="icon">💰</div>
            <h3>Unusual Patterns</h3>
            <p>Sudden large transfers, luxury purchases, or late-night transactions deviate from normal user behavior.</p>
          </div>
        </div>
      </section>

      {/* Scoring Parameters */}
      <section className="section container" style={{background: 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(168,85,247,0.05) 100%)', borderRadius: 16, marginTop: 60, padding: '60px 40px', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '-50%', right: '-30%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none'}} />
        
        <div style={{position: 'relative', zIndex: 1}}>
          <h2 style={{textAlign: 'center', marginBottom: 12}}>🎯 How Risk Scoring Works</h2>
          <p style={{textAlign: 'center', opacity: 0.8, marginBottom: 50, fontSize: 16}}>Every transaction is evaluated on 5 key dimensions. Adjust parameters in the simulator to see scoring in real-time.</p>
          
          <div className="param-guide">
            <div className="param-item fade-in" style={{animationDelay: '0s', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(99,102,241,0.02))', padding: 24, borderRadius: 12, border: '1px solid rgba(99,102,241,0.2)'}}>
              <div style={{display: 'flex', alignItems: 'flex-start', gap: 16}}>
                <div className="param-icon" style={{fontSize: 32, minWidth: 50}}>💰</div>
                <div style={{flex: 1}}>
                  <h4 style={{marginTop: 0, marginBottom: 8}}>Amount (25% weight)</h4>
                  <p style={{opacity: 0.85, marginBottom: 0, lineHeight: 1.6}}>Large transfers (higher than ₹5000) and micro-transactions are flagged. Attackers exploit unusual amounts to move stolen money quickly.</p>
                </div>
              </div>
            </div>
            
            <div className="param-item fade-in" style={{animationDelay: '0.1s', background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(168,85,247,0.02))', padding: 24, borderRadius: 12, border: '1px solid rgba(168,85,247,0.2)'}}>
              <div style={{display: 'flex', alignItems: 'flex-start', gap: 16}}>
                <div className="param-icon" style={{fontSize: 32, minWidth: 50}}>📱</div>
                <div style={{flex: 1}}>
                  <h4 style={{marginTop: 0, marginBottom: 8}}>Device Status (30% weight) ⚠️ HIGHEST</h4>
                  <p style={{opacity: 0.85, marginBottom: 0, lineHeight: 1.6}}>New or unrecognized devices pose extreme risk. Device fingerprinting tracks login patterns. Attackers using new devices trigger immediate alerts.</p>
                </div>
              </div>
            </div>
            
            <div className="param-item fade-in" style={{animationDelay: '0.2s', background: 'linear-gradient(135deg, rgba(236,72,153,0.08), rgba(236,72,153,0.02))', padding: 24, borderRadius: 12, border: '1px solid rgba(236,72,153,0.2)'}}>
              <div style={{display: 'flex', alignItems: 'flex-start', gap: 16}}>
                <div className="param-icon" style={{fontSize: 32, minWidth: 50}}>🏷️</div>
                <div style={{flex: 1}}>
                  <h4 style={{marginTop: 0, marginBottom: 8}}>Category (25% weight)</h4>
                  <p style={{opacity: 0.85, marginBottom: 0, lineHeight: 1.6}}>Luxury & gambling purchases are inherently risky. Food & utilities are routine. Category mismatch from user history is a red flag.</p>
                </div>
              </div>
            </div>
            
            <div className="param-item fade-in" style={{animationDelay: '0.3s', background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(59,130,246,0.02))', padding: 24, borderRadius: 12, border: '1px solid rgba(59,130,246,0.2)'}}>
              <div style={{display: 'flex', alignItems: 'flex-start', gap: 16}}>
                <div className="param-icon" style={{fontSize: 32, minWidth: 50}}>📤</div>
                <div style={{flex: 1}}>
                  <h4 style={{marginTop: 0, marginBottom: 8}}>Type (15% weight)</h4>
                  <p style={{opacity: 0.85, marginBottom: 0, lineHeight: 1.6}}>P2P transfers are riskier than merchant purchases. Fraudsters prefer instant transfers to cash-out stolen money.</p>
                </div>
              </div>
            </div>
            
            <div className="param-item fade-in" style={{animationDelay: '0.4s', background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.02))', padding: 24, borderRadius: 12, border: '1px solid rgba(34,197,94,0.2)'}}>
              <div style={{display: 'flex', alignItems: 'flex-start', gap: 16}}>
                <div className="param-icon" style={{fontSize: 32, minWidth: 50}}>🕐</div>
                <div style={{flex: 1}}>
                  <h4 style={{marginTop: 0, marginBottom: 8}}>Time (5% weight)</h4>
                  <p style={{opacity: 0.85, marginBottom: 0, lineHeight: 1.6}}>Late-night transactions (22:00-06:00) are unusual. Off-hours activity correlates with account compromise.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Red Flags */}
      <section className="section container" style={{marginTop: 60}}>
        <div style={{textAlign: 'center', marginBottom: 50}}>
          <h2>⚠️ Critical Red Flags</h2>
          <p style={{opacity: 0.8, fontSize: 16}}>Never ignore these warning signs—they're the #1 way fraud starts</p>
        </div>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20}}>
          <div className="card fade-in" style={{borderLeft: '4px solid #dc2626', background: 'linear-gradient(135deg, rgba(220,38,38,0.05), rgba(220,38,38,0.02))', animationDelay: '0s'}}>
            <h3 style={{color: '#dc2626', marginTop: 0, marginBottom: 8}}>❌ OTP/PIN Sharing</h3>
            <p style={{marginBottom: 0, lineHeight: 1.6, fontSize: 14}}>Banks NEVER ask for OTP, PIN, or CVV. Sharing these grants instant full access to your account. This is 80% of all fraud cases.</p>
          </div>
          
          <div className="card fade-in" style={{borderLeft: '4px solid #dc2626', background: 'linear-gradient(135deg, rgba(220,38,38,0.05), rgba(220,38,38,0.02))', animationDelay: '0.1s'}}>
            <h3 style={{color: '#dc2626', marginTop: 0, marginBottom: 8}}>❌ Weak Passwords</h3>
            <p style={{marginBottom: 0, lineHeight: 1.6, fontSize: 14}}>Use strong, unique passwords for every account. Reused passwords mean one breach compromises ALL accounts. Use a password manager like Bitwarden.</p>
          </div>
          
          <div className="card fade-in" style={{borderLeft: '4px solid #dc2626', background: 'linear-gradient(135deg, rgba(220,38,38,0.05), rgba(220,38,38,0.02))', animationDelay: '0.2s'}}>
            <h3 style={{color: '#dc2626', marginTop: 0, marginBottom: 8}}>❌ Phishing Links</h3>
            <p style={{marginBottom: 0, lineHeight: 1.6, fontSize: 14}}>Don't click links from emails/SMS. Always navigate directly to official apps or websites. Attackers use fake URLs to steal credentials instantly.</p>
          </div>
          
          <div className="card fade-in" style={{borderLeft: '4px solid #dc2626', background: 'linear-gradient(135deg, rgba(220,38,38,0.05), rgba(220,38,38,0.02))', animationDelay: '0.3s'}}>
            <h3 style={{color: '#dc2626', marginTop: 0, marginBottom: 8}}>❌ Unverified Transactions</h3>
            <p style={{marginBottom: 0, lineHeight: 1.6, fontSize: 14}}>Always verify amount and recipient before confirming. UPI transactions are instant—once sent, money is gone. No undo button exists.</p>
          </div>
          
          <div className="card fade-in" style={{borderLeft: '4px solid #dc2626', background: 'linear-gradient(135deg, rgba(220,38,38,0.05), rgba(220,38,38,0.02))', animationDelay: '0.4s'}}>
            <h3 style={{color: '#dc2626', marginTop: 0, marginBottom: 8}}>❌ Ignoring Alerts</h3>
            <p style={{marginBottom: 0, lineHeight: 1.6, fontSize: 14}}>Bank alerts warn of suspicious activity. Act immediately. Report unrecognized transactions within 24 hours to avoid liability.</p>
          </div>
          
          <div className="card fade-in" style={{borderLeft: '4px solid #dc2626', background: 'linear-gradient(135deg, rgba(220,38,38,0.05), rgba(220,38,38,0.02))', animationDelay: '0.5s'}}>
            <h3 style={{color: '#dc2626', marginTop: 0, marginBottom: 8}}>❌ Public WiFi Usage</h3>
            <p style={{marginBottom: 0, lineHeight: 1.6, fontSize: 14}}>Avoid banking on public WiFi. Use a VPN if needed. Attackers intercept unencrypted data on open networks—it takes seconds.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section container" style={{marginTop: 60}}>
        <div style={{textAlign: 'center', marginBottom: 50}}>
          <h2>❓ Frequently Asked Questions</h2>
          <p style={{opacity: 0.8, fontSize: 16}}>Quick answers to common fraud concerns</p>
        </div>
        
        <div style={{maxWidth: 900, margin: '0 auto'}}>
          {faqItems.map((faq, i) => (
            <div key={i} className="card fade-in" style={{marginBottom: 12, background: 'linear-gradient(135deg, rgba(99,102,241,0.03), rgba(168,85,247,0.03))', border: '1px solid rgba(99,102,241,0.1)'}}>
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 16,
                  fontWeight: 600
                }}
              >
                <span>{faq.q}</span>
                <span style={{fontSize: 24, transition: 'transform .3s', transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0)'}}>▼</span>
              </button>
              {expandedFaq === i && (
                <p style={{marginTop: 16, marginBottom: 0, opacity: 0.8, lineHeight: 1.8, fontSize: 15, borderTop: '1px solid rgba(99,102,241,0.1)', paddingTop: 16}}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section container" style={{background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.15) 100%)', borderRadius: 16, padding: '60px 40px', marginTop: 60, textAlign: 'center', border: '1px solid rgba(99,102,241,0.2)', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '-50%', right: '-50%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none'}} />
        
        <div style={{position: 'relative', zIndex: 1}}>
          <h2 style={{marginBottom: 16}}>Ready to See It In Action?</h2>
          <p style={{fontSize: 18, opacity: 0.85, marginBottom: 32, maxWidth: 700, margin: '0 auto 32px'}}>
            Adjust transaction parameters in real-time and watch how the algorithm instantly calculates risk. Learn what makes transactions suspicious.
          </p>
          
          <Link href="/simulate">
            <button className="button" style={{fontSize: 18, padding: '16px 56px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', border: 'none', cursor: 'pointer', marginBottom: 24}}>
              🚀 Launch Interactive Simulator
            </button>
          </Link>
          
          <p style={{fontSize: 13, opacity: 0.6, margin: 0}}>No signup required • Browser-based • Instant results</p>
        </div>
      </section>
    </div>
  );
}

