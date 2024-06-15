'use client'
import { Button, divider } from "@nextui-org/react"
import { useState } from "react"
import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

let mediaStream: MediaStream
let mediaRecorder: MediaRecorder
let chunks: Blob[] = []

// @ts-ignore
export default function AudioRecorder({history, setHistory, setAudioUrl}) {
	const [recording, setRecording] = useState(false)
	const router = useRouter()

	async function handleRecorderStop() {
		const blob = new Blob(chunks, {type: "audio/wav"})
		const formData = new FormData()
		formData.append("recording", blob)
		let res = await fetch("/api/transcribe", {
			method: "POST",
			body: formData
		})
		const json = await res.json()
		const updateHistory = [...history, {role: "user", content: json}];
		setHistory(updateHistory)
		res = await fetch("/api/think", {
			method: "POST",
			body: JSON.stringify(updateHistory)
		})
		const replyText: string = await res.json()
		setHistory([...history, {role: "assistant", content: replyText}])
		if (replyText.startsWith("ID FOUND")) {
			const id = replyText.split(":")[1]
			localStorage.setItem("id", id)
			router.push("/result")
		}
		chunks = []
		const req = await fetch("/api/speech", {method: "POST", body: JSON.stringify(replyText)})
		const audio = await req.blob()
		setAudioUrl(URL.createObjectURL(audio))
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
			<Button onClick={toggleRecording} className="buttonPlay" size="lg" color={recording ? "danger" : "primary"}>
							<Image className="iconRecord" src={recording ? "/image/stopIcon.png" : "/image/playIcon.png"} alt="play icon" height={50} width={50} />
							{recording ? "Stop" : "Parler"}
			</Button>
		</>
	)
}
