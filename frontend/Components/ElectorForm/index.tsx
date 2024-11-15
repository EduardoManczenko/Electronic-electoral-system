'use client'
import { useState } from "react";
import { ethers } from "ethers";
import { URNA_ADDRESS, ABI } from "../../config";

export default function ElectorForm() {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    walletAddress: ""
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCpfChange = (e: any) => {
    const { value } = e.target;
    const formattedCpf = value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setFormData({ ...formData, cpf: formattedCpf });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask não está instalado!");
      }

      // Solicitar acesso à carteira do usuário
      await window.ethereum.request({ method: "eth_requestAccounts" });
   
      const provider = new ethers.BrowserProvider(window.ethereum)

      const signer = await provider.getSigner();

      const contract = new ethers.Contract(URNA_ADDRESS, [ABI.createElectorFunction], signer);

      const electorData = {
        name: formData.name,
        cpf: formData.cpf
      };

      const tx = await contract.createElector(electorData, formData.walletAddress);

      console.log("Transação enviada:", tx);
      await tx.wait();
      console.log("Transação confirmada:", tx);
      alert("Eleitor registrado com sucesso!");

      // Resetar o formulário
      setFormData({ name: "", cpf: "", walletAddress: "" });
    } catch (err) {
      console.error("Erro ao registrar eleitor:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-200">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Registro de Eleitor</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Endereço Proprietario</label>
          <input
            type="text"
            name="walletAddress"
            value={formData.walletAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="0x..."
          />
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
          <label className="block text-gray-700">CPF</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleCpfChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            maxLength={14}
            placeholder="XXX.XXX.XXX-XX"
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registrando..." : "Registrar Eleitor"}
        </button>
      </form>
    </div>
  );
}
