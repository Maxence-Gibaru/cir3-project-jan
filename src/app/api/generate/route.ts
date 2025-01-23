// app/api/generate/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse, NextRequest } from "next/server";


export async function GET() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Définir le prompt pour générer des pseudos aléatoires
        const prompt = "Génère un pseudonyme aléatoire. Je veux juste que tu me renvoies le pseudo sans rien ajouter.";

        // Appeler le modèle pour générer le contenu
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const output = await response.text();
        return NextResponse.json({ output });


    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}


export async function POST(req: NextRequest) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const body = await req.json();

    
    


        const result = await model.generateContent(body);
        const response = await result.response;
        const output = await response.text();

        
        


        return NextResponse.json({ output });
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}

