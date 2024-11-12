import Link from "next/link";
import HeaderText from "./HeaderText";


export function Header(){

    return(
        <div className="fixed z-40 top-0 w-full h-[80px] backdrop-blur-md flex flex-col justify-center items-center border-b-2 border-green-100 bg-[rgb(124,218,130)] bg-opacity-70 px-10">
            <div className="flex items-center justify-between gap-8">
                <HeaderText>Urna</HeaderText>
                <HeaderText>Registro Eleitor</HeaderText>
                <HeaderText>Registro Candidato</HeaderText>
                <HeaderText>Connect wallet</HeaderText>
            </div>    
        </div>
    )
}