import Groq from "groq-sdk";
import { NextApiRequest, NextApiResponse } from 'next';
import { speech, groqAnswer} from '@/utils/openai';


export async function POST(req: Request){
	const bikeDef = await req.text()

	// Génère ton audio ici en fonction de l'ID
	const answer = await groqAnswer(bikeDef);
	const audio = await speech(answer);
	
	return new Response(audio, { headers: { "Content-Type": "audio/mpeg" } })
  }

