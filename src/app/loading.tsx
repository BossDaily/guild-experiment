import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        src="https://media.discordapp.net/attachments/996891985157828638/1084314805407584296/cow.gif?size=256"
        height={256}
        width={256}
        alt="cowloading"
      />
    </div>
  );
}
