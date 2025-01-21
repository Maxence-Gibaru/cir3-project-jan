import { HuntMarker } from "@/definitions";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { Hunt, HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getparsedBody } from "../../utils";

const ReqZodSchema = z.object({
    markers_count: z.number(),
});

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.isGuest) return NextResponse.next({ status: 401 });

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

        const hunt_id = session.user.hunt_id;
        const team_index = session.user.team_index;

        const hunt: Hunt | null = await HuntModel.findById(hunt_id);
        if (!hunt) {
            return NextResponse.json(
                { error: "Hunt not found" },
                { status: 404 }
            );
        }

        const team = hunt.teams[team_index];
        if (!team) {
            return NextResponse.json(
                { error: "Team not found" },
                { status: 404 }
            );
        }

        // Si aucun nouvel indice n'a été trouvé
        if (team.current_hint_index < result.markers_count) {
            return NextResponse.json([], { status: 200 });
        }

        // Si c'est une victoire
        if (team.current_hint_index === hunt.markers.length) {
            if (!hunt.started_at || !team.win_at) return NextResponse.json(
                { error: "Hunt not started or team not win" },
                { status: 400 }
            );
            return NextResponse.json(
                {
                    team_time: hunt.started_at.getTime() - team.win_at.getTime(),
                    position: hunt.markers[0].position,
                },
                { status: 200 }
            );
        }

        let huntAddedMarkers: HuntMarker[] = [];
        for (let i = result.markers_count; i <= team.current_hint_index; i++) {
            const position = hunt.markers[team.hints_order[i]].position;
            const hint = (team.current_hint_index === hunt.markers.length - 1)
            ? hunt.markers[0].hint
            : hunt.markers[team.hints_order[i + 1]].hint;
            
            huntAddedMarkers.push({ 
                position,
                hint,
                story: hunt.stories[i + 1] // Décalé d'un car il y a l'intro
            });
        }

        return NextResponse.json(huntAddedMarkers, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to get markers" },
            { status: 500 }
        );
    }
}
