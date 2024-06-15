import { answerAudio, } from "@/utils/openai";

export async function POST(req: Request) {
	const data = await req.formData()
	const file: File = data.get("recording") as File
	const answer = await answerAudio(file)
	return Response.json(answer)
}
