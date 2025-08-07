'use client';

import React, { useState, useEffect } from 'react';

interface Driver {
  position: number;
  driver: string;
  code: string;
  team: string;
  points: number;
  number: number;
  teamColor: string;
}

export default function DriverStandings() {
  const [standings, setStandings] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // 2025 F1 Driver Standings (simulated current season data)
  const current2025Standings: Driver[] = [
    { position: 1, driver: 'Oscar Piastri', code: 'PIA', team: 'McLaren', points: 284, number: 81, teamColor: '#fd8000' },
    { position: 2, driver: 'Lando Norris', code: 'NOR', team: 'McLaren', points: 275, number: 4, teamColor: '#fd8000' },
    { position: 3, driver: 'Max Verstappen', code: 'VER', team: 'Red Bull Racing', points: 187, number: 1, teamColor: '#15185f' },
    { position: 4, driver: 'George Russell', code: 'RUS', team: 'Mercedes', points: 172, number: 63, teamColor: '#00f5d2' },
    { position: 5, driver: 'Charles Leclerc', code: 'LEC', team: 'Ferrari', points: 151, number: 16, teamColor: '#fe0000' },
    { position: 6, driver: 'Lewis Hamilton', code: 'HAM', team: 'Ferrari', points: 109, number: 44, teamColor: '#fe0000' },
    { position: 7, driver: 'Kimi Antonelli', code: 'ANT', team: 'Mercedes', points: 64, number: 12, teamColor: '#00f5d2' },
    { position: 8, driver: 'Alex Albon', code: 'ALB', team: 'Williams', points: 54, number: 23, teamColor: '#1868db' },
    { position: 9, driver: 'Nico Hulkenberg', code: 'HUL', team: 'Kick Sauber', points: 37, number: 27, teamColor: '#00e701' },
    { position: 10, driver: 'Esteban Ocon', code: 'OCO', team: 'Haas', points: 27, number: 31, teamColor: '#FFFFFF' },
    { position: 11, driver: 'Fernando Alonso', code: 'ALO', team: 'Aston Martin', points: 26, number: 14, teamColor: '#00594f' },
    { position: 12, driver: 'Lance Stroll', code: 'STR', team: 'Aston Martin', points: 26, number: 18, teamColor: '#00594f' },
    { position: 13, driver: 'Isack Hadjar', code: 'HAD', team: 'Racing Bulls', points: 22, number: 6, teamColor: '#1534cc' },
    { position: 14, driver: 'Pierre Gasly', code: 'GAS', team: 'Alpine', points: 20, number: 10, teamColor: '#FF69B4' },
    { position: 15, driver: 'Liam Lawson', code: 'LAW', team: 'Racing Bulls', points: 20, number: 30, teamColor: '#1534cc' },
    { position: 16, driver: 'Carlos Sainz', code: 'SAI', team: 'Williams', points: 16, number: 55, teamColor: '#1868db' },
    { position: 17, driver: 'Gabriel Bortoleto', code: 'GAB', team: 'Kick Sauber', points: 14, number: 5, teamColor: '#00e701' },
    { position: 18, driver: 'Yuki Tsunoda', code: 'TSU', team: 'Red Bull Racing', points: 10, number: 22, teamColor: '#15185f' },
    { position: 19, driver: 'Oliver Bearman', code: 'BEA', team: 'Haas', points: 8, number: 87, teamColor: '#FFFFFF' },
    { position: 20, driver: 'Franco Colapinto', code: 'COL', team: 'Alpine', points: 0, number: 43, teamColor: '#FF69B4' },
    { position: 21, driver: 'Jack Doohan', code: 'DOO', team: 'Alpine', points: 0, number: 7, teamColor: '#FF69B4' },
  ];

  // Load standings data function
  const loadStandings = () => {
    setLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setStandings(current2025Standings);
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  // Load data on component mount
  useEffect(() => {
    loadStandings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter standings to show only drivers from 4th position onwards
  const remainingDrivers = standings.filter(driver => driver.position > 3);

  return (
    <section className="relative bg-black text-white py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Loading State */}
        {loading && (
          <div className="bg-zinc-800 p-8 rounded-xl shadow-lg text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-700 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading standings...</p>
          </div>
        )}

        {/* Combined Header and Standings */}
        {!loading && standings.length > 0 && (
          <div className="bg-zinc-800 rounded-xl shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="p-6 bg-zinc-700 border-b border-zinc-600 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">WDC Standings</h2>
              <p className="text-gray-300 mb-3">2025 Championship after Round 14</p>
              {lastUpdated && (
                <p className="text-gray-400 text-sm mb-4">
                  Last updated: {lastUpdated.toLocaleString()}
                </p>
              )}
              
              {/* Refresh Button */}
              <button
                onClick={loadStandings}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 disabled:bg-zinc-600 px-6 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Refresh Standings'}
              </button>
            </div>
            
            {/* Top 3 Podium */}
            <div className="p-6 border-b border-zinc-600">
              <div className="flex justify-center items-end space-x-4">
                {/* 2nd Place */}
                <div className="text-center">
                  <div className="text-3xl mb-2">🥈</div>
                  <div 
                    className="w-full h-2 rounded mb-3"
                    style={{ backgroundColor: standings[1].teamColor }}
                  ></div>
                  <h4 className="text-base font-bold text-white mb-1">{standings[1].driver}</h4>
                  <p className="text-gray-400 text-xs mb-2">{standings[1].team}</p>
                  <div className="text-lg font-bold text-white">{standings[1].points} pts</div>
                </div>
                
                {/* 1st Place */}
                <div className="text-center">
                  <div className="text-4xl mb-3">🥇</div>
                  <div 
                    className="w-full h-3 rounded mb-4"
                    style={{ backgroundColor: standings[0].teamColor }}
                  ></div>
                  <h4 className="text-lg font-bold text-white mb-1">{standings[0].driver}</h4>
                  <p className="text-gray-400 text-sm mb-3">{standings[0].team}</p>
                  <div className="text-2xl font-bold text-white">{standings[0].points} pts</div>
                  <div className="text-xs text-gray-400 mt-2">
                    +{standings[0].points - standings[1].points} ahead
                  </div>
                </div>
                
                {/* 3rd Place */}
                <div className="text-center">
                  <div className="text-3xl mb-2">🥉</div>
                  <div 
                    className="w-full h-2 rounded mb-3"
                    style={{ backgroundColor: standings[2].teamColor }}
                  ></div>
                  <h4 className="text-base font-bold text-white mb-1">{standings[2].driver}</h4>
                  <p className="text-gray-400 text-xs mb-2">{standings[2].team}</p>
                  <div className="text-lg font-bold text-white">{standings[2].points} pts</div>
                </div>
              </div>
            </div>
            
            {/* Remaining Drivers (4th onwards) */}
            <div className="divide-y divide-zinc-700">
              {remainingDrivers.map((driver: Driver) => (
                <div key={driver.code} className="p-4 hover:bg-zinc-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Position */}
                      <div className="text-xl font-bold text-white w-8">
                        {driver.position}
                      </div>
                      
                      {/* Team Color Bar */}
                      <div 
                        className="w-1 h-12 rounded-full"
                        style={{ backgroundColor: driver.teamColor }}
                      ></div>
                      
                      {/* Driver Number */}
                      <div className="bg-zinc-600 text-white text-sm font-bold px-2 py-1 rounded min-w-[2.5rem] text-center">
                        {driver.number}
                      </div>
                      
                      {/* Driver Info */}
                      <div>
                        <div className="text-white font-medium">{driver.driver}</div>
                        <div className="text-gray-400 text-sm">{driver.team}</div>
                      </div>
                    </div>
                    
                    {/* Points */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">{driver.points}</div>
                      <div className="text-gray-400 text-sm">pts</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}