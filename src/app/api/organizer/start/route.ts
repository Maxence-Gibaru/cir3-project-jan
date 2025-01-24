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

        // Get hunt by Id and check if status is opened
        const guestId = session.user.id;
        const hunt = await HuntModel.findOne({ _id: result.huntId, organizer_id: guestId, status: 'opened' });
        if (!hunt) {
            return NextResponse.json(
                { error: "Aucune chasse au trésor trouvée avec cet identifiant." },
                { status: 404 }
            );
        }

        // Count for each team if team.guest is different empty
        const teamWithMember = hunt.teams.filter(team => team.guests.length > 0);
        if (teamWithMember.length < 2) {
            return NextResponse.json(
                { error: "Il doit y avoir au moins deux équipes avec des membres pour démarrer la chasse au trésor." },
                { status: 400 }
            );
        }

        // For each team update hints_order
        hunt.teams.forEach((team, index) => {
            const hints_order = Array.from({ length: hunt.markers.length - 1}, (_, i) => i + 1);
            /* team.hints_order = */
            console.log("team", team)
            // Passe de [0, 1, 2] à [1, 2, 0] si index = 1
            for (let i = 0; i < index; i++) {
                const first = hints_order.shift();
                if (first === undefined) {
                    console.error("Erreur lors de la mise à jour de l'ordre des indices pour l'équipe.");
                    return;
                }
                hints_order.push(first);

            }
            team.hints_order = hints_order;
        });

        hunt.status = "started";
        hunt.started_at = new Date();

        // Find by id and update the started_at property and status at started
        const newHunt = await HuntModel.findByIdAndUpdate(result.huntId, hunt);


        return NextResponse.json({ hunt: newHunt }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Echec lors de l'actualisation du status" },
            { status: 500 }
        );
    }
}
