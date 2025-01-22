import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getparsedBody } from "../../utils";

const ReqZodSchema = z.object({
    teamIndex: z.number(),
});

// Join team members
export async function PUT(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.next({ status: 401 });

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
        const teamIndex = result.teamIndex;       

        const guestId = session.user.id;
        const huntId = session.user.huntId;
        const hunt = await HuntModel.findById(huntId);

        if (!hunt) {
            return NextResponse.json(
                { error: "Aucune chasse au trésor trouvée avec ce code." },
                { status: 404 }
            );
        }

        const newGuest = {
            id: guestId,
            name: `Guest-${guestId}`
        };
        hunt.teams[teamIndex].guests.push(newGuest);

        await HuntModel.findOneAndUpdate({ _id: huntId, status: "opened" }, {
            ...hunt,
        });


        return NextResponse.json({ hunt }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Échec de la recherche de la chasse au trésor." },
                { status: 500 }
            );
    }
}
