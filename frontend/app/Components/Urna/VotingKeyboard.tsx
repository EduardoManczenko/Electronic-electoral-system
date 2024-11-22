import React, { useState } from 'react';
import { ethers } from "ethers";
import { URNA_ADDRESS, ABI } from "../../../config";

const VotingKeyboard = ({ position }: { position: number }) => {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleConfirmaClick = async () => {
    if (!input) {
      alert("Insira um número para votar ou escolha BRANCO.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask não está instalado!");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(URNA_ADDRESS, ABI, signer);

      if (input === 'BRANCO') {
        const tx = await contract.vote(ethers.ZeroAddress, position);
        console.log("Transação enviada:", tx);

        await tx.wait();
        console.log("Transação confirmada:", tx);

        alert("Voto em branco registrado.");
      } else {
        const candidateAddress = await contract.verifyCandidatesByPPN(position, input);
        const tx = await contract.vote(candidateAddress, position);
        console.log("Transação enviada:", tx);

        await tx.wait();
        console.log("Transação confirmada:", tx);

        alert(`Voto registrado para o número ${input}!`);
      }
      setInput('');
    } catch (err) {
      console.error("Erro ao votar:", err);
      setError("Erro ao votar. Verifique sua conexão ou tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
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
          className={`bg-green-500 text-white text-lg font-bold p-2 col-span-2 rounded-md ${isSubmitting ? 'opacity-50' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registrando..." : "CONFIRMA"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default VotingKeyboard;
