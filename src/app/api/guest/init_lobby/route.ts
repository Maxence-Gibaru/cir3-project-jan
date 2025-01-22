import { HuntIntro } from "@/definitions";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { Hunt, HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.next({ status: 401 });

    try {
        await dbConnect();
        const huntId = session.user.huntId;
        const teamIndex = session.user.teamIndex;

        const hunt: Hunt | null = await HuntModel.findById(huntId);

        console.log("found hunt :", hunt);
        if (!hunt) {
            return NextResponse.json(
                { error: "Hunt not found" },
                { status: 404 }
            );
        }

        /* const team = hunt.teams[teamIndex];
        console.log("found team :", team);
        if (!team) {
            return NextResponse.json(
                { error: "Team not found" },
                { status: 404 }
            );
        } */

        /* const text: string = hunt.stories[0]; */
        /* const selected_hint: number = team.hints_order[0]; */
        /* const hint: string = hunt.markers[selected_hint].hint; */
        const name = hunt.name;
        const max_teams = hunt.max_teams;
        const max_guests = hunt.max_guests;
        const teams = hunt.teams;

        const huntLobby = {
            name: name,
            max_teams: max_teams,
            max_guests: max_guests,
            teams: teams

        };

        return NextResponse.json(huntLobby, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to get init data from game" },
            { status: 500 }
        );
    }
}
