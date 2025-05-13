// GPT 글 생성기 - 다국어 + UI 항목 번역 포함

import { useState, useEffect } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

export default function Home() {
  const [type, setType] = useState('email');
  const [tone, setTone] = useState('formal');
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState<'en' | 'ko' | 'ja'>('en');

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const texts = {
    en: {
      title: 'AutoWriter Pro',
      template: 'Template Type:',
      tone: 'Writing Tone:',
      keywords: 'Keywords (comma-separated):',
      generate: 'Generate',
      copying: 'Copied!',
      result: 'Generated Result:',
      languages: '🌐 Language: English',
      darkmode: '🌙 Dark Mode',
      lightmode: '☀️ Light Mode',
      types: {
        email: 'Email',
        cover: 'Cover Letter',
        marketing: 'Marketing Copy',
        blog: 'Blog Intro'
      },
      tones: {
        formal: 'Formal',
        casual: 'Casual',
        professional: 'Professional',
        simple: 'Simple'
      }
    },
    ko: {
      title: '오토라이터 프로',
      template: '글 템플릿 종류:',
      tone: '말투 설정:',
      keywords: '키워드 (쉼표로 구분):',
      generate: '생성하기',
      copying: '복사 완료!',
      result: '생성된 글:',
      languages: '🌐 언어: 한국어',
      darkmode: '🌙 다크 모드',
      lightmode: '☀️ 라이트 모드',
      types: {
        email: '이메일',
        cover: '자기소개서',
        marketing: '마케팅 문구',
        blog: '블로그 도입부'
      },
      tones: {
        formal: '공손하게',
        casual: '편하게',
        professional: '전문적으로',
        simple: '간단하게'
      }
    },
    ja: {
      title: 'オートライタープロ',
      template: 'テンプレートの種類:',
      tone: '文体:',
      keywords: 'キーワード（カンマ区切り）:',
      generate: '生成する',
      copying: 'コピーしました！',
      result: '生成された文章:',
      languages: '🌐 言語: 日本語',
      darkmode: '🌙 ダークモード',
      lightmode: '☀️ ライトモード',
      types: {
        email: 'メール',
        cover: '志望動機書',
        marketing: 'マーケティング文',
        blog: 'ブログ紹介文'
      },
      tones: {
        formal: '丁寧に',
        casual: 'カジュアルに',
        professional: '専門的に',
        simple: 'シンプルに'
      }
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    // lang, tone, type 타입을 명시해줘야 함
const toneKey = tone as keyof typeof texts['en']['tones'];
const typeKey = type as keyof typeof texts['en']['types'];
const langKey = lang as keyof typeof texts;

const toneText = texts[langKey].tones[toneKey];
const typeText = texts[langKey].types[typeKey];


const prompt = {
  en: `Write a ${tone} ${type} using the following keywords: ${keywords}. Limit to 300 characters.`,
  ko: `다음 키워드를 사용하여 ${toneText} ${typeText} 글을 작성해줘: ${keywords}. 300자 이내로 작성해줘.`,
  ja: `${keywords}を使って${typeText}を${toneText}書いてください。300文字以内で。`
}[lang];


    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, tone, keywords, prompt })
    });
    const data = await res.json();
    setResult(data.text);
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(texts[lang].copying);
    });
  };

  const nextLang = (l: 'en' | 'ko' | 'ja') => (l === 'en' ? 'ko' : l === 'ko' ? 'ja' : 'en');

  return (
    <div className="container">
      <Head>
        <title>{texts[lang].title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <div className="header">
          <div className="title">{texts[lang].title} ✍️</div>
          <div className="controls">
            <button onClick={() => setLang(nextLang(lang))} className="toggle">
              {texts[lang].languages}
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="toggle">
              {darkMode ? texts[lang].lightmode : texts[lang].darkmode}
            </button>
          </div>
        </div>

        <label>{texts[lang].template}</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="email">{texts[lang].types.email}</option>
          <option value="cover">{texts[lang].types.cover}</option>
          <option value="marketing">{texts[lang].types.marketing}</option>
          <option value="blog">{texts[lang].types.blog}</option>
        </select>

        <label>{texts[lang].tone}</label>
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="formal">{texts[lang].tones.formal}</option>
          <option value="casual">{texts[lang].tones.casual}</option>
          <option value="professional">{texts[lang].tones.professional}</option>
          <option value="simple">{texts[lang].tones.simple}</option>
        </select>

        <label>{texts[lang].keywords}</label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="input"
        />

        <button onClick={handleGenerate} disabled={loading} className="button">
          {loading ? '...' : texts[lang].generate}
        </button>

        {result && (
          <div className="result-box">
            <h3>{texts[lang].result}</h3>
            <textarea value={result} readOnly className="textarea" />
            <button onClick={() => copyToClipboard(result)} className="button">📋 Copy</button>
          </div>
        )}
      </main>
    </div>
  );
}
