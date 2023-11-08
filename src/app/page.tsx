import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-col items-center justify-start min-h-screen">
        <h1 className="text-9xl mt-10 font-bold">WisdomAI</h1>
        <Button className=" mt-8 bg-gradient-to-r from-pink-500 to-rose-500 transition duration-300 ease-in-out hover:scale-110 text-white font-bold py-2 px-4 rounded text-xl">
          <Link href="/create">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
