import ObjectDetection from "@/components/object-detection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen flex-col 
    items-center justify-between p-10">
    <div className="font-extrabold text-3xl md:text-6xl 
    gradient-title mt-0
    lg:text-8xl tracking-tighter md:px-6 text-center ">
      Thief Detection Alert
    </div>
  
      <ObjectDetection/>
 

    </main>
  );
}
