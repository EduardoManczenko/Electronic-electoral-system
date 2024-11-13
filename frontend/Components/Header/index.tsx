import Link from "next/link";
import HeaderText from "./HeaderText";
import Image from 'next/image';

export function Header() {
    return (
        <div className="fixed z-40 top-0 w-full h-[83px] backdrop-blur-md flex justify-center items-center border-b-2 border-green-100 bg-[rgb(124,218,130)] bg-opacity-70 px-10">
            <div className="flex mr-[10%]">
                    <Image width={80} height={80} src="/images/logo_justica_eleitoral_2.png" alt="justica_eleitoral" />
                </div>

            <div className="flex items-center justify-between w-full max-w-[1200px]">
                
                <Link href='/' className="bg-[rgba(133,177,133,0.7)] hover:bg-[rgba(169,214,169,0.7)] border-r-[1px] border-b-[1px] border-green-100 px-4 py-2 h-[80px] flex flex-col items-center justify-center w-80 rounded-l-lg"><HeaderText>Urna</HeaderText></Link>

                <Link href='/ElectorRegister' className="bg-[rgba(133,177,133,0.7)] hover:bg-[rgba(169,214,169,0.7)] border-l-[1px] border-b-[1px] border-r-[1px] border-green-100 px-4 py-2 h-[80px] flex flex-col items-center justify-center w-80"><HeaderText>Registro Eleitor</HeaderText></Link>

                <Link href='/CandidateRegister' className="bg-[rgba(133,177,133,0.7)] hover:bg-[rgba(169,214,169,0.7)] border-l-[1px] border-b-[1px] border-r-[1px] border-green-100 px-4 py-2 h-[80px] flex flex-col items-center justify-center w-80"><HeaderText>Registro Candidato</HeaderText></Link>

                <div className="cursor-pointer bg-[rgba(133,177,133,0.7)] hover:bg-[rgba(169,214,169,0.7)] border-l-[1px] border-b-[1px] border-green-100 px-4 py-2 h-[80px] flex flex-col items-center justify-center w-80 rounded-r-lg">
                    <HeaderText>Connect wallet</HeaderText>
                </div>
            </div>
        </div>
    )
}