import { openai, assistantID } from "@/utils/openai";

export async function POST(req: Request) {
	const history = await req.json()
	console.log(history)

	const thread = await openai.beta.threads.create({
		messages: history,
	});

	const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
		assistant_id: assistantID
	});
	
	// Output results
	const messages = await openai.beta.threads.messages.list(
		thread.id
	);

	const reply = messages.data[0]?.content[0];
	if (reply.type === 'text') {
		console.log('message: ', reply.text.value); // Text content
		console.log('annotations: ', reply.text.annotations); // Annotations from File Search
		return Response.json(reply.text.value)
	}
	return Response.json("No response")

}