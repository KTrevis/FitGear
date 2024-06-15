'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import "@/app/style/style.css";
import CardResult from '@/components/CardResult';
import Link from 'next/link';


const Page = () => {
	const [bike, setBike] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
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

	if (loading) {
		return <div className='loadingPageResult'>Loading...</div>;
	}

	if (!bike) {
		return <div>No bike found</div>;
	}
	console.log("bike" + bike.lien);
	return (
		<div className='resultPage'>
			<Image className="logo" priority src="/image/logo.png" alt="logo Name" height={100} width={100} />
			<Link href="/ia">
				<Image className="recordAloneIcon" priority src="/image/recordAlone.png" alt="Seller Light" height={100} width={100} />
			</Link>
			<CardResult bike={bike} />
		</div>
	);
};

export default Page;
