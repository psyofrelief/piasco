import Image from "next/image";

export default function GradientImage() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-1 flex items-end justify-center">
      <Image
        src="/images/gradient.webp"
        alt="gradient background"
        width={1000}
        height={400}
        className="h-100 w-full object-bottom"
        loading="eager"
        priority
      />
    </div>
  );
}
