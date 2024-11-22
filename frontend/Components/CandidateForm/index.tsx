'use client'
import { useState } from "react";
import { ethers } from "ethers";
import { URNA_ADDRESS , ABI } from "../../config";

export default function CandidateForm() {
  const [formData, setFormData] = useState({
    name: "",
    describe: "",
    candidatePhoto: "",
    politicalPartyName: "",
    politicalPartyNumber: "",
    position: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask não está instalado!");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        URNA_ADDRESS,
        ABI,
        signer
      );

      const candidateData = {
        name: formData.name,
        describe: formData.describe,
        candidatePhoto: formData.candidatePhoto,
        politicalPartyName: formData.politicalPartyName,
        politicalPartyNumber: formData.politicalPartyNumber,
        votes: 0
      };

      const tx = await contract.createCandidate(candidateData, formData.position);
      console.log("Transação enviada:", tx);

      await tx.wait();
      console.log("Transação confirmada:", tx);
      alert("Candidato registrado com sucesso!");

      setFormData({
        name: "",
        describe: "",
        candidatePhoto: "",
        politicalPartyName: "",
        politicalPartyNumber: "",
        position: ""
      });
    } catch (err) {
      console.error("Erro ao registrar candidato:", err);
      setError("Erro ao registrar candidato. Verifique os dados ou tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-200">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Registro de Candidato</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Posição</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>
              Selecione uma posição
            </option>
            <option value="1">Presidente</option>
            <option value="2">Governador</option>
            <option value="3">Senador</option>
            <option value="4">Deputado Estadual</option>
            <option value="5">Deputado Federal</option>
          </select>
        </div>


        <div className="mb-4">
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Descrição</label>
          <textarea
            name="describe"
            value={formData.describe}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Foto do Candidato (URL)</label>
          <input
            type="text"
            name="candidatePhoto"
            value={formData.candidatePhoto}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Nome do Partido Político</label>
          <input
            type="text"
            name="politicalPartyName"
            value={formData.politicalPartyName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Número do Partido Político</label>
          <input
            type="text"
            name="politicalPartyNumber"
            value={formData.politicalPartyNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registrando..." : "Registrar Candidato"}
        </button>
      </form>
    </div>
  );
}