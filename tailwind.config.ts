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
        primary: "#0077b6",       // Couleur principale : Bleu vibrant
        secondary: "#00b4d8",     // Couleur secondaire : Aqua vif
        accent: "#90e0ef",        // Couleur d'accentuation : Bleu ciel doux
        background: "#caf0f8",    // Couleur de fond : Bleu pâle
        dark: "#03045e",          // Couleur sombre : Bleu marine très profond
        sand: "#e1c881",          // Couleur sable
        blue: "#a6fffe",          // Couleur bleu ciel
        grey: "#e0deda",          // Couleur gris clair
        oceanBlue:"#0066cc", // Bleu Ocean
        greyBg: "#F2EFE7",
        lightBlueBg: "#9ACBD0",
        blueBg: "#48A6A7",
        blueHoverBg: "#389697",
        darkBlueHoverBg: "#1963A2",
        darkBlueBg:"#2973B2"
      },



    },
  },
  
  plugins: [tailwindScrollbarHide],
} satisfies Config;


