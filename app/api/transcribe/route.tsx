import { transcribe } from "@/utils/openai"

export async function POST(req: Request) {
	const formData = await req.formData()
	const audio = formData.get("recording") as File
	const transcription = await transcribe(audio)
	return Response.json(transcription)
}