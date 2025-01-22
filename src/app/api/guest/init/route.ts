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
            { error: "Failed to get init data from game" },
            { status: 500 }
        );
    }
}
