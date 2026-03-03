import {
  CTA,
  Features,
  Hero,
  Stats,
  Testimonials,
  TrustedBy,
} from "@/modules/home/index";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center w-full justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <TrustedBy />
      <Features />
      <Stats />
      <Testimonials />
      <CTA />
    </div>
  );
}
