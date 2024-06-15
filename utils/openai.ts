import OpenAI from "openai"

export const openai = new OpenAI({ apiKey: process.env.AI_API_KEY })
export const assistantID: string = "asst_lozEYO0j3sFBdxvpEd867r86"

export async function getAssistant() {
	return await openai.beta.assistants.retrieve(assistantID)
}

export async function speechToText(speech: File) {
	const transcription = await openai.audio.transcriptions.create({file: speech, model: "whisper-1"})
	return transcription.text
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
