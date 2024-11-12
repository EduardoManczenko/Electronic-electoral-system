// components/VotingKeyboard.js
import React, { useState } from 'react';

const VotingKeyboard = () => {
  const [input, setInput] = useState('');

  const handleNumberClick = (num: number) => {
    if (input.length < 2) { // Limita a 2 dígitos, se necessário
      setInput(input + num);
    }
  };

  const handleBrancoClick = () => {
    setInput('BRANCO');
  };

  const handleCorrigeClick = () => {
    setInput('');
  };

  const handleConfirmaClick = () => {
    alert(`Número votado: ${input}`);
    setInput('');
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md text-center w-[100%] h-[100%] flex flex-col justify-between">
      <div className="bg-white text-black text-xl p-2 mb-4 h-14 flex justify-center items-center rounded-md">
        {input}
      </div>

      <div className="grid grid-cols-3 gap-2 flex-grow">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num)}
            className="bg-black text-white text-md p-2 rounded-md"
          >
            {num}
          </button>
        ))}

        <button
          onClick={handleBrancoClick}
          className="bg-gray-200 text-black text-lg font-bold p-2 col-span-2 rounded-md"
        >
          BRANCO
        </button>

        <button
          onClick={handleCorrigeClick}
          className="bg-orange-500 text-black text-lg font-bold p-2 rounded-md"
        >
          CORRIGE
        </button>

        <button
          onClick={handleConfirmaClick}
          className="bg-green-500 text-white text-lg font-bold p-2 col-span-2 rounded-md"
        >
          CONFIRMA
        </button>
      </div>
    </div>
  );
};

export default VotingKeyboard;