import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function speechToText(speech: File) {
	const arrBuffer = await speech.arrayBuffer()
	const transcription = await openai.audio.transcriptions.create({file: speech, model: "whisper-1"})
	const mp3 = await textToSpeech(transcription.text)
	return new Response (mp3, {
		headers: {"Content-Type": "audio/mpeg"}
	})
}

export async function textToSpeech(text: string) {
	const mp3 = await openai.audio.speech.create({
		model: "tts-1",
		voice: "alloy",
		input: text,
	});
	const arrBuffer = await mp3.arrayBuffer()
	return arrBuffer
}

export async function think(prompt: string) {
	const answer = await openai.chat.completions.create({
	messages: [{ role: "system", content: prompt }],
	model: "gpt-3.5-turbo",
	max_tokens: 150,
	});
	const res = answer.choices[0]?.message?.content || "";
	return res;
}
