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
export default function AudioRecorder({ history, setHistory, setAudioUrl }) {
	const [recording, setRecording] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	
	const router = useRouter();

	async function findBike(answer: string) {
		const tabId: Number[] = [];
		const response = await fetch("/dataBikes.json");
		const fileDataBike = await response.json();
		const bike = fileDataBike.filter((bike: any) => answer.includes(bike.nom_modele));
		return tabId;
	}
	

	async function handleRecorderStop() {
		setIsLoading(true)


		const blob = new Blob(chunks, { type: "audio/wav" })
		const formData = new FormData()
		formData.append("recording", blob)
		let res = await fetch("/api/transcribe", {
			method: "POST",
			body: formData
		})

		console.log("Transcription: " + res);

		const json = await res.json()
		const updateHistory = [...history, { role: "user", content: json }];
		setHistory(updateHistory)
		res = await fetch("/api/think", {
			method: "POST",
			body: JSON.stringify(updateHistory)
		})

		const replyText = await res.json()
		setHistory([...history, { role: "assistant", content: replyText }])
		chunks = []

		if (replyText.includes("BRAVO")) {
			const tabId = findBike(replyText)
			localStorage.setItem("id", JSON.stringify(tabId))
			router.push("/result")
		}

		const req = await fetch("/api/speech", { method: "POST", body: JSON.stringify(replyText) })
		const audio = await req.blob()
		
		setIsLoading(false)

		setAudioUrl(URL.createObjectURL(audio))
	}

	async function toggleRecording() {
		setRecording(!recording)
		if (recording) {
			mediaStream.getTracks().forEach(track => track.stop())
			mediaRecorder.stop()
			return;
		}
		mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
		mediaRecorder = new MediaRecorder(mediaStream)
		mediaRecorder.onstop = handleRecorderStop
		mediaRecorder.ondataavailable = (event) => chunks.push(event.data)
		mediaRecorder.start()
	}

	return (
		<>
			<Button isLoading={isLoading} onClick={toggleRecording} className="buttonPlay" size="lg" color={isLoading ? "warning" : (recording ? "danger" : "primary")}>
				{!isLoading && <Image className="iconRecord" src={recording ? "/image/stopIcon.png" : "/image/playIcon.png"} alt="play icon" height={50} width={50} />}
				{isLoading ? "Chargement" : (recording ? "Stop" : "Parler")}
			</Button>
		</>
	)
}
