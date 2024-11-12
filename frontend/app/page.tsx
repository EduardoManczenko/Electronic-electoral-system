import Image from "next/image";
import { Urna } from '../Components/Urna/index';

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full">
        <Urna/>
    </div>
  );
}
