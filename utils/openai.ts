import OpenAI from "openai"
import Groq from "groq-sdk";

//export const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
export const openai = new OpenAI({ apiKey: process.env.AI_API_KEY })
export const assistantID: string = "asst_lozEYO0j3sFBdxvpEd867r86"
export const intermediateAssistantID: string = "asst_k490uzyXIMBJbcayWMFIz5tS"

export async function getAssistant() {
	return await openai.beta.assistants.retrieve(assistantID)
}

export async function transcribe(audio: File) {
	const transcription = await openai.audio.transcriptions.create({file: audio, model: "whisper-1"})
	return transcription.text
}

// toto pour demo meetre gpt4
export async function think(prompt: string) {
	const answer = await openai.chat.completions.create({
		messages: [{ role: "system", content: prompt }],
		model: "gpt-3.5-turbo",
		max_tokens: 150,
	});
	const res = answer.choices[0]?.message?.content || "";
	return res;
}

//todo pour demo mettre hd
export async function speech(answer: string) {
	const mp3 = await openai.audio.speech.create({
		model: "tts-1",
		voice: "echo",
		input: answer,
	});
	const arrBuffer = await mp3.arrayBuffer()
	return arrBuffer
}
