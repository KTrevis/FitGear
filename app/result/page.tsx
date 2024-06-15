'use client'
import React, { useState, useEffect } from "react";

const Page = () => {
  const [bike, setBike] = useState<any>();

  useEffect(() => {
    const idsStr = localStorage.getItem("id");
    const ids = idsStr ? JSON.parse(idsStr) : [];
    const id = ids.length > 0 ? ids[0] : null;

    const findBike = async () => {
      if (id !== null) {
        try {
          const response = await fetch("/dataBikes.json");
          const fileDataBike = await response.json();
          const foundBike = fileDataBike.find((bike: any) => bike.id === id);
          setBike(foundBike);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    findBike();
  }, []);

  return (
    <div className="resultPage">
      {bike ? (
        <>
          <p>Result page my friend l'id du bike est: {bike.id}</p>
          <p>Le nom du vélo est: {bike.nom_modele}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;
