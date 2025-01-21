import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getParsedType } from "zod";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.next({ status: 401 });

    try {
        await dbConnect();
        const { code, teamIndex, guestId } = await req.json();



        console.log('Code reçu :', code);
        const targetHunt = await HuntModel.findOne({ code, status: "opened" });
        console.log('Chasse trouvée :', targetHunt);



        if (!targetHunt) {
            return NextResponse.json(
                { error: "Aucune chasse au trésor trouvée avec ce code." },
                { status: 404 }
            );
        }

        const newGuest = {
            id: guestId,
            name: `Guest-${guestId}` // 🔹 Ajout d'un nom par défaut
        };
        targetHunt.teams[teamIndex].guests.push(newGuest);

        await HuntModel.findOneAndUpdate({ code, status: "opened" }, {
            ...targetHunt,
            /* teams:  */
        });

        // targetHunt.markModified("teams");

        /* await targetHunt.save(); */

        return NextResponse.json({ hunt: targetHunt }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Échec de la recherche de la chasse au trésor." },
            { status: 500 }
        );
    }
}
