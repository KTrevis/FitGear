'use client'
import AudioRecorder from "@/components/AudioRecorder";
import { useState } from "react";


type ChatData = {
	role: "assistant" | "user",
	content: string,
}

export default function Home() {
	const [history, setHistory] = useState<ChatData[]>([])
	let audioUrl;
	return (
	<div>
		<AudioRecorder history={history} setHistory={setHistory}/>
		<audio controls src={audioUrl} />
	</div>
   );
}
