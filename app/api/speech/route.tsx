
import { speech } from "@/utils/openai"


export async function POST(req: Request){
	const text = await req.json()
	const audio = await speech(text)
	return new Response(audio, { headers: { "Content-Type": "audio/mpeg" } })
}