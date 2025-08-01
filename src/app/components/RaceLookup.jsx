'use client';

import { useState } from 'react';

export default function RaceLookup() {
  const [inputValue, setInputValue] = useState('');
  const [raceData, setRaceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRaceData = async () => {
    setLoading(true);
    setError('');
    setRaceData([]);

    try {
      const response = await fetch(`https://api.openf1.org/v1/sessions?date=${inputValue}`);
      const data = await response.json();

      if (data.length === 0) {
        setError('No races found for that date.');
      } else {
        setRaceData(data);
      }
    } catch (err) {
      setError('Something went wrong while fetching data.');
    }

    setLoading(false);
  };

  return (
    <section className="relative bg-black text-white py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center space-y-4">
          <h2 className="text-3xl font-bold"> Are there some race stats you want to see?</h2>
          <p className="text-gray-300">Enter the date below (in the following format: [FULLYEAR-MONTH-DAY])</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchRaceData();
            }}
            className="flex flex-col items-center space-y-4 w-full"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="YYYY-MM-DD"
              className="border px-4 py-2 rounded text-gray-300 w-full"
            />

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
            >
              Submit
            </button>
          </form>

          {loading && <p className="text-sm text-gray-400">Loading...</p>}
          {error && <p className="text-sm text-red-400">{error}</p>}

          {raceData.length > 0 && (
            <div className="mt-6 text-left w-full space-y-4">
              <h3 className="text-2xl font-semibold">Results:</h3>
              {raceData.map((race, idx) => (
                <div key={idx} className="bg-zinc-700 p-4 rounded">
                    <p><strong>Session:</strong> {race?.session_name || 'N/A'}</p>
                    <p><strong>Location:</strong> {race?.location || 'N/A'}</p>
                    <p><strong>Start Time:</strong> {race?.date_start ? new Date(race.date_start).toLocaleString() : 'N/A'}</p>
                </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}