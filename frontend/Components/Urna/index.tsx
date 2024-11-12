'use client'
import Image from 'next/image';
import VotingKeyboard from './VotingKeyboard';
import CandidateList from './CandidateList';

export function Urna(){
    //<Image width={800} height={700} src="/images/justica_eleitoral.png" alt="justica_eleitoral" className='rounded-md'></Image>
    return(
        <div className="bg-[#d3eed5] w-full h-screen flex flex-col items-center justify-center pt-[80px]">
            <div className="bg-[rgb(124,218,130)] w-[80%] h-[50%] flex rounded-lg items-center justify-center gap-20">
                <div className='bg-[rgb(155,214,159)] w-[60%] h-[90%] rounded-lg border-[#a4e9a8] border-4'>

                <CandidateList/>

                </div>

                <div>
                    <VotingKeyboard/>
                </div>
            </div>
        </div>
    )
}