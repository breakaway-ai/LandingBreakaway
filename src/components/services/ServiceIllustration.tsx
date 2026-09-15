import Image from "next/image";

type ServiceIllustrationProps = {
  src: string;
  className?: string;
};

export default function ServiceIllustration({
  src,
  className = "aspect-[16/9] sm:aspect-[2/1]",
}: ServiceIllustrationProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-ink/10 bg-background-alt shadow-card ${className}`}
    >
      <div className="absolute inset-4 rounded-xl border border-dashed border-ink/15 sm:inset-6 md:inset-8">
        <Image
          src={src}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-contain p-3 sm:p-5 md:p-6"
        />
      </div>
    </div>
  );
}
