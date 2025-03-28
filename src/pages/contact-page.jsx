"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import PageHeader from "../components/common/page-header"
import SectionHeader from "../components/common/section-header"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import { Card, CardContent } from "../components/ui/card"
import { useToast } from "../components/ui/use-toast"

// SVG Components
const HeritageBorder = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 1000 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Top Left Corner */}
    <path
      d="M0 40C0 17.9086 17.9086 0 40 0H100C111.046 0 120 8.95431 120 20C120 31.0457 111.046 40 100 40H40V100C40 111.046 31.0457 120 20 120C8.95431 120 0 111.046 0 100V40Z"
      fill="url(#paint0_linear)"
      fillOpacity="0.2"
    />
    <path
      d="M5 40C5 20.67 20.67 5 40 5H100C108.284 5 115 11.7157 115 20C115 28.2843 108.284 35 100 35H40C37.7909 35 36 36.7909 36 39V100C36 108.284 29.2843 115 21 115C12.7157 115 6 108.284 6 100V40C6 39.6667 5.96667 39.3333 5.9 39C5.43333 38.3333 5 37.6667 5 37V40Z"
      stroke="url(#paint1_linear)"
      strokeOpacity="0.5"
    />

    {/* Top Right Corner */}
    <path
      d="M1000 40C1000 17.9086 982.091 0 960 0H900C888.954 0 880 8.95431 880 20C880 31.0457 888.954 40 900 40H960V100C960 111.046 968.954 120 980 120C991.046 120 1000 111.046 1000 100V40Z"
      fill="url(#paint2_linear)"
      fillOpacity="0.2"
    />
    <path
      d="M995 40C995 20.67 979.33 5 960 5H900C891.716 5 885 11.7157 885 20C885 28.2843 891.716 35 900 35H960C962.209 35 964 36.7909 964 39V100C964 108.284 970.716 115 979 115C987.284 115 994 108.284 994 100V40C994 39.6667 994.033 39.3333 994.1 39C994.567 38.3333 995 37.6667 995 37V40Z"
      stroke="url(#paint3_linear)"
      strokeOpacity="0.5"
    />

    {/* Bottom Left Corner */}
    <path
      d="M0 560C0 582.091 17.9086 600 40 600H100C111.046 600 120 591.046 120 580C120 568.954 111.046 560 100 560H40V500C40 488.954 31.0457 480 20 480C8.95431 480 0 488.954 0 500V560Z"
      fill="url(#paint4_linear)"
      fillOpacity="0.2"
    />
    <path
      d="M5 560C5 579.33 20.67 595 40 595H100C108.284 595 115 588.284 115 580C115 571.716 108.284 565 100 565H40C37.7909 565 36 563.209 36 561V500C36 491.716 29.2843 485 21 485C12.7157 485 6 491.716 6 500V560C6 560.333 5.96667 560.667 5.9 561C5.43333 561.667 5 562.333 5 563V560Z"
      stroke="url(#paint5_linear)"
      strokeOpacity="0.5"
    />

    {/* Bottom Right Corner */}
    <path
      d="M1000 560C1000 582.091 982.091 600 960 600H900C888.954 600 880 591.046 880 580C880 568.954 888.954 560 900 560H960V500C960 488.954 968.954 480 980 480C991.046 480 1000 488.954 1000 500V560Z"
      fill="url(#paint6_linear)"
      fillOpacity="0.2"
    />
    <path
      d="M995 560C995 579.33 979.33 595 960 595H900C891.716 595 885 588.284 885 580C885 571.716 891.716 565 900 565H960C962.209 565 964 563.209 964 561V500C964 491.716 970.716 485 979 485C987.284 485 994 491.716 994 500V560C994 560.333 994.033 560.667 994.1 561C994.567 561.667 995 562.333 995 563V560Z"
      stroke="url(#paint7_linear)"
      strokeOpacity="0.5"
    />

    {/* Horizontal Decorative Lines */}
    <path d="M150 20H400" stroke="url(#paint8_linear)" strokeWidth="2" strokeDasharray="6 4" />
    <path d="M600 20H850" stroke="url(#paint9_linear)" strokeWidth="2" strokeDasharray="6 4" />
    <path d="M150 580H400" stroke="url(#paint10_linear)" strokeWidth="2" strokeDasharray="6 4" />
    <path d="M600 580H850" stroke="url(#paint11_linear)" strokeWidth="2" strokeDasharray="6 4" />

    {/* Vertical Decorative Lines */}
    <path d="M20 150V250" stroke="url(#paint12_linear)" strokeWidth="2" strokeDasharray="6 4" />
    <path d="M20 350V450" stroke="url(#paint13_linear)" strokeWidth="2" strokeDasharray="6 4" />
    <path d="M980 150V250" stroke="url(#paint14_linear)" strokeWidth="2" strokeDasharray="6 4" />
    <path d="M980 350V450" stroke="url(#paint15_linear)" strokeWidth="2" strokeDasharray="6 4" />

    {/* Center Decorative Element */}
    <circle cx="500" cy="300" r="80" fill="url(#paint16_radial)" fillOpacity="0.1" />
    <circle cx="500" cy="300" r="60" stroke="url(#paint17_linear)" strokeOpacity="0.3" strokeWidth="1" />
    <circle cx="500" cy="300" r="40" stroke="url(#paint18_linear)" strokeOpacity="0.5" strokeWidth="1" />

    {/* Decorative Motifs */}
    <path
      d="M500 240C500 240 520 260 540 260C560 260 580 240 580 240C580 240 560 220 560 200C560 180 580 160 580 160C580 160 560 160 540 160C520 160 500 180 500 180C500 180 480 160 460 160C440 160 420 160 420 160C420 160 440 180 440 200C440 220 420 240 420 240C420 240 440 260 460 260C480 260 500 240 500 240Z"
      fill="url(#paint19_radial)"
      fillOpacity="0.2"
    />

    {/* Gradients */}
    <defs>
      <linearGradient id="paint0_linear" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint1_linear" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint2_linear" x1="1000" y1="0" x2="880" y2="120" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint3_linear" x1="1000" y1="0" x2="880" y2="120" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint4_linear" x1="0" y1="600" x2="120" y2="480" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint5_linear" x1="0" y1="600" x2="120" y2="480" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint6_linear" x1="1000" y1="600" x2="880" y2="480" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint7_linear" x1="1000" y1="600" x2="880" y2="480" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint8_linear" x1="150" y1="20" x2="400" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint9_linear" x1="600" y1="20" x2="850" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint10_linear" x1="150" y1="580" x2="400" y2="580" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint11_linear" x1="600" y1="580" x2="850" y2="580" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint12_linear" x1="20" y1="150" x2="20" y2="250" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint13_linear" x1="20" y1="350" x2="20" y2="450" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint14_linear" x1="980" y1="150" x2="980" y2="250" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint15_linear" x1="980" y1="350" x2="980" y2="450" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <radialGradient
        id="paint16_radial"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(500 300) rotate(90) scale(80)"
      >
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="paint17_linear" x1="440" y1="240" x2="560" y2="360" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint18_linear" x1="460" y1="260" x2="540" y2="340" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <radialGradient
        id="paint19_radial"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(500 210) rotate(90) scale(80)"
      >
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
)

