import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {
    try {
        return new Response(JSON.stringify({ message: "sexe" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });


    } catch (error) {
        console.error('Erreur dans la récupération des données en bdd :', error);
        return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des données' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}



//POST pour valider le qr code
export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log(body);
    if (body.résultat == "1234") {
        return NextResponse.json(true);
    }
    else {
        return NextResponse.json(false);
    }
}