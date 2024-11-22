'use client';
import { useState } from 'react';
import Image from 'next/image';
import VotingKeyboard from './VotingKeyboard';
import CandidateList from './CandidateList';

export function Urna() {
    const positions = [
        { id: 1, name: 'Presidente' },
        { id: 2, name: 'Governador' },
        { id: 3, name: 'Senador' },
        { id: 4, name: 'Deputado Estadual' },
        { id: 5, name: 'Deputado Federal' },
    ];

    const [currentPosition, setCurrentPosition] = useState(1);

    return (
        <div className="bg-[#c7ebca] w-full h-screen flex flex-col items-center justify-center pt-[80px] ">
            {/* Navigation Tabs */}
            <div className="flex gap-4 mb-4">
                {positions.map((position) => (
                    <button
                        key={position.id}
                        onClick={() => setCurrentPosition(position.id)}
                        className={`px-4 py-2 rounded-md ${
                            currentPosition === position.id
                                ? 'bg-green-600 text-white'
                                : 'bg-green-200 text-black'
                        }`}
                    >
                        {position.name}
                    </button>
                ))}
            </div>

            <div className="bg-[rgb(124,218,130)] border-2 px-4 border-green-100 w-[90%] max-w-[1700px] h-[50%] min-h-[600px] shadow-lg max-h-[675px] flex rounded-md items-center justify-center gap-10">
                {/* Candidate List Section */}
                <div className="bg-[rgb(155,214,159)] w-[70%] max h-[90%] rounded-lg border-[#a4e9a8] border-4">
                    <CandidateList position={currentPosition} />
                </div>

                {/* Voting Keyboard Section */}
                <div className="h-[90%] w-[30%] max-w-[400px] flex flex-col">
                    <div className="flex items-center justify-center gap-4 mb-2 px-4 py-2 border-green-100 bg-green-200 border-2 rounded-md">
                        <Image
                            width={100}
                            height={100}
                            src="/images/logo_justica_eleitoral.png"
                            alt="justica_eleitoral"
                            className="rounded-md"
                        />
                        <div className="text-2xl font-extrabold text-end">
                            JUSTIÇA ELEITORAL
                        </div>
                    </div>
                    <VotingKeyboard position={currentPosition} />
                </div>
            </div>
        </div>
    );
}