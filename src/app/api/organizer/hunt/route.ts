import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.next({ status: 401 });

    try {
        await dbConnect();
        const hunts = await HuntModel.find({ organizer_id: session.user.id });
        return NextResponse.json(hunts, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Erreur lors de la recherche des chasses au trésor." },
            { status: 500 }
        );
    }
}