const ContactCardDecoration = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 300 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Corner Decorations */}
    <path
      d="M0 8C0 3.58172 3.58172 0 8 0H20C22.2091 0 24 1.79086 24 4C24 6.20914 22.2091 8 20 8H8V20C8 22.2091 6.20914 24 4 24C1.79086 24 0 22.2091 0 20V8Z"
      fill="url(#card_paint0_linear)"
      fillOpacity="0.2"
    />
    <path
      d="M300 8C300 3.58172 296.418 0 292 0H280C277.791 0 276 1.79086 276 4C276 6.20914 277.791 8 280 8H292V20C292 22.2091 293.791 24 296 24C298.209 24 300 22.2091 300 20V8Z"
      fill="url(#card_paint1_linear)"
      fillOpacity="0.2"
    />
    <path
      d="M0 192C0 196.418 3.58172 200 8 200H20C22.2091 200 24 198.209 24 196C24 193.791 22.2091 192 20 192H8V180C8 177.791 6.20914 176 4 176C1.79086 176 0 177.791 0 180V192Z"
      fill="url(#card_paint2_linear)"
      fillOpacity="0.2"
    />
    <path
      d="M300 192C300 196.418 296.418 200 292 200H280C277.791 200 276 198.209 276 196C276 193.791 277.791 192 280 192H292V180C292 177.791 293.791 176 296 176C298.209 176 300 177.791 300 180V192Z"
      fill="url(#card_paint3_linear)"
      fillOpacity="0.2"
    />

    {/* Decorative Lines */}
    <path d="M30 4H120" stroke="url(#card_paint4_linear)" strokeWidth="1" strokeDasharray="4 2" />
    <path d="M180 4H270" stroke="url(#card_paint5_linear)" strokeWidth="1" strokeDasharray="4 2" />
    <path d="M30 196H120" stroke="url(#card_paint6_linear)" strokeWidth="1" strokeDasharray="4 2" />
    <path d="M180 196H270" stroke="url(#card_paint7_linear)" strokeWidth="1" strokeDasharray="4 2" />
    <path d="M4 30V80" stroke="url(#card_paint8_linear)" strokeWidth="1" strokeDasharray="4 2" />
    <path d="M4 120V170" stroke="url(#card_paint9_linear)" strokeWidth="1" strokeDasharray="4 2" />
    <path d="M296 30V80" stroke="url(#card_paint10_linear)" strokeWidth="1" strokeDasharray="4 2" />
    <path d="M296 120V170" stroke="url(#card_paint11_linear)" strokeWidth="1" strokeDasharray="4 2" />

    <defs>
      <linearGradient id="card_paint0_linear" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="card_paint1_linear" x1="300" y1="0" x2="276" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="card_paint2_linear" x1="0" y1="200" x2="24" y2="176" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="card_paint3_linear" x1="300" y1="200" x2="276" y2="176" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="card_paint4_linear" x1="30" y1="4" x2="120" y2="4" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="card_paint5_linear" x1="180" y1="4" x2="270" y2="4" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="card_paint6_linear" x1="30" y1="196" x2="120" y2="196" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="card_paint7_linear" x1="180" y1="196" x2="270" y2="196" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="card_paint8_linear" x1="4" y1="30" x2="4" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="card_paint9_linear" x1="4" y1="120" x2="4" y2="170" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="card_paint10_linear" x1="296" y1="30" x2="296" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="card_paint11_linear" x1="296" y1="120" x2="296" y2="170" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
)

