import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type, tone, keywords } = req.body;

  const prompt = `Write a ${tone.toLowerCase()} ${type.toLowerCase()} using the following keywords: ${keywords}.
Limit the output to under 300 characters. Make it sound natural and fluent.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  res.status(200).json({ text: data.choices[0].message.content });
}
