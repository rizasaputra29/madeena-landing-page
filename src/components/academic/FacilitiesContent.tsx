
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { facilitiesData } from "~/data/academic/facilitiesdata";
import { cn } from "~/lib/utils";

interface FacilitiesContentProps {
  category: "preschool" | "primary";
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function FacilitiesContent({
  category,
}: FacilitiesContentProps) {
  const data = facilitiesData[category];

  if (!data) return null;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => {
            const isLarge = index % 4 === 0 || index % 4 === 3;

            return (
              <motion.div
                key={item.id}
                className={cn(
                  "group relative overflow-hidden rounded-3xl bg-gray-100 shadow-lg",
                  "col-span-1",
                  isLarge ? "md:col-span-2" : "md:col-span-1",
                  "h-[400px] md:h-[450px]",
                )}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 33vw"
                />

                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}