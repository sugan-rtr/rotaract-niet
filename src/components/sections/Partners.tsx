"use client";

import Image from "next/image";
import { partners } from "@/data/content";

export default function Partners() {
  const loop = [...partners, ...partners];

  return (
    <section className="py-16 border-y border-white/5 overflow-hidden">
      <p className="text-center eyebrow mb-8">Trusted alongside</p>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex items-center gap-16 animate-[marquee_28s_linear_infinite] shrink-0 px-8">
          {loop.map((partner, i) => (
            <div key={partner.name + i} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity shrink-0">
              <div className="relative h-8 w-28">
                <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
