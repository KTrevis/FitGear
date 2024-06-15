'use client'
import { useState } from "react";
import AudioRecorder from "@/components/AudioRecorder";
import { openai } from "@/utils/openai";
import Image from "next/image";
import "@/app/style/style.css"
import { Button, ButtonGroup } from "@nextui-org/button";

type ChatData = {
	role: "assistant" | "user",
	content: string,
}

export default function Home() {
	const [history, setHistory] = useState<ChatData[]>([])
	const [audioUrl, setAudioUrl] = useState<string>("")
	const [recording, setRecording] = useState(false)

	return (
		<div className="playerScreen">
			{recording ? <img className="wave" src={"image/wave.gif"} alt="record wave..." /> : <div className="waveLine"></div>}
			<Image className="logo" priority src="/image/logo.png" alt="logo Name" height={100} width={100} />
			<Image className="sellerLight" priority src="/image/sellerLight.png" alt="Seller Light" height={100} width={100} />
			{/*<audio controls src={audioUrl} />*/}
			<AudioRecorder history={history} setHistory={setHistory} setAudioUrl={setAudioUrl} />

		</div>
	);
}
