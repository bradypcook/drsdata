'use client';

import React, { useState } from 'react';
import '@/app/globals.css'

interface Driver {
  code: string;
  name: string;
  team: string;
  teamColor: string;
  number: number;
}

interface RaceData {
  name: string;
  date: string;
  weather: string;
  temperature: string;
  actualPodium: Driver[];
}

interface PredictionFactor {
  id: string;
  name: string;
  description: string;
  value: number;
}

export default function RaceScopeComponent() {
  // 2024 F1 races data
  const races: { [key: string]: RaceData } = {
    'bahrain': {
      name: 'Bahrain Grand Prix',
      date: 'March 2, 2024',
      weather: 'Clear',
      temperature: '28°C',
      actualPodium: [
        { code: 'VER', name: 'Max Verstappen', team: 'Red Bull Racing', teamColor: '#15185f', number: 1 },
        { code: 'PER', name: 'Sergio Perez', team: 'Red Bull Racing', teamColor: '#15185f', number: 11 },
        { code: 'SAI', name: 'Carlos Sainz', team: 'Ferrari', teamColor: '#fe0000', number: 55 }
      ]
    },
    'saudi': {
      name: 'Saudi Arabian Grand Prix',
      date: 'March 9, 2024',
      weather: 'Clear',
      temperature: '31°C',
      actualPodium: [
        { code: 'VER', name: 'Max Verstappen', team: 'Red Bull Racing', teamColor: '#15185f', number: 1 },
        { code: 'PER', name: 'Sergio Perez', team: 'Red Bull Racing', teamColor: '#15185f', number: 11 },
        { code: 'LEC', name: 'Charles Leclerc', team: 'Ferrari', teamColor: '#fe0000', number: 16 }
      ]
    },
    'australia': {
      name: 'Australian Grand Prix',
      date: 'March 24, 2024',
      weather: 'Partly Cloudy',
      temperature: '24°C',
      actualPodium: [
        { code: 'SAI', name: 'Carlos Sainz', team: 'Ferrari', teamColor: '#fe0000', number: 55 },
        { code: 'LEC', name: 'Charles Leclerc', team: 'Ferrari', teamColor: '#fe0000', number: 16 },
        { code: 'NOR', name: 'Lando Norris', team: 'McLaren', teamColor: '#fd8000', number: 4 }
      ]
    },
    'japan': {
      name: 'Japanese Grand Prix',
      date: 'April 7, 2024',
      weather: 'Overcast',
      temperature: '19°C',
      actualPodium: [
        { code: 'VER', name: 'Max Verstappen', team: 'Red Bull Racing', teamColor: '#15185f', number: 1 },
        { code: 'PER', name: 'Sergio Perez', team: 'Red Bull Racing', teamColor: '#15185f', number: 11 },
        { code: 'SAI', name: 'Carlos Sainz', team: 'Ferrari', teamColor: '#fe0000', number: 55 }
      ]
    },
    'miami': {
      name: 'Miami Grand Prix',
      date: 'May 5, 2024',
      weather: 'Hot & Humid',
      temperature: '32°C',
      actualPodium: [
        { code: 'NOR', name: 'Lando Norris', team: 'McLaren', teamColor: '#fd8000', number: 4 },
        { code: 'VER', name: 'Max Verstappen', team: 'Red Bull Racing', teamColor: '#15185f', number: 1 },
        { code: 'LEC', name: 'Charles Leclerc', team: 'Ferrari', teamColor: '#fe0000', number: 16 }
      ]
    },
    'monaco': {
      name: 'Monaco Grand Prix',
      date: 'May 26, 2024',
      weather: 'Sunny',
      temperature: '25°C',
      actualPodium: [
        { code: 'LEC', name: 'Charles Leclerc', team: 'Ferrari', teamColor: '#fe0000', number: 16 },
        { code: 'PIA', name: 'Oscar Piastri', team: 'McLaren', teamColor: '#fd8000', number: 81 },
        { code: 'SAI', name: 'Carlos Sainz', team: 'Ferrari', teamColor: '#fe0000', number: 55 }
      ]
    }
  };

  // All drivers for predictions
  const allDrivers: Driver[] = [
    { code: 'VER', name: 'Max Verstappen', team: 'Red Bull Racing', teamColor: '#15185f', number: 1 },
    { code: 'PER', name: 'Sergio Perez', team: 'Red Bull Racing', teamColor: '#15185f', number: 11 },
    { code: 'LEC', name: 'Charles Leclerc', team: 'Ferrari', teamColor: '#fe0000', number: 16 },
    { code: 'SAI', name: 'Carlos Sainz', team: 'Ferrari', teamColor: '#fe0000', number: 55 },
    { code: 'NOR', name: 'Lando Norris', team: 'McLaren', teamColor: '#fd8000', number: 4 },
    { code: 'PIA', name: 'Oscar Piastri', team: 'McLaren', teamColor: '#fd8000', number: 81 },
    { code: 'HAM', name: 'Lewis Hamilton', team: 'Mercedes', teamColor: '#00f5d2', number: 44 },
    { code: 'RUS', name: 'George Russell', team: 'Mercedes', teamColor: '#00f5d2', number: 63 },
    { code: 'ALO', name: 'Fernando Alonso', team: 'Aston Martin', teamColor: '#00594f', number: 14 },
    { code: 'STR', name: 'Lance Stroll', team: 'Aston Martin', teamColor: '#00594f', number: 18 },
  ];

  const [selectedRace, setSelectedRace] = useState<string>('');
  const [factors, setFactors] = useState<PredictionFactor[]>([
    { id: 'cleanAirPace', name: 'Clean Air Race Pace', description: 'Historical average lap times in clean air', value: 95 },
    { id: 'qualifyingTime', name: 'Qualifying Performance', description: 'Grid position and qualifying performance', value: 82 },
    { id: 'teamPerformance', name: 'Team Performance', description: 'Constructor standings and recent form', value: 68 },
    { id: 'weatherImpact', name: 'Weather Impact', description: 'Rain probability and conditions', value: 45 },
    { id: 'trackTemperature', name: 'Track Temperature', description: 'Track surface temperature effects', value: 38 },
    { id: 'reliability', name: 'Reliability Factor', description: 'Historical DNF rates and mechanical issues', value: 72 }
  ]);

  const [predictions, setPredictions] = useState<Driver[]>([]);
  const [confidence, setConfidence] = useState<{ [key: string]: number }>({});

  const handleFactorChange = (factorId: string, value: number) => {
    setFactors(prev => prev.map(factor => 
      factor.id === factorId ? { ...factor, value } : factor
    ));
  };

  const calculatePredictions = () => {
    if (!selectedRace) return;

    // Simulate prediction calculation based on factors
    const predictedOrder = [...allDrivers];
    
    // Simple prediction algorithm based on factor weights
    predictedOrder.sort(() => Math.random() - 0.5);
    
    // Ensure semi-realistic by keeping top 6 in WDC near the top
    const strongPerformers = ['VER', 'LEC', 'NOR', 'PIA', 'RUS','HAM'];
    predictedOrder.sort((a, b) => {
      const aStrong = strongPerformers.includes(a.code);
      const bStrong = strongPerformers.includes(b.code);
      if (aStrong && !bStrong) return -1;
      if (!aStrong && bStrong) return 1;
      return 0;
    });

    setPredictions(predictedOrder);
    
    // Generate confidence levels
    const newConfidence: { [key: string]: number } = {};
    predictedOrder.forEach((driver, index) => {
      if (index === 0) newConfidence[driver.code] = Math.floor(Math.random() * 10) + 85; // 85-95%
      else if (index === 1) newConfidence[driver.code] = Math.floor(Math.random() * 15) + 75; // 75-90%
      else if (index === 2) newConfidence[driver.code] = Math.floor(Math.random() * 20) + 65; // 65-85%
      else newConfidence[driver.code] = Math.floor(Math.random() * 30) + 40; // 40-70%
    });
    setConfidence(newConfidence);
  };

  const resetPredictions = () => {
    setFactors([
      { id: 'cleanAirPace', name: 'Clean Air Race Pace', description: 'Historical average lap times in clean air', value: 95 },
      { id: 'qualifyingTime', name: 'Qualifying Performance', description: 'Grid position and qualifying performance', value: 82 },
      { id: 'teamPerformance', name: 'Team Performance', description: 'Constructor standings and recent form', value: 68 },
      { id: 'weatherImpact', name: 'Weather Impact', description: 'Rain probability and conditions', value: 45 },
      { id: 'trackTemperature', name: 'Track Temperature', description: 'Track surface temperature effects', value: 38 },
      { id: 'reliability', name: 'Reliability Factor', description: 'Historical DNF rates and mechanical issues', value: 72 }
    ]);
    setPredictions([]);
    setConfidence({});
  };

  return (
    <section className="relative bg-black text-white py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center space-y-4">
          <h2 className="text-3xl font-bold"> RaceScope</h2>
          <p className="text-gray-300">
            Analyze race data from {new Date().getFullYear() - 1} and see how different factors could have shaped the outcome of races throughout the season.
          </p>
        </div>

        {/* Race Selection */}
        <div className="bg-zinc-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Select Grand Prix 🏁</h3>
          <select
            value={selectedRace}
            onChange={(e) => setSelectedRace(e.target.value)}
            className="w-full p-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-red-500"
          >
            <option value="">Choose a race to analyze...</option>
            {Object.entries(races).map(([key, race]) => (
              <option key={key} value={key}>{race.name}</option>
            ))}
          </select>
        </div>

        {/* Prediction Factors */}
        {selectedRace && (
          <div className="bg-zinc-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-6">Prediction Factors</h3>
            <p className="text-gray-400 mb-6">Adjust the importance of each feature to see how it affects race predictions:</p>
            
            <div className="space-y-6">
              {factors.map((factor) => (
                <div key={factor.id} className="border border-zinc-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-medium">{factor.name}</h4>
                    <span className="text-red-500 text-lg font-bold">{factor.value}%</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{factor.description}</p>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={factor.value}
                      onChange={(e) => handleFactorChange(factor.id, parseInt(e.target.value))}
                      className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #fb923c 0%, #b91c1c ${factor.value}%, #374151 ${factor.value}%, #374151 100%)`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={calculatePredictions}
                className="flex-1 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Update Predictions
              </button>
              <button
                onClick={resetPredictions}
                className="flex-1 bg-zinc-600 hover:bg-zinc-500 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Reset Predictions
              </button>
            </div>
          </div>
        )}

        {/* Track Conditions */}
        {selectedRace && (
          <div className="bg-zinc-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Track Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-700 p-4 rounded-lg text-center">
                <h4 className="text-gray-400 text-sm">Race</h4>
                <p className="text-white font-medium">{races[selectedRace].name}</p>
              </div>
              <div className="bg-zinc-700 p-4 rounded-lg text-center">
                <h4 className="text-gray-400 text-sm">Weather</h4>
                <p className="text-white font-medium">{races[selectedRace].weather}</p>
              </div>
              <div className="bg-zinc-700 p-4 rounded-lg text-center">
                <h4 className="text-gray-400 text-sm">Temperature</h4>
                <p className="text-white font-medium">{races[selectedRace].temperature}</p>
              </div>
            </div>
          </div>
        )}

        {/* Predictions */}
        {predictions.length > 0 && (
          <div className="space-y-6">
            {/* Podium Predictions */}
            <div className="bg-zinc-800 p-3 md:p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <span className="text-xl md:text-2xl">🏆</span>
                <h3 className="text-lg md:text-xl font-semibold text-white">Podium Predictions</h3>
              </div>
              
              <div className="flex justify-center items-end space-x-2 md:space-x-4">
                {/* 2nd Place */}
                {predictions[1] && (
                  <div className="text-center flex-1 max-w-[110px] md:max-w-none">
                    <div className="bg-zinc-600 border-2 border-[#c0c0c0] rounded-lg p-2 md:p-4 mb-2">
                      <div className="text-sm md:text-lg font-bold text-white">{predictions[1].code}</div>
                      <div className="text-gray-400 text-xs hidden md:block">{predictions[1].team}</div>
                      <div className="text-green-400 text-xs md:font-medium md:mt-2">{confidence[predictions[1].code]}% <span className="hidden md:inline">confidence</span></div>
                    </div>
                    <div className="bg-[#c0c0c0] text-zinc-800 text-2xl md:text-4xl font-bold py-2 md:py-4 px-3 md:px-6 rounded">2</div>
                  </div>
                )}
                
                {/* 1st Place */}
                {predictions[0] && (
                  <div className="text-center flex-1 max-w-[130px] md:max-w-none">
                    <div className="bg-zinc-600 border-2 border-[#ffd700] rounded-lg p-2 md:p-4 mb-2">
                      <div className="text-sm md:text-lg font-bold text-white">{predictions[0].code}</div>
                      <div className="text-gray-400 text-xs hidden md:block">{predictions[0].team}</div>
                      <div className="text-green-400 text-xs md:font-medium md:mt-2">{confidence[predictions[0].code]}% <span className="hidden md:inline">confidence</span></div>
                    </div>
                    <div className="bg-[#ffd700] text-zinc-800 text-3xl md:text-5xl font-bold py-3 md:py-6 px-4 md:px-8 rounded">1</div>
                  </div>
                )}
                
                {/* 3rd Place */}
                {predictions[2] && (
                  <div className="text-center flex-1 max-w-[110px] md:max-w-none">
                    <div className="bg-zinc-600 border-2 border-[#cd7f32] rounded-lg p-2 md:p-4 mb-2">
                      <div className="text-sm md:text-lg font-bold text-white">{predictions[2].code}</div>
                      <div className="text-gray-400 text-xs hidden md:block">{predictions[2].team}</div>
                      <div className="text-green-400 text-xs md:font-medium md:mt-2">{confidence[predictions[2].code]}% <span className="hidden md:inline">confidence</span></div>
                    </div>
                    <div className="bg-[#cd7f32] text-white text-2xl md:text-4xl font-bold py-2 md:py-4 px-3 md:px-6 rounded">3</div>
                  </div>
                )}
              </div>
            </div>

            {/* Remaining Positions (4-10) */}
            <div className="bg-zinc-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 bg-zinc-700 border-b border-zinc-600">
                <h3 className="text-lg font-semibold text-white">Remaining Points Predictions</h3>
              </div>
              
              <div className="divide-y divide-zinc-700">
                {predictions.slice(3, 10).map((driver, index) => (
                  <div key={driver.code} className="p-4 hover:bg-zinc-700/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Position */}
                        <div className="text-xl font-bold text-white w-8">
                          {index + 4}
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
                          <div className="text-white font-medium">{driver.name}</div>
                          <div className="text-gray-400 text-sm">{driver.team}</div>
                        </div>
                      </div>
                      
                      {/* Confidence */}
                      <div className="text-right">
                        <div className="text-green-400 font-medium">{confidence[driver.code]}%</div>
                        <div className="text-gray-400 text-sm">confidence</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}