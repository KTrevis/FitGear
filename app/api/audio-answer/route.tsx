import { think, speech, openai } from "@/utils/openai";

export async function POST(req: Request) {
	const data = await req.formData();
	const file: File = data.get("recording") as File;
	const transcription = await openai.audio.transcriptions.create({
		file: file,
		model: "whisper-1",
	});
	const answer = await think(transcription.text);
	const mp3 = await speech(answer);
	return new Response(mp3, {
		headers: {"Content-Type": "audio/mpeg"}
	});
}