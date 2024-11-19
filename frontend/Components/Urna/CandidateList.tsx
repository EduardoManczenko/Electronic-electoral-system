'use client';

import { useEffect, useState } from 'react';
import CandidateListCard from './CandidateListCard';
import { ethers } from 'ethers';
import { URNA_ADDRESS, ABI } from '../../config';

interface CandidateData {
  name: string;
  describe: string;
  candidatePhoto: string;
  politicalPartyName: string;
  politicalPartyNumber: number;
}

export default function CandidateList({ position }: { position: number }) {
  const [candidates, setCandidates] = useState<CandidateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!window.ethereum) {
          throw new Error('MetaMask não está instalado!');
        }
        const rpc_url = "https://polygon-amoy.drpc.org"
        const provider = new ethers.JsonRpcProvider(rpc_url);
        const contract = new ethers.Contract(URNA_ADDRESS, ABI, provider);
        console.log("aoooooooo", position)
        const candidatesData: [string, string, string, string, number][] = await contract.verifyCandidatesData(position);
        console.log(candidatesData, "aquiuiiiii")
        // Mapear os dados retornados para o formato esperado pelo componente
        const parsedCandidates = candidatesData.map(([name, describe, candidatePhoto, politicalPartyName, politicalPartyNumber]) => ({
          name,
          describe,
          candidatePhoto,
          politicalPartyName,
          politicalPartyNumber,
        }));

        setCandidates(parsedCandidates);
      } catch (err) {
        console.error('Erro ao buscar candidatos:', err);
        setError('Erro ao carregar os candidatos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [position]);

  if (loading) {
    return <div>Carregando candidatos...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col w-full h-full gap-1 overflow-y-scroll scrollbar-hide custom-scroll">
      {candidates.map((candidate, index) => (
        <CandidateListCard key={index} candidate={candidate} />
      ))}

      <style jsx>{`
        /* Estiliza a barra de rolagem apenas para o componente */
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #84e28c; /* Cor verde claro */
          border-radius: 9999px; /* Deixa o polegar arredondado */
        }

        .custom-scroll::-webkit-scrollbar-button {
          display: none;
        }

        /* Para Firefox */
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #9e9e9e transparent;
        }
      `}</style>
    </div>
  );
}
