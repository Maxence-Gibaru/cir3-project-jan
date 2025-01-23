import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getparsedBody } from "../../utils";

const ReqZodSchema = z.object({
    huntId: z.string(),
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
        
        const huntId = result.huntId;
        const teamIndex = result.teamIndex;       

        const hunt = await HuntModel.findById(huntId);
        if (!hunt) {
            return NextResponse.json(
                { error: "Aucune chasse au trésor trouvée avec ce code." },
                { status: 404 }
            );
        }

        const guestId = session.user.id;
        const findIfExists = hunt.teams.find((team) => team.guests.find((guest) => guest.id === guestId));
        if (findIfExists) {
            return NextResponse.json(
                { error: "Vous avez déjà rejoint une équipe." },
                { status: 400 }
            );
        }

        const newGuest = {
            id: guestId,
            name: session.user.name,
        };
        if (hunt.teams[teamIndex].guests.length >= hunt.max_guests) {
            return NextResponse.json(
                { error: "Équipe pleine." },
                { status: 400 }
            );
        }
        hunt.teams[teamIndex].guests.push(newGuest);

        await HuntModel.findOneAndUpdate({ _id: huntId, status: "opened" }, {
            ...hunt,
        });


        return NextResponse.json({ isValid: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Échec de la recherche de la chasse au trésor." },
            { status: 500 }
        );
    }
}
