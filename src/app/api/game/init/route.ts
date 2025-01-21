import { HuntIntro } from "@/definitions";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { Hunt, HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getparsedBody } from "../../utils";

const ReqZodSchema = z.object({
    hunt_id: z.string(),
    team_index: z.number(),
});

export async function POST(req: NextRequest) {
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

        const hunt: Hunt | null = await HuntModel.findById(result.hunt_id);
        if (!hunt) {
            return NextResponse.json(
                { error: "Hunt not found" },
                { status: 404 }
            );
        }

        const team = hunt.teams[result.team_index];
        if (!team) {
            return NextResponse.json(
                { error: "Team not found" },
                { status: 404 }
            );
        }

        const text: string = hunt.stories[0];
        const selected_hint: number = team.hints_order[0];
        const hint: string = hunt.markers[selected_hint].hint;

        const huntIntro: HuntIntro = {
            text, // Introduction de la story
            hint, // Indice du lieu qu'on cherche
            map: hunt.map,
        };

        return NextResponse.json(huntIntro, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create hunt" },
            { status: 500 }
        );
    }
}
