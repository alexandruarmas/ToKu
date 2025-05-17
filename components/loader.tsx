import Image from "next/image";

export const Loader = () => {
  return (
    <div className="flex-center h-screen w-full">
      <Image
        src="/icons/loading-circle.svg"
        alt="Se încarcă"
        width={50}
        height={50}
      />
    </div>
  );
};
