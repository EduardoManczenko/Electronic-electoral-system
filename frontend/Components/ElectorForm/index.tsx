'use client'
import { useState } from "react";

export default function ElectorForm() {
  const [formData, setFormData] = useState({
    name: "",
    cpf: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCpfChange = (e: any) => {
    const { value } = e.target;
    const formattedCpf = value
      .replace(/\D/g, "") // Remove non-digit characters
      .replace(/(\d{3})(\d)/, "$1.$2") // Add first dot
      .replace(/(\d{3})(\d)/, "$1.$2") // Add second dot
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Add dash

    setFormData({ ...formData, cpf: formattedCpf });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-200">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Registro de Eleitor</h2>

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
            maxLength={14} // CPF format length
            placeholder="XXX.XXX.XXX-XX"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Registrar Eleitor
        </button>
      </form>
    </div>
  );
}