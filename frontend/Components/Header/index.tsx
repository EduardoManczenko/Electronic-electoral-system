'use client'
import { useState } from "react";
import { ethers } from "ethers";
import Link from "next/link";
import HeaderText from "./HeaderText";
import Image from 'next/image';


declare global {
    interface Window {
      ethereum?: any;
    }
  }

export function Header() {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    // Função para conectar à carteira
    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Solicitar acesso à carteira
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]); // Define o primeiro endereço da conta conectada


            } catch (error) {
                console.error("Erro ao conectar à carteira:", error);
            }
        } else {
            alert("MetaMask não detectado. Instale-o para conectar sua carteira.");
        }
    }

    return (
        <div className="fixed z-40 top-0 w-full h-[83px] backdrop-blur-md flex justify-center items-center border-b-2 border-green-100 bg-[rgb(124,218,130)] bg-opacity-70 px-10">
            <div>
                <Image width={80} height={80} src="/images/logo_justica_eleitoral_2.png" alt="justica_eleitoral" />
            </div>

            <div className="flex items-center justify-between w-full max-w-[1200px] mx-[40px]">
                <Link href='/' className="bg-[rgba(133,177,133,0.7)] hover:bg-[rgba(169,214,169,0.7)] border-r-[1px] border-b-[1px] border-green-100 px-4 py-2 h-[80px] flex flex-col items-center justify-center w-80 rounded-l-lg">
                    <HeaderText>Urna</HeaderText>
                </Link>

                <Link href='/ElectorRegister' className="bg-[rgba(133,177,133,0.7)] hover:bg-[rgba(169,214,169,0.7)] border-l-[1px] border-b-[1px] border-r-[1px] border-green-100 px-4 py-2 h-[80px] flex flex-col items-center justify-center w-80">
                    <HeaderText>Registro Eleitor</HeaderText>
                </Link>

                <Link href='/CandidateRegister' className="bg-[rgba(133,177,133,0.7)] hover:bg-[rgba(169,214,169,0.7)] border-l-[1px] border-b-[1px] border-r-[1px] border-green-100 px-4 py-2 h-[80px] flex flex-col items-center justify-center w-80">
                    <HeaderText>Registro Candidato</HeaderText>
                </Link>

                <div 
                    onClick={connectWallet} 
                    className="cursor-pointer bg-[rgba(133,177,133,0.7)] hover:bg-[rgba(169,214,169,0.7)] border-l-[1px] border-b-[1px] border-green-100 px-4 py-2 h-[80px] flex flex-col items-center justify-center w-80 rounded-r-lg"
                >
                    <HeaderText>{walletAddress ? `Conectado: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect wallet"}</HeaderText>
                </div>
            </div>
        </div>
    );
}
