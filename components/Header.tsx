import Link from 'next/link';
export default function Header() {
  return (
    <header style={{background:'#111',color:'#fff',padding:'12px 24px',display:'flex',gap:'24px'}}>
      <strong>UPI Fraud Demo</strong>
      <nav style={{display:'flex',gap:'16px'}}>
        <Link href="/">Home</Link>
        <Link href="/simulate">Simulate</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/presentation">Presentation</Link>
      </nav>
    </header>
  );
}
