'use client'
import { useState, useEffect } from 'react';

interface EnvData {
  temperature: number;
  humidity: number;
  pressure: number;
}

export default function Home(): JSX.Element {
  const [data, setData] = useState<EnvData | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/env');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const envData: EnvData = await response.json();
        setData(envData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every 10 seconds
    const interval = setInterval(fetchData, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No env data</p>;

  const isTemperatureHigh = data.temperature > 40;
  const isPressureHigh = data.pressure > 900;

  return (
    <main className="flex min-h-screen flex-col items-center p-2">
      <h1 className="text-4xl">SenseHat Readings</h1><br />
      <code className="font-mono font-bold">Temperature: {data.temperature}</code><br />
      <code className="font-mono font-bold">Humidity: {data.humidity}</code><br />
      <code className="font-mono font-bold">Pressure: {data.pressure}</code><br />
      {isTemperatureHigh && <p className="text-red-500 font-bold">Warning: Temperature is over 40 degrees!</p>}
      {isPressureHigh && <p className="text-red-500 font-bold">Warning: Pressure is over 900!</p>}
    </main>
  );
}

