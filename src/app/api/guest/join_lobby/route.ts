import { HuntInit } from "@/definitions";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Get init data
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.next({ status: 401 });

    try {
        await dbConnect();
        // Get from URl search
        const urlSearch = new URLSearchParams(req.nextUrl.search);
        const lobbyCodeStr = urlSearch.get("lobby_code");
        if (!lobbyCodeStr) {
            return NextResponse.json(
                { error: "Code de chasse au trésor manquant." },
                { status: 400 }
            );
        }

        // Status multiple "opened" ou "started" mais pas "closed"
        const hunt = await HuntModel.findOne({ code: lobbyCodeStr, status: { $ne: "closed" } });
        if (!hunt) {
            return NextResponse.json(
                { error: "Aucune chasse au trésor trouvée avec ce code." },
                { status: 404 }
            );
        }

        const teams: string[][] = hunt.teams.map((team) => team.guests.map((guest) => guest.name));

        const huntInit: HuntInit = {
            id: hunt._id,
            name: hunt.name,
            teams,
            introduction_story: hunt.stories[0],
            max_guests: hunt.max_guests,
            max_teams: hunt.max_teams,
            map: hunt.map,
        };

        return NextResponse.json({ huntInit }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Échec de la recherche de la chasse au trésor." },
            { status: 500 }
        );
    }
}