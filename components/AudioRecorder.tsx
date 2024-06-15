'use client'
import { useState } from "react"

let mediaStream: MediaStream
let mediaRecorder: MediaRecorder
let chunks: Blob[] = []

// @ts-ignore
export default function AudioRecorder({setAnswer}) {
	const [recording, setRecording] = useState(false)

	async function handleRecorderStop() {
		const blob = new Blob(chunks, {type: "audio/wav"})
		const formData = new FormData()
		formData.append("recording", blob)
		const res = await fetch("/api/audio-answer", {
			method: "POST",
			body: formData
		})
		const json = await res.json()
		setAnswer(json)
	}

	async function toggleRecording() {
		setRecording(!recording)
		if (recording) {
			mediaStream.getTracks().forEach(track => track.stop())
			mediaRecorder.stop()
			return;
		}
		mediaStream = await navigator.mediaDevices.getUserMedia({audio: true})
		mediaRecorder = new MediaRecorder(mediaStream)
		mediaRecorder.onstop = handleRecorderStop
		mediaRecorder.ondataavailable = (event) => chunks.push(event.data)
		mediaRecorder.start()
	}

	return ( 
		<>
			<button onClick={toggleRecording}>{recording ? "Stop record" : "Start record"}</button>
		</>
	)
}
