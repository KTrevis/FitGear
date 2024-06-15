'use client'
import { useState } from "react";
import AudioRecorder from "@/components/AudioRecorder";

export default function Home() {
	const [answer, setAnswer] = useState("")
	return (
	<div>
		<AudioRecorder setAnswer={setAnswer} />
		<p>{answer}</p>
	</div>
   );
}
