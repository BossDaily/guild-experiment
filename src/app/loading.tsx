import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        src="/cow.gif"
        height={256}
        width={256}
        alt="cowloading"
        unoptimized
      />
    </div>
  );
}
