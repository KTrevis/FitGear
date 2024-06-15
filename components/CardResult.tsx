import React, { use, useEffect } from 'react'
import "@/app/style/style.css";
import Image from 'next/image';
import Link from 'next/link';

// @ts-ignore
const cardResult = ({ bike }) => {
	
	useEffect(() => {
		console.log(bike);
	}, []);


	return (

		<div className="cardResult">
			<div className="tagPrice"><p className="price">{bike.prix}</p></div>;
			<Image className="imageBike" src={"/bikePhotos/" + bike.ID + ".png"} alt='article photos' width={500} height={500}></Image>
			<Image className="iconLeft" src="/image/arrowIconLeft.png" alt='arrow icon caroussel' width={15} height={15}></Image>
			<Image className="iconRight" src="/image/arrowIconRight.png" alt='arrow icon caroussel' width={15} height={15}></Image>
			<div className="downPart">
				<Link className="link" href={bike.lien} target='blank'>
					<p>Voir le vélo</p>
					<Image src="/image/arrowIconLink.png" alt='icon link' width={10} height={10}></Image>
				</Link>
				<div className="title">{bike.nom_modele}</div>
				<div className="spec">
					<div className="bold titleSpec">Couleur</div>
					<p className="valueSpec">{bike.couleur_disponible}</p>
					<div className="bold titleSpec">Taille Disponible</div>
					<p className="valueSpec">{bike.taille_disponible}</p>
					<div className="bold titleSpec">Description</div>
					<p className="valueSpec">{bike.description}</p>
				</div>
			</div>
		</div>

	)
}

export default cardResult