import Groq from "groq-sdk";
import { NextApiRequest, NextApiResponse } from 'next';
import { speech } from '@/utils/openai';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function groqAnswer(bikeDef: string) {
  const chatCompletion = await getGroqChatCompletion(bikeDef);
  // Print the completion returned by the LLM.
  return (chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion(bikeDef: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "Tu es un vendeur decathlon, tu dois generer une description pour explique ce vélo a un client potentiel. Tu dois faire très court, maximum quelques phrases. Parle avec un language Amical. Commence ta description par: 'Voici le modele ...'. Voici la description du vélo: " + bikeDef + "."
      },
    ],
    model: "llama3-8b-8192",
  });
}

export async function POST(req: Request){
	const bikeDef = await req.text()
	// Génère ton audio ici en fonction de l'ID
	const answer = await groqAnswer(bikeDef);
	const audio = await speech(answer);
	return new Response(audio, { headers: { "Content-Type": "audio/mpeg" } })
}

// let history = [
// 	{role: "user", content: "Salut, je suis un debutant complet en velo, est ce que tu pourrais me guider dans mon achat?"},
// ]
// const res = await fetch("/api/think", {
// 	method: "POST",
// 	body: JSON.stringify(history)
// })
// const json = await res.json()
// let data = {"role": "assistant", content: json}
// history.push(data)
