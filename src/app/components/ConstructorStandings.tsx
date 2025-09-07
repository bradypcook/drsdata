'use client';

import React, { useState, useEffect } from 'react';

interface Constructor {
  position: number;
  team: string;
  code: string;
  points: number;
  teamColor: string;
  drivers: string[];
}

export default function ConstructorStandings() {
  const [standings, setStandings] = useState<Constructor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // 2025 F1 Constructor Standings (simulated current season data)
  const current2025Standings: Constructor[] = [
    { position: 1, team: 'McLaren', code: 'MCL', points: 617, teamColor: '#fd8000', drivers: ['Lando Norris', 'Oscar Piastri'] },
    { position: 2, team: 'Ferrari', code: 'FER', points: 280, teamColor: '#fe0000', drivers: ['Charles Leclerc', 'Lewis Hamilton'] },
    { position: 3, team: 'Mercedes', code: 'MER', points: 260, teamColor: '#00f5d2', drivers: ['George Russell', 'Kimi Antonelli'] },
    { position: 4, team: 'Red Bull Racing', code: 'RBR', points: 239, teamColor: '#15185f', drivers: ['Max Verstappen', 'Yuki Tsunoda'] },
    { position: 5, team: 'Williams', code: 'WIL', points: 86, teamColor: '#1868db', drivers: ['Carlos Sainz', 'Alex Albon'] },
    { position: 6, team: 'Aston Martin', code: 'AST', points: 62, teamColor: '#00594f', drivers: ['Fernando Alonso', 'Lance Stroll'] },
    { position: 7, team: 'Racing Bulls', code: 'RB', points: 61, teamColor: '#1534cc', drivers: ['Isack Hadjar', 'Liam Lawson'] },
    { position: 8, team: 'Kick Sauber', code: 'SAU', points: 55, teamColor: '#00e701', drivers: ['Nico Hulkenberg', 'Gabriel Bortoleto'] },
    { position: 9, team: 'Haas', code: 'HAS', points: 44, teamColor: '#FFFFFF', drivers: ['Esteban Ocon', 'Oliver Bearman'] },
    { position: 10, team: 'Alpine', code: 'ALP', points: 20, teamColor: '#FF69B4', drivers: ['Pierre Gasly', 'Franco Colapinto'] },
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

  // Filter standings to show only constructors from 4th position onwards
  const remainingConstructors = standings.filter(constructor => constructor.position > 3);

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
              <h2 className="text-3xl font-bold text-white mb-2">WCC Standings</h2>
              <p className="text-gray-300 mb-3">2025 Championship after Round 16</p>
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
                  <h4 className="text-base font-bold text-white mb-1">{standings[1].team}</h4>
                  <p className="text-gray-400 text-xs mb-2">{standings[1].drivers.join(' & ')}</p>
                  <div className="text-lg font-bold text-white">{standings[1].points} pts</div>
                </div>
                
                {/* 1st Place */}
                <div className="text-center">
                  <div className="text-4xl mb-3">🥇</div>
                  <div 
                    className="w-full h-3 rounded mb-4"
                    style={{ backgroundColor: standings[0].teamColor }}
                  ></div>
                  <h4 className="text-lg font-bold text-white mb-1">{standings[0].team}</h4>
                  <p className="text-gray-400 text-sm mb-3">{standings[0].drivers.join(' & ')}</p>
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
                  <h4 className="text-base font-bold text-white mb-1">{standings[2].team}</h4>
                  <p className="text-gray-400 text-xs mb-2">{standings[2].drivers.join(' & ')}</p>
                  <div className="text-lg font-bold text-white">{standings[2].points} pts</div>
                </div>
              </div>
            </div>
            
            {/* Remaining Constructors (4th onwards) */}
            <div className="divide-y divide-zinc-700">
              {remainingConstructors.map((constructor: Constructor) => (
                <div key={constructor.code} className="p-4 hover:bg-zinc-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Position */}
                      <div className="text-xl font-bold text-white w-8">
                        {constructor.position}
                      </div>
                      
                      {/* Team Color Bar */}
                      <div 
                        className="w-1 h-12 rounded-full"
                        style={{ backgroundColor: constructor.teamColor }}
                      ></div>
                      
                      {/* Team Code */}
                      <div className="bg-zinc-600 text-white text-sm font-bold px-2 py-1 rounded min-w-[2.5rem] text-center">
                        {constructor.code}
                      </div>
                      
                      {/* Constructor Info */}
                      <div>
                        <div className="text-white font-medium">{constructor.team}</div>
                        <div className="text-gray-400 text-sm">{constructor.drivers.join(' & ')}</div>
                      </div>
                    </div>
                    
                    {/* Points */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">{constructor.points}</div>
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