'use client'
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/env')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No env data</p>;

  return (
       <main className="flex min-h-screen flex-col items-center p-2">
       <h1 className="text-4xl">SenseHat Readings</h1><br />
          <code className="font-mono font-bold">Temperature: {data.temperature}</code><br />
          <code className="font-mono font-bold">Humidity: {data.humidity}</code><br />
          <code className="font-mono font-bold">Pressure: {data.pressure}</code><br />
       
       </main>
  );
}
