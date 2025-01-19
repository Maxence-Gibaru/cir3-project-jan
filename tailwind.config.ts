import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/react";
import tailwindScrollbarHide from "tailwind-scrollbar-hide";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      animation: {
        zoom: "zoom 1s ease-out",
      },
      keyframes: {
        zoom: {
          "0%": {
            transform: "scale(1.5)", // Départ (agrandi)
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)", // Arrivée (taille normale)
            opacity: "1",
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        deepNavy: "#111938",       // Bleu marine très profond
        richPurple: "#442656",     // Violet riche et intense
        duskViolet: "#59477a",     // Violet doux avec une touche de gris
        vibrantPlum: "#6d3a8b",    // Prune vibrante et énergique
        royalPurple: "#6340a2",    // Violet royal avec une présence forte
        brightLavender: "#803db0", // Lavande éclatante et vive
        deepAmethyst: "#672185",   // Améthyste profond et saturé
        boldBlue: "#1f257d",       // Bleu audacieux et riche
        midnightBlue: "#181f5b",   // Bleu nuit profond et apaisant
        darkIndigo: "#161a32",     // Indigo foncé, presque noir
      },


    },
  },
  plugins: [tailwindScrollbarHide],
} satisfies Config;


