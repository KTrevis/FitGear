'use client'
import { useEffect, useRef, useState } from 'react';
import AudioRecorder from "@/components/AudioRecorder";
import Image from "next/image";
import "@/app/style/style.css";
import { Button, ButtonGroup } from "@nextui-org/button";

type ChatData = {
    role: "assistant" | "user",
    content: string,
};

export default function Home() {
    const [history, setHistory] = useState<ChatData[]>([]);
    const [audioUrl, setAudioUrl] = useState<string>("");
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
	
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioUrl && audioRef.current) {
            setIsPlaying(true);
            audioRef.current.play();
        }
    }, [audioUrl]);

    const handleAudioEnded = () => {
        setIsPlaying(false);
    };

    return (
        <div className="playerScreen">
            <Image className="logo" priority src="/image/logo.png" alt="logo Name" height={100} width={100} />
            <Image className="sellerLight" priority  src={!isPlaying ? "/image/sellerLight.png" : "/image/sellerLoud.png"} alt="Seller Light" height={100} width={100} />
            {isPlaying ? (
                <img className="wave" src={"image/wave.gif"} alt="record wave..." />
            ) : (
                <div className="waveLine"></div>
            )}
            <audio ref={audioRef} src={audioUrl} onEnded={handleAudioEnded} />
            <AudioRecorder history={history} setHistory={setHistory} setAudioUrl={setAudioUrl} />
        </div>
    );
}
