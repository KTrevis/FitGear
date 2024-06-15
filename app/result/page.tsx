'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import "@/app/style/style.css";
import CardResult from '@/components/cardResult';


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
				const foundBike = fileDataBike.find((bike: any) => bike.id === id);
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
		return <div>Loading...</div>;
	}

	if (!bike) {
		return <div>No bike found</div>;
	}

	return (
		<div>
			<Image className="logo" priority src="/image/logo.png" alt="logo Name" height={100} width={100} />
			<Image className="recordAloneIcon" priority src="/image/recordAlone.png" alt="Seller Light" height={100} width={100} />
			<p>Result page my friend, l'id du bike est: {bike.id}</p>
			<p>Le nom du vélo est: {bike.nom_modele}</p>
			<CardResult bike={bike} />
		</div>
	);
};

export default Page;
