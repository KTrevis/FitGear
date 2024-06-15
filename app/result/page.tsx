'use client'
import React from 'react'

const page = async () => {
	const idStr = localStorage.getItem("id");
	const id = idStr ? parseInt(idStr) : 0;
	const response = await fetch("/dataBikes.json");
	const fileDataBike = await response.json();

	const bike = fileDataBike.find((bike: any) => bike.id === id);

	return (
		<div>Result page my friend l'id du bike est: {bike.id}
			le nom du velo est {bike.nom_modele}
		</div>
	)
}

export default page