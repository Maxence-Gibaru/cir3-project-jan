import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.next({ status: 401 });

    try {
        await dbConnect();
        const hunts = await HuntModel.find({ status: "opened" });
        return NextResponse.json(hunts, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to get hunts" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.next({ status: 401 });

    try {
        await dbConnect();
        const { code } = await req.json();

        console.log('Code reçu :', code);
        const targetHunt = await HuntModel.findOne({ code, status: "opened" });
        console.log('Chasse trouvée :', targetHunt);


        if (!targetHunt) {
            return NextResponse.json(
                { error: "Aucune chasse au trésor trouvée avec ce code." },
                { status: 404 }
            );
        }

        return NextResponse.json({ hunt: targetHunt }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Échec de la recherche de la chasse au trésor." },
            { status: 500 }
        );
    }
}
