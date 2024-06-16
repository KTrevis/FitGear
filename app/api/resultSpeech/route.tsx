import Groq from "groq-sdk";
import { speech, groqAnswer} from '@/utils/openai';


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
