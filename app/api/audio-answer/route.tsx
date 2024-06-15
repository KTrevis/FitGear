import { speechToText, think } from "@/utils/openai";
import { openai } from "@/utils/openai";
import { getAssistant } from "@/utils/openai";

export async function POST(req: Request) {
	const assistant = await getAssistant()
	const data = await req.formData()
	const file: File = data.get("recording") as File
	const transcription = await speechToText(file)
	const answer = await think(transcription)
	return Response.json(answer)
}
