import { HuntMarker } from "@/definitions";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { Hunt, HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.next({ status: 401 });

    try {
        await dbConnect();
        // Get from URl search
        const urlSearch = new URLSearchParams(req.nextUrl.search);
        const markersCountStr = urlSearch.get("markersCount");
        if (!markersCountStr) {
            return NextResponse.json(
                { error: "Markers count missing" },
                { status: 400 }
            );
        }

        const markersCount = parseInt(markersCountStr);

        const huntId = session.user.huntId;
        const teamIndex = session.user.teamIndex;

        const hunt: Hunt | null = await HuntModel.findById(huntId);
        if (!hunt) {
            return NextResponse.json(
                { error: "Hunt not found" },
                { status: 404 }
            );
        }

        const team = hunt.teams[teamIndex];
        if (!team) {
            return NextResponse.json(
                { error: "Team not found" },
                { status: 404 }
            );
        }

        // Si aucun nouvel indice n'a été trouvé
        if (team.current_hint_index < markersCount) {
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
        for (let i = markersCount; i <= team.current_hint_index; i++) {
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