const FormSectionDecoration = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 600 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Corner Decorations */}
    <path
      d="M0 20C0 8.95431 8.95431 0 20 0H50C55.5228 0 60 4.47715 60 10C60 15.5228 55.5228 20 50 20H20V50C20 55.5228 15.5228 60 10 60C4.47715 60 0 55.5228 0 50V20Z"
      fill="url(#form_paint0_linear)"
      fillOpacity="0.2"
    />
    <path
      d="M600 20C600 8.95431 591.046 0 580 0H550C544.477 0 540 4.47715 540 10C540 15.5228 544.477 20 550 20H580V50C580 55.5228 584.477 60 590 60C595.523 60 600 55.5228 600 50V20Z"
      fill="url(#form_paint1_linear)"
      fillOpacity="0.2"
    />
    <path
      d="M0 480C0 491.046 8.95431 500 20 500H50C55.5228 500 60 495.523 60 490C60 484.477 55.5228 480 50 480H20V450C20 444.477 15.5228 440 10 440C4.47715 440 0 444.477 0 450V480Z"
      fill="url(#form_paint2_linear)"
      fillOpacity="0.2"
    />
    <path
      d="M600 480C600 491.046 591.046 500 580 500H550C544.477 500 540 495.523 540 490C540 484.477 544.477 480 550 480H580V450C580 444.477 584.477 440 590 440C595.523 440 600 444.477 600 450V480Z"
      fill="url(#form_paint3_linear)"
      fillOpacity="0.2"
    />

    {/* Decorative Patterns */}
    <path
      d="M300 40C300 40 320 60 340 60C360 60 380 40 380 40C380 40 360 20 360 0"
      stroke="url(#form_paint4_linear)"
      strokeOpacity="0.3"
      strokeWidth="1"
    />
    <path
      d="M300 460C300 460 320 440 340 440C360 440 380 460 380 460C380 460 360 480 360 500"
      stroke="url(#form_paint5_linear)"
      strokeOpacity="0.3"
      strokeWidth="1"
    />
    <path
      d="M40 250C40 250 60 270 60 290C60 310 40 330 40 330C40 330 20 310 0 310"
      stroke="url(#form_paint6_linear)"
      strokeOpacity="0.3"
      strokeWidth="1"
    />
    <path
      d="M560 250C560 250 540 270 540 290C540 310 560 330 560 330C560 330 580 310 600 310"
      stroke="url(#form_paint7_linear)"
      strokeOpacity="0.3"
      strokeWidth="1"
    />

    {/* Decorative Lines */}
    <path d="M80 10H250" stroke="url(#form_paint8_linear)" strokeWidth="1" strokeDasharray="6 4" />
    <path d="M350 10H520" stroke="url(#form_paint9_linear)" strokeWidth="1" strokeDasharray="6 4" />
    <path d="M80 490H250" stroke="url(#form_paint10_linear)" strokeWidth="1" strokeDasharray="6 4" />
    <path d="M350 490H520" stroke="url(#form_paint11_linear)" strokeWidth="1" strokeDasharray="6 4" />
    <path d="M10 80V200" stroke="url(#form_paint12_linear)" strokeWidth="1" strokeDasharray="6 4" />
    <path d="M10 300V420" stroke="url(#form_paint13_linear)" strokeWidth="1" strokeDasharray="6 4" />
    <path d="M590 80V200" stroke="url(#form_paint14_linear)" strokeWidth="1" strokeDasharray="6 4" />
    <path d="M590 300V420" stroke="url(#form_paint15_linear)" strokeWidth="1" strokeDasharray="6 4" />

    {/* Decorative Motifs */}
    <path d="M300 100L310 120H290L300 100Z" fill="url(#form_paint16_linear)" fillOpacity="0.3" />
    <path d="M300 400L310 380H290L300 400Z" fill="url(#form_paint17_linear)" fillOpacity="0.3" />
    <path d="M100 250L120 260V240L100 250Z" fill="url(#form_paint18_linear)" fillOpacity="0.3" />
    <path d="M500 250L480 260V240L500 250Z" fill="url(#form_paint19_linear)" fillOpacity="0.3" />

    <defs>
      <linearGradient id="form_paint0_linear" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint1_linear" x1="600" y1="0" x2="540" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint2_linear" x1="0" y1="500" x2="60" y2="440" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint3_linear" x1="600" y1="500" x2="540" y2="440" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint4_linear" x1="300" y1="40" x2="380" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint5_linear" x1="300" y1="460" x2="380" y2="460" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint6_linear" x1="40" y1="250" x2="40" y2="330" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint7_linear" x1="560" y1="250" x2="560" y2="330" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint8_linear" x1="80" y1="10" x2="250" y2="10" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint9_linear" x1="350" y1="10" x2="520" y2="10" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint10_linear" x1="80" y1="490" x2="250" y2="490" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint11_linear" x1="350" y1="490" x2="520" y2="490" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint12_linear" x1="10" y1="80" x2="10" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint13_linear" x1="10" y1="300" x2="10" y2="420" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint14_linear" x1="590" y1="80" x2="590" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint15_linear" x1="590" y1="300" x2="590" y2="420" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="0.5" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint16_linear" x1="300" y1="100" x2="300" y2="120" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint17_linear" x1="300" y1="400" x2="300" y2="380" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint18_linear" x1="100" y1="250" x2="120" y2="250" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="form_paint19_linear" x1="500" y1="250" x2="480" y2="250" gradientUnits="userSpaceOnUse">
        <stop stopColor="#D4AF37" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
)

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="pt-24 pb-16 bg-cream/10 relative overflow-hidden">
      {/* Main Background Decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRDRBRjM3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMS4wNDYgMC0xLjk5My0uNTk1LTIuNDU3LTEuNTQ0LS40NjMtLjk0OS0uMzg0LTIuMDc2LjIwNS0yLjk0NmwzLjEyNS00LjY4OGMuNTg5LS44NyAxLjU3LTEuMzk1IDIuNjI3LTEuMzk1czIuMDM4LjUyNSAyLjYyNyAxLjM5NWwzLjEyNSA0LjY4OGMuNTg5Ljg3LjY2OCAyLjAwMi4yMDUgMi45NDYtLjQ2My45NDktMS40MTEgMS41NDQtMi40NTcgMS41NDRIMzZ6Ii8+PHBhdGggZD0iTTI0IDQyYy0xLjA0NiAwLTEuOTkzLS41OTUtMi40NTctMS41NDQtLjQ2My0uOTQ5LS4zODQtMi4wNzYuMjA1LTIuOTQ2bDMuMTI1LTQuNjg4Yy41ODktLjg3IDEuNTctMS4zOTUgMi42MjctMS4zOTVzMi4wMzguNTI1IDIuNjI3IDEuMzk1bDMuMTI1IDQuNjg4Yy41ODkuODcuNjY4IDIuMDAyLjIwNSAyLjk0Ni0uNDYzLjk0OS0xLjQxMSAxLjU0NC0yLjQ1NyAxLjU0NEgyNHoiLz48L2c+PC9zdmc+')]"></div>
      </div>

      <PageHeader title="Contact Us" description="We'd love to hear from you. Get in touch with us." />

      <div className="container mx-auto px-4">
        {/* Contact Information */}
        <section className="mb-16 relative">
          <div className="relative z-10 grid md:grid-cols-4 gap-6">
            <ContactCard
              icon={<Phone className="h-6 w-6 text-gold" />}
              title="Call Us"
              details={["+91 9876 543 210", "+91 9876 543 211"]}
            />
            <ContactCard
              icon={<Mail className="h-6 w-6 text-gold" />}
              title="Email Us"
              details={["info@rameshsweets.co.in", "orders@rameshsweets.co.in"]}
            />
            <ContactCard
              icon={<MapPin className="h-6 w-6 text-gold" />}
              title="Visit Us"
              details={["Shop Number 25, Main Bazar Bharat Chowk,Ulhasnagar 1,", "Sidhi Vinayak Nagar,Ulhasnagar, Maharashtra 421001"]}
            />
            <ContactCard
              icon={<Clock className="h-6 w-6 text-gold" />}
              title="Opening Hours"
              details={["Mon - Sat: 9:00 AM - 11:00 PM"]}
            />
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="relative mb-16">
          <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-gold/10">
            <FormSectionDecoration />

            <div>
              <div className="relative mb-8">
                <SectionHeader
                  title="Send Us a Message"
                  description="Fill out the form below and we'll get back to you as soon as possible."
                  className="mb-6"
                />
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-gold to-transparent"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-display text-sm">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border-gold/20 focus:border-gold focus:ring-gold/30"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-display text-sm">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-gold/20 focus:border-gold focus:ring-gold/30"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-display text-sm">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-gold/20 focus:border-gold focus:ring-gold/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-display text-sm">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="border-gold/20 focus:border-gold focus:ring-gold/30"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-display text-sm">
                    Your Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="border-gold/20 focus:border-gold focus:ring-gold/30"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-gold hover:bg-gold-dark text-white relative overflow-hidden group"
                  disabled={isSubmitting}
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  {isSubmitting ? (
                    <>
                      <span className="relative">Sending...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative">Send Message</span>
                      <Send className="relative ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            <div>
              <div className="relative mb-8">
                <SectionHeader title="Our Location" description="Visit our main store in Kolkata" className="mb-6" />
                <div className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-gold to-transparent"></div>
              </div>

              <div className="rounded-lg overflow-hidden h-[400px] shadow-lg border border-gold/20 relative">
                <div className="absolute inset-0 pointer-events-none border border-gold/10 rounded-lg z-10"></div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.21689846735!2d88.26494987792967!3d22.535564900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277c3c0c093d1%3A0x85bf8bc90e55caa!2sRamesh%20Sweets!5e0!3m2!1sen!2sin!4v1647863121212!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Ramesh Sweets Location"
                ></iframe>
              </div>

              <div className="mt-4 p-4 bg-cream/30 rounded-lg border border-gold/10">
                <h4 className="font-display text-lg font-medium mb-2">Visit Our Store</h4>
                <p className="text-sm text-muted-foreground">
                  Experience the authentic taste of traditional Bengali sweets at our flagship store. Our store is
                  easily accessible by public transport and has ample parking space.
                </p>
              </div>
            </div>
          </div>

          {/* Main Heritage Border */}
          <HeritageBorder />
        </section>
      </div>
    </div>
  )
}

function ContactCard({ icon, title, details }) {
  return (
    <Card className="border-gold/10 hover:shadow-md transition-all duration-300 bg-white/80 backdrop-blur-sm overflow-hidden group relative">
      <ContactCardDecoration />
      <CardContent className=" text-center relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-4 relative z-10">
          <div className="absolute inset-0 rounded-full border border-gold/30"></div>
          <div className="absolute inset-1 rounded-full border border-gold/20"></div>
          {icon}
        </div>

        <h3 className="text-lg font-display font-semibold mb-2">{title}</h3>
        <div className="text-muted-foreground">
          {details.map((detail, index) => (
            <p key={index}>{detail}</p>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

