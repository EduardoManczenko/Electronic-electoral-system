import Image from 'next/image';

export default function CandidateListCard(){
    return(
        <div className="bg-[#c9f0cb] w-full flex justify-center rounded-md gap-4 h-[30%]">

            <div className='w-[30%] flex jusfity-center'>
                <Image width={110} height={120} src="/images/bozonaro.png" alt="justica_eleitoral" className='rounded-md border-green-100 border-2 w-full h-full'></Image>
            </div>

            <div className='flex flex-col items-center justify-center gap-1 font-bold w-[20%] text-lg font-bold'>
                <div>Jair Bolsonaro</div>
                <div>PT</div>
                <div>22</div>
            </div>

            <div className='flex flex-col text-lg justify-center pr-2 w-[80%]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt iure obcaecati esse officiis nemo atque eligendi lorem, Nesciunt iure obcaecati esse officiis nemo atque eligendi lorem, Nesciunt iure obcaecati esse officiis nemo atque eligendi lorem, Nesciunt iure obcaecati esse officiis nemo atque eligendi lorem
            </div>
    </div>
    )
}