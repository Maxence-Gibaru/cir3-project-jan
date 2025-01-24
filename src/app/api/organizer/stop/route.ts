// @ts-nocheck

import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getparsedBody } from "../../utils";

const ReqZodSchema = z.object({
    huntId: z.string(),
});

export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

    try {
        await dbConnect();
        const body = await req.json();
        const result = getparsedBody(ReqZodSchema, body);
        if (typeof result === "string") {
            return NextResponse.json(
                { error: "Failed to parse body", details: result },
                { status: 400 }
            );
        }

        const closed_at = new Date();

        const guestId = session.user.id;
        const hunt = await HuntModel.findOneAndUpdate({ _id: result.huntId, organizer_id: guestId, status: 'started' }, {
            status: "ended",
            closed_at
        });
        if (!hunt) {
            return NextResponse.json(
                { error: "Aucune chasse au trésor trouvée avec cet identifiant." },
                { status: 404 }
            );
        }
        hunt.status = "ended";

        return NextResponse.json({ hunt }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Echec lors de l'actualisation du status"},
            { status: 500 }
        );
    }
}
