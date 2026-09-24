import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="flex min-h-[calc(100vh-88px)] items-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative mx-auto flex w-full max-w-362.5 overflow-hidden rounded-3xl border border-[#25282F] bg-[#15171D]">
        {/* Left Content */}
        <div className="flex w-full items-center px-8 py-14 sm:px-12 lg:w-[58%] lg:px-16">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-bold tracking-[0.12em] text-(--primary-color)">
              WORKOUT LIBRARY
            </p>

            <h1 className="font-oswald text-5xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[78px]">
              Train with intent.
              <br />
              Log every set.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-[#9DA3AE] sm:text-lg">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex h-12 items-center rounded-lg bg-(--primary-color) px-7 text-sm font-bold uppercase tracking-wide text-black transition hover:brightness-90"
            >
              Browse Workouts
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="absolute inset-y-0 right-0 hidden w-[42%] items-center justify-center lg:flex">
          <Image
            src="/banner.png"
            alt="FitLog workout"
            width={480}
            height={480}
            priority
            className="h-auto w-[85%] max-w-100 object-contain"
          />
        </div>

        {/* Mobile Image */}
        <div className="absolute bottom-0 right-0 h-64 w-64 opacity-15 sm:h-72 sm:w-72 lg:hidden">
          <Image
            src="/banner.png"
            alt="FitLog workout"
            fill
            className="object-contain object-bottom-right"
            sizes="288px"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;