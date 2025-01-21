import { HuntMarker } from "@/definitions";
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
    markers_count: z.number(),
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

        // Si aucun nouvel indice n'a été trouvé
        if (team.current_hint_index < result.markers_count)
            return NextResponse.json([], { status: 200 });

        let huntAddedMarkers: HuntMarker[] = [];
        for (let i = result.markers_count; i <= team.current_hint_index; i++) {
            const marker = hunt.markers[team.hints_order[i]];
            huntAddedMarkers.push({ 
                position: marker.position,
                hint: marker.hint,
                story: hunt.stories[i + 1] // Décalé d'un car il y a l'intro
            });
        }

        return NextResponse.json(huntAddedMarkers, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create hunt" },
            { status: 500 }
        );
    }
}
