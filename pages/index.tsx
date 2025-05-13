// 프로젝트: AutoWriter Pro (GPT 글 템플릿 생성기) - 다크모드 + 향상된 CSS 스타일

// 📁 /pages/index.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [type, setType] = useState('Email');
  const [tone, setTone] = useState('Formal');
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch((err) => {
      alert('Failed to copy text');
      console.error(err);
    });
  };
  

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, tone, keywords })
    });
    const data = await res.json();
    setResult(data.text);
    setLoading(false);
  };

  return (
    <div className="container">
      <Head>
        <title>AutoWriter Pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <div className="header">
          <h1>AutoWriter Pro ✍️</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="toggle">
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <label>Template Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Email</option>
          <option>Cover Letter</option>
          <option>Marketing Copy</option>
          <option>Blog Intro</option>
        </select>

        <label>Writing Tone:</label>
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option>Formal</option>
          <option>Casual</option>
          <option>Professional</option>
          <option>Simple</option>
        </select>

        <label>Keywords (separated by commas):</label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="input"
        />

        <button onClick={handleGenerate} disabled={loading} className="button">
          {loading ? 'Generating...' : 'Generate'}
        </button>

        {result && (
          <div className="result-box">
            <h3>Generated Result:</h3>
            <textarea value={result} readOnly className="textarea" />
            <button onClick={() => copyToClipboard(result)} className="button">
            📋 Copy
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
