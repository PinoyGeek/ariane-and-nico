"use client"

import React from 'react';
import Link from 'next/link';
import { StorySection } from '@/components/StorySection';
import { Cinzel } from "next/font/google";
import { siteConfig } from '@/content/site';

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
        Love Story
        </h1>
        <p className={`${cinzel.className} text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-[0.14em] sm:tracking-[0.18em] font-normal leading-tight text-motif-medium mb-1`}>
        From Paper to Forever
        </p>
      </div>

      {/* SECTION 1: Top - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isFirst={true}
        title="The Unexpected Beginning"
        imageSrc="/mobile-background/couple (1).jpg"
        text={
          <>
            <p className="mb-4">
            Vince and Era’s story didn’t begin with a simple “Hi” or “Hello.”
It began with… a Personal Data Sheet.
Yes, you read that right.
<br />
<br />
LinkedIn who? 😭
<br />
<br />  
Sometime in late 2023, Vince already knew of Era—her name, her face.
Enough to make an impression. Enough to make him quietly think,
👀 “Siya na 'to.”
            </p>
           
          </>
        }
      />

      {/* SECTION 2: Middle - Light */}
      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/couple (5).jpg"
        title="Clueless but Thriving"
        text={
          <>
            <p>
            Era, on the other hand?
Clueless. Living her life. Thriving. Unbothered.
<br />
<br />
Fast forward to the last few days of January—
Era officially joined the Department of Agriculture.
And just like that, the girl Vince once only knew on paper
became his colleague.
            </p>
          </>
        }
      />

      {/* SECTION 3: Bottom - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/mobile-background/couple (3).jpg"
        title="Just Work… or So They Say"
        text={
          <>
            <p>
            At first, everything was normal.
Work. Papers. Deadlines.
Walang halong landi. Promise.
<br />
<br />
Until Valentine’s Day came.
            </p>
           
          </>
        }
      />
            {/* SECTION 4: Middle - Light */}
            <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/mobile-background/couple (4).jpg"
        title="The Chocolate Move"
        text={
          <>
            <p>
            Assigned at the Receiving Section, Era was simply doing her job when Vince approached her and said,
“Ma’am, pa-receive.”
<br />
<br />
Very work-appropriate…
except the “document” turned out to be a Goya chocolate tucked inside an envelope, with a small note:
Happy Valentine’s Day.
<br />
<br />
Smooth? Medyo.
Halata? Slightly. 😂
            </p>
          </>
        }
      />

      {/* SECTION 5: Bottom - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/mobile-background/couple (2).jpg"
        title="Sabay-Uwi Chronicles"
        text={
          <>
            <p>
            From there, things slowly unfolded—
from casual office encounters to quiet sabay-uwi moments.
<br />
<br />
Both from Taguig (convenient 👀), Vince—who was staying at the DA dorm—started joining Era on her commute, casually saying it was because he “missed his mom.”
(We all know… hindi lang si mother ang dahilan 😌)
            </p>
           
          </>      
        }
      />
                  {/* SECTION 4: Middle - Light */}
                  <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/frontboxes/box-2.jpg"
        title="The GMA-Kamuning Moment"
        text={
          <>
            <p>
            And then came one of the most unforgettable moments of their story—
GMA-Kamuning Station.
<br />
<br />
Out of nowhere, Era said:
“Wag mo ako bentahan ng insurance ah.”
<br />
<br />
Aray.
<br />
<br />
Imagine getting rejected…
sa bagay na hindi mo naman ino-offer. 😭
<br />
<br />
Because what Era didn’t know was this—
Vince was never offering something temporary.
<br />
<br />
Hindi insurance.
Hindi panandalian.
            </p>
          </>
        }
      />

      {/* SECTION 5: Bottom - Dark */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/frontboxes/box-2.jpg"
        title="A Lifetime Choice"
        text={
          <>
            <p>
            What he was offering…
was a lifetime.
A love that stays.
A choice he would make—every single day.
<br />
<br />
Maybe hindi agad nakita ni Era.
Hindi agad naramdaman.
<br />
<br />
But through every sabay-uwi,
every small moment,
every quiet effort—
<br />
<br />
she slowly found herself choosing him, too.
<br />
<br />
Until one day, it wasn’t confusing anymore.
<br />
<br />
From a name on a piece of paper,
he became her person.
Her constant.
Her home.
            </p>
           
          </>      
        }
      />
      {/* Footer Decoration */}
      <div className="bg-motif-cream pt-8 sm:pt-10 md:pt-12 pb-16 sm:pb-20 md:pb-24 text-center text-motif-deep z-0 relative px-4">
        <div className="w-12 sm:w-16 h-[1px] bg-motif-silver mx-auto mb-4 sm:mb-6 opacity-60"></div>
        <Link 
          href="#guest-list"
          className={`${cinzel.className} group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 text-[0.7rem] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-normal text-motif-cream bg-motif-deep rounded-sm border border-motif-deep transition-all duration-300 hover:bg-motif-accent hover:border-motif-accent hover:text-motif-cream hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-motif-soft/50 focus-visible:ring-offset-2 focus-visible:ring-offset-motif-cream`}
        >
          <span className="relative z-10">Join us</span>
          {/* Subtle glow effect on hover */}
          <div className="absolute inset-0 rounded-sm bg-motif-soft opacity-0 group-hover:opacity-25 blur-md transition-opacity duration-300 -z-0"></div>
        </Link>
      </div>

    </div>
  );
}

