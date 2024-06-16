'use client'
import "@/app/style/style.css"
import TitleLanding from "@/components/TitleLanding";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

	return (
	<div className="landing">
			<h2 className="logoName">FITGear</h2>
			<TitleLanding />
			<Image className="assistant" src="/image/assistant.png" alt="vendeur" height={500} width={500} />
			<Link href="/ia">
				<Image className="recordButton" src="/image/record.png" alt="record button" height={500} width={500} />
			</Link>
			
	</div>
   );
}
