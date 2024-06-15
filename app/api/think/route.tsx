import OpenAI from "openai";
import { openai } from "@/utils/openai";

export async function POST(req: Request) {
	const json = await req.json()
	console.log(json)
	
	return Response.json("caca")
}