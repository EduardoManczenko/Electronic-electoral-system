import Image from 'next/image';

interface Candidate {
  name: string;
  describe: string;
  candidatePhoto: string;
  politicalPartyName: string;
  politicalPartyNumber: number;
}

export default function CandidateListCard({ candidate }: { candidate: Candidate }) {
  return (
    <div className="bg-[#c9f0cb] w-full flex justify-center rounded-md gap-4 h-[30%]">
      <div className="w-[30%] flex justify-center">
        <Image
          width={110}
          height={120}
          src={candidate.candidatePhoto}
          alt={candidate.name}
          className="rounded-md border-green-100 border-2 w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-1 w-[20%] text-lg font-bold">
        <div>{candidate.name}</div>
        <div>{candidate.politicalPartyName}</div>
        <div>{candidate.politicalPartyNumber}</div>
      </div>

      <div className="flex flex-col text-sm justify-center pr-2 w-[80%]">
        {candidate.describe}
      </div>
    </div>
  );
}
