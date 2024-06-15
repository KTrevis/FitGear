'use client'
import React, { useState, useEffect } from 'react';

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
    return <div>Loading...</div>;
  }

  if (!bike) {
    return <div>No bike found</div>;
  }

  return (
    <div>
      <p>Result page my friend, l'id du bike est: {bike.id}</p>
      <p>Le nom du vélo est: {bike.nom_modele}</p>
    </div>
  );
};

export default Page;
