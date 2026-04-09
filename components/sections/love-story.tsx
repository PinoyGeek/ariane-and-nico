"use client"

import React from 'react';
import Link from 'next/link';
import { StorySection } from '@/components/StorySection';
import { Cinzel } from "next/font/google";
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})


// Palette lives in globals.css → @theme inline → --color-motif-*
// Edit there once to update every component.

export function LoveStory() {
  return (
    <div className="min-h-screen bg-motif-cream overflow-x-hidden">


      <div className="text-center text-motif-medium z-0 relative px-4">
        <div className="w-12 sm:w-16 h-[1px] bg-motif-silver mx-auto mb-4 sm:mb-6 opacity-60"></div>
        <h1 className={`${cinzel.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-[0.14em] sm:tracking-[0.18em] font-normal leading-tight text-motif-deep mt-8`}>
        Where Forever Began
        </h1>
        <p className={`${cinzel.className} text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-[0.14em] sm:tracking-[0.18em] font-normal leading-tight text-motif-medium mb-1`}>
        A love that grew quietly, deeply, and right on time.
        </p>
      </div>

      {/* SECTION 1: Top - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isFirst={true}
        // title="The Unexpected Beginning"
        imageSrc="/mobile-background/couple (18).JPG"
        text={
          <>
            <p className="mb-4">
            They met at nineteen—too young to understand love, yet old enough to remember the feeling of it beginning.
<br />
<br />
Ariane first noticed Nico at a leadership camp, where she served as a facilitator. In a place filled with voices and movement, he found a way to reach her—not for anything grand, but for the way he made her laugh so easily. With his playful humor and lighthearted charm, he turned ordinary moments into something she would quietly carry with her long after.
            </p>
           
          </>
        }
      />

      {/* SECTION 2: Middle - Light */}
      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/couple (11).JPG"
        // title="Clueless but Thriving"
        text={
          <>
            <p>
            It was gentle. It was unexpected. And somehow, it lingered.
<br />
<br />
What began as a passing connection slowly unfolded into a friendship neither of them rushed, yet neither could ignore. And somewhere between shared glances and unguarded laughter, it became something more. Not through dramatic confessions, but through the quiet language only they seemed to understand—corny jokes that never lost their charm, songs that became pieces of each other, conversations that drifted into comfortable silence, and moments so still yet so full, they said everything words could not.
            </p>
          </>
        }
      />

      {/* SECTION 3: Bottom - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/frontboxes/couple (56).JPG"
        // title="Just Work… or So They Say"
        text={
          <>
            <p>
            In the midst of ordinary days, they found something extraordinary: a love that was soft, steady, and deeply certain. Through distance, through waiting, through seasons that asked them to trust more than they could see their love did not falter. It deepened. It became a quiet refuge, a constant presence, a promise whispered in the unseen: that even in uncertainty, love endures and blooms in its own perfect time.
            </p>
           
          </>
        }
      />
    {/* SECTION 4: Middle - Light */}
            <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/couple (13).JPG"
        // title="The Chocolate Move"
        text={
          <>
            <p>
            Their story was never flawless but it was real. And in every imperfection, they found grace. In every pause, patience. In every challenge, a choice to stay, to understand, to hold on to each other more tightly than before.
            </p>
          </>
        }
      />

      {/* SECTION 5: Bottom - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/mobile-background/couple (19).JPG"
        // title="Sabay-Uwi Chronicles"
        text={
          <>
            <p>
            Looking back, what once felt like coincidence now feels like something sacred—something gently written by God’s hand, weaving their paths together in ways only He could design, at a time more beautiful than they could have ever imagined.
            </p>
           
          </>      
        }
      />
                  {/* SECTION 4: Middle - Light */}
                  <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/couple (10).JPG"
        // title="The Q.Ave MRT Moment"
        text={
          <>
            <p>
            Because perhaps love was never meant to arrive all at once. Perhaps it was always meant to be built slowly, tenderly, beautifully over time.
            </p>
          </>
        }
      />

      {/* SECTION 5: Bottom - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/mobile-background/couple (48).JPG"
        // title="A Lifetime Choice"
        text={
          <>
            <p>
            They didn’t fall in love at nineteen.
            But that was the moment their forever found its beginning.
            </p>
           
          </>      
        }
      />
      {/* Footer Decoration */}
      <div className="bg-motif-cream pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 md:pb-24 text-center text-motif-deep z-0 relative px-4">
        <div className="w-12 sm:w-16 h-[1px] bg-motif-soft mx-auto mb-4 sm:mb-6 opacity-60"></div>
        <Link 
          href="#guest-list"
          className={`${cinzel.className} group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 text-[0.7rem] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-normal text-motif-deep bg-motif-soft rounded-sm border border-motif-soft transition-all duration-300 hover:bg-motif-accent hover:border-motif-accent hover:text-motif-cream hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-motif-soft/50 focus-visible:ring-offset-2 focus-visible:ring-offset-motif-cream`}
        >
          <span className="relative z-10">Join us</span>
          {/* Subtle glow effect on hover */}
          <div className="absolute inset-0 rounded-sm bg-motif-soft opacity-0 group-hover:opacity-25 blur-md transition-opacity duration-300 -z-0"></div>
        </Link>
      </div>

    </div>
  );
}