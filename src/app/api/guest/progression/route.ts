// @ts-nocheck

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
                } else if (team) {
                    data = getInitData(hunt);
                    if (!team.win_at) {
                        const current_hint_index = team.current_hint_index;
                        const hintsOrder = team.hints_order;
                        for (let i = 0; i <= current_hint_index; i++) {
                            data.stories.push(hunt.stories[i]);

                            const position = (i == 0) ? {} : hunt.markers[hintsOrder[i - 1]].position;
                            data.markers.push(position);

                            const hintOrder = hintsOrder[i];
                            const markerHint = (current_hint_index === hunt.markers.length - 1)
                                ? hunt.markers[0].hint
                                : hunt.markers[hintOrder].hint;
                            data.hintsRevealed.push(markerHint);
                        }
                    }


                    if (hunt.status === "started") {
                        // Chasse en cours
                        if (!team.win_at) {
                            progression = "hunting";
                        } else {
                            // Chasse gagnée
                            const startedAt = hunt.started_at;
                            if (!startedAt) {
                                throw new Error("La chasse au trésor a été commencée mais la date de début est manquante.");
                            }
                            progression = "win";
                            updateEndData(data, hunt, team as Team);
                        }
                    } else if (hunt.status === "ended") {
                        // Chasse perdue
                        progression = (team.win_at) ? "win" : "lose";
                        updateEndData(data, hunt, team as Team);
                    }
                }
            }
        }

        return NextResponse.json({ progression, data }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Échec de la recherche de la chasse au trésor." },
            { status: 500 }
        );
    }
}

function updateEndData(data: any, hunt: Hunt, team: Team) {
    const startedAt = hunt.started_at;
    if (!startedAt) {
        throw new Error("La chasse au trésor a été commencée mais la date de début est manquante.");
    }

    data.treasurePosition = hunt.markers[0].position;
    data.team = team.guests.map((guest) => guest.name);
    const currentDate = new Date();
    data.teamTime = currentDate.getTime() - startedAt.getTime();
}

function getInitData(hunt: Hunt): HuntInit {
    const teams: string[][] = hunt.teams.map((team) => team.guests.map((guest) => guest.name));

    return {
        id: hunt._id as string,
        name: hunt.name,
        teams,
        stories: [],
        markers: [],
        hintsRevealed: [],
        maxGuests: hunt.max_guests,
        map: hunt.map,
    };
}