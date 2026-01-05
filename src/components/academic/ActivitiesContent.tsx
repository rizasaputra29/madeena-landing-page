
"use client";

import Image from "next/image";
import { activitiesData } from "~/data/academic/activitiesData";
import { cn } from "~/lib/utils";

interface ActivitiesContentProps {
  category: "preschool" | "primary";
}

export default function ActivitiesContent({ category }: ActivitiesContentProps) {
  const data = activitiesData[category];

  if (!data) return null;

  // Chunk data into groups of 5 for the gallery pattern
  const chunks = [];
  for (let i = 0; i < data.length; i += 5) {
    chunks.push(data.slice(i, i + 5));
  }

  return (
    <section className="bg-background py-8 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex flex-col gap-4">
          {chunks.map((chunk, chunkIndex) => (
            <div
              key={chunkIndex}
              className="grid grid-flow-dense grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-[250px_250px]"
            >
              {chunk.map((item, index) => {
                const isBig = index === 0;
                // Pattern: First item is big (2x2), others are small (1x1)

                // Determine responsive classes
                let gridClass = "relative overflow-hidden rounded-xl bg-gray-100 group";

                if (isBig) {
                  // Big item: spans 2 cols & 2 rows on Desktop
                  // On chunks with odd index, maybe flip side if we want alternating? 
                  // Gallery.tsx usage: if (section.type === "right-large") ...
                  // Let's alternate: Even chunks = Left Big, Odd chunks = Right Big
                  const isRightLarge = chunkIndex % 2 !== 0;

                  gridClass += " col-span-2 row-span-2 h-[300px] md:h-full";

                  if (isRightLarge) {
                    gridClass += " md:col-start-3 md:row-start-1";
                  } else {
                    gridClass += " md:col-start-1 md:row-start-1";
                  }
                } else {
                  // Small item: 1x1
                  gridClass += " col-span-1 row-span-1 h-[150px] md:h-full";
                }

                return (
                  <div key={item.id} className={gridClass}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                      sizes={
                        isBig
                          ? "(max-width: 768px) 100vw, 50vw"
                          : "(max-width: 768px) 50vw, 25vw"
                      }
                    />
                    {/* Optional: subtle text overlay on hover since we removed visible cards */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                  </div>
                );
              })}

              {/* Fill empty spots if chunk has fewer than 5 items to keep grid structure? 
                  Gallery logic fills with empty divs. 
                  If we have < 5 items, the grid flow dense handles it, but specific positioning might break.
                  For simplicity in this step, we just map available items. 
                  The `grid-flow-dense` should pack valid items. 
                  However, the forced `col-start` styles on the BIG item assume a full 4x2 grid context.
                  If the chunk is incomplete, it might look slightly off but acceptable.
              */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}