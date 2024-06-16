'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import "@/app/style/style.css";
import CardResult from '@/components/CardResult';
import Link from 'next/link';

const Page = () => {
  const [bike, setBike] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    console.log("Fetching bike data...");
    const idStr = localStorage.getItem("id");
    const id = idStr ? parseInt(idStr) : 0;

    const findBike = async () => {
      try {
        const response = await fetch("/dataBikes.json");
        const fileDataBike = await response.json();
        const foundBike = fileDataBike.find((curr: any) => curr.ID === id);
        setBike(foundBike);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    findBike();
  }, []);

  useEffect(() => {
    const fetchAudio = async () => {
      if (bike && bike.description && !audioPlayed) {
		setAudioPlayed(true);
        try {
          const audioResponse = await fetch("/api/resultSpeech", {
            method: "POST",
            headers: {
              "Content-Type": "text/plain"
            },
            body: bike.description
          });
          const audioBlob = await audioResponse.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);
        } catch (error) {
          console.error("Error fetching audio:", error);
        }
      }
    };

    fetchAudio();
  }, [bike, audioPlayed]);

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }, [audioUrl]);

  if (loading) {
    return <div className='loadingPageResult'>Loading...</div>;
  }

  if (!bike) {
    return <div className='loadingPageResult'>No Article found, We are bad dev...</div>;
  }

  return (
    <div className='resultPage'>
      <Image className="logo" priority src="/image/logoFit.png" alt="logo Name" height={100} width={100} />
      <Link href="/ia">
        <Image className="recordAloneIcon" priority src="/image/recordAlone.png" alt="Seller Light" height={100} width={100} />
      </Link>
      <CardResult bike={bike} />
    </div>
  );
};

export default Page;
