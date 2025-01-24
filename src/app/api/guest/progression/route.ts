import { HuntInit } from "@/definitions";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { Hunt, HuntModel } from "@/models/Hunt";
import { Team } from "@/models/Team";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.next({ status: 401 });

    try {
        await dbConnect();
        // Get from URl search
        const urlSearch = new URLSearchParams(req.nextUrl.search);
        const lobbyCode = urlSearch.get("lobby_code");

        let progression = "not_started";
        let data: any = {};
        if (lobbyCode) {
            const hunt: Hunt | null = await HuntModel.findOne({ code: lobbyCode, status: { $ne: "closed" } });
            if (hunt) {
                // Check if the user is in a team
                const guestId = session.user.id;
                const team = hunt.teams.find((team) => team.guests.find((guest) => guest.id === guestId));

                if (hunt.status === "opened") {
                    if (!team) {
                        // Page de lobby
                        progression = "selection";
                    } else {
                        // Page d'attente de la formation des equipe
                        progression = "waiting";
                    }
                    data = getInitData(hunt);
                } else if (hunt.status === "started" && team) {
                    // Chasse en cours
                    if (!team.win_at) {
                        progression = "hunting";
                        data = getHuntingData(hunt, team as Team);
                    } else {
                        // Chasse gagnée
                        progression = "win";
                        data = getInitData(hunt);
                        data.position = hunt.markers[0].position
                        data.win_at = team.win_at;
                    }
                } else if (hunt.status === "ended" && team) {
                    // Chasse perdue
                    progression = "lose";
                    data = getInitData(hunt);
                    data.position = hunt.markers[0].position
                }
            }
        }

        console.log("data : ", data);

        return NextResponse.json({ progression, data }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Échec de la recherche de la chasse au trésor." },
            { status: 500 }
        );
    }
}
function getInitData(hunt: Hunt): HuntInit {
    const teams: string[][] = hunt.teams.map((team) => team.guests.map((guest) => guest.name));

    return {
        id: hunt._id as string,
        name: hunt.name,
        teams,
        introduction_story: hunt.stories[0],
        max_guests: hunt.max_guests,
        max_teams: hunt.max_teams,
        map: hunt.map,
    };
}

function getHuntingData(hunt: Hunt, team: Team) {
    const data: any = getInitData(hunt);
    data.first_hint = hunt.markers[0].hint;

    const markers = [];
    const current_hint_index = team.current_hint_index;
    for (let i = 0; i <= current_hint_index; i++) {
        const marker = hunt.markers[team.hints_order[i]];
        console.log("marker :", team)
        const position = marker.position;
        const hint = (current_hint_index === hunt.markers.length - 1)
            ? hunt.markers[0].hint
            : hunt.markers[team.hints_order[i + 1]].hint;

        markers.push({
            position,
            hint,
            story: hunt.stories[i + 1] // Décalé d'un car il y a l'intro
        });
    }

    data.markers = markers;
    return data;
}