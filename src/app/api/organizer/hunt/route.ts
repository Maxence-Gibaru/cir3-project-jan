// @ts-nocheck


import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

    try {
        await dbConnect();
        // Get from URl search
        const urlSearch = new URLSearchParams(req.nextUrl.search);
        const huntId = urlSearch.get("huntId");
        if (!huntId) {
            const hunts = await HuntModel.find({ organizer_id: session.user.id });
            return NextResponse.json(hunts, { status: 200 });
        } else {
            const hunt = await HuntModel.findOne({_id: huntId, organizer_id: session.user.id});
            if (!hunt) {
                return NextResponse.json(
                    { error: "Aucune chasse au trésor trouvée avec cet identifiant." },
                    { status: 404 }
                );
            }
            return NextResponse.json(hunt, { status: 200 });
        }

        
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Erreur lors de la recherche des chasses au trésor." },
            { status: 500 }
        );
    }
}
