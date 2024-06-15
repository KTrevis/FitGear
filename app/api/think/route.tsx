import { openai, assistantID, intermediateAssistantID } from "@/utils/openai";
import { ThreadCreateParams } from "openai/src/resources/beta/index.js";

async function getAnswerFromAssistant(assistantID: string, history: ThreadCreateParams.Message[]) {
	const thread = await openai.beta.threads.create({messages: history});
	const run = await openai.beta.threads.runs.createAndPoll(thread.id, {assistant_id: assistantID});
	const messages = await openai.beta.threads.messages.list(thread.id);
	const reply = messages.data[0]?.content[0];
	if (reply.type !== 'text') 
		return "No response"
	return reply.text.value
}

export async function POST(req: Request) {
	const history = await req.json()
	let answer = await getAnswerFromAssistant(assistantID, history)
	if (answer.endsWith("BRAVO")) {
		answer = await getAnswerFromAssistant(intermediateAssistantID, [{role: "user", content: answer}])
		console.log(answer)
	}
	return Response.json(answer)
}
