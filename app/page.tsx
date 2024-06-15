'use client'
import { useState } from "react";
import AudioRecorder from "@/components/AudioRecorder";
import {openai} from "@/utils/openai";

type ChatData = {
	role: "assistant" | "user",
	content: string,
}
 

export default function Home() {
	const [history, setHistory] = useState<ChatData[]>([])
	const [audioUrl, setAudioUrl] = useState<string>("")


	return (
	<div>
		<AudioRecorder history={history} setHistory={setHistory} setAudioUrl={setAudioUrl}/>
		<audio controls src={audioUrl} />
	</div>
   );
}
