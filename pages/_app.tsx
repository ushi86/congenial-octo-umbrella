import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [theme,setTheme] = useState<'dark'|'light'>('dark');
  useEffect(()=>{ document.documentElement.setAttribute('data-theme', theme); },[theme]);
  return (
    <>
      <div style={{position:'fixed',top:12,right:12,zIndex:50}}>
        <button className="theme-toggle" onClick={()=>setTheme(t=> t==='dark'?'light':'dark')}>{theme==='dark'?'🌞 Light':'🌚 Dark'}</button>
      </div>
      <Component {...pageProps} />
    </>
  );
}
