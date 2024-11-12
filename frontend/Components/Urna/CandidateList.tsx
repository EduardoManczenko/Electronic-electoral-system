import CandidateListCard from './CandidateListCard';


export default function CandidateList(){
    return(
        <div className="flex flex-col w-full h-full gap-1">
            <CandidateListCard/>
            <CandidateListCard/>
            <CandidateListCard/>
            <CandidateListCard/>
    
        </div>
    )
}