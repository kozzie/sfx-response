import Image from "next/image";
import Navbar from '../components/Navbar';
import Userform from "@/components/Userform"
export default function Home() {
  return (
    <div>
      <Navbar />
      <Userform />
    </div>
  );
}
