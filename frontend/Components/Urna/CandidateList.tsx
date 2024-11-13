import CandidateListCard from './CandidateListCard';

export default function CandidateList() {
    return (
        <div className="flex flex-col w-full h-full gap-1 overflow-y-scroll scrollbar-hide custom-scroll">
            <CandidateListCard />
            <CandidateListCard />
            <CandidateListCard />
            <CandidateListCard />
            <CandidateListCard />
            <CandidateListCard />
            <CandidateListCard />
            <CandidateListCard />
            <CandidateListCard />
            <CandidateListCard />
            <CandidateListCard />
            <CandidateListCard />
            
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