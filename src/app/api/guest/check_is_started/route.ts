import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.next({ status: 401 });

    try {
        await dbConnect();
        // Get from URl search
        const urlSearch = new URLSearchParams(req.nextUrl.search);
        const huntId = urlSearch.get("id");
        if (!huntId) {
            return NextResponse.json(
                { error: "Code de chasse au trésor manquant." },
                { status: 400 }
            );
        }

        const hunt = await HuntModel.findById(huntId);
        if (!hunt) {
            return NextResponse.json(
                { error: "Aucune chasse au trésor trouvée avec ce code." },
                { status: 404 }
            );
        }

        // Check if the user is in a team
        const guestId = session.user.id;
        const team = hunt.teams.find((team) => team.guests.find((guest) => guest.id === guestId));
        if (!team) {
            return NextResponse.json(
                { error: "Vous n'êtes pas dans une équipe." },
                { status: 400 }
            );
        }

        let firstHint: string | null = null;
        try {
            const selected_hint: number = team.hints_order[0];
            firstHint = hunt.markers[selected_hint].hint; // Indice du lieu qu'on cherche
        }
        catch (error) {
            console.error(error);
        }
        const isStarted = hunt.status === "started";

        return NextResponse.json({ isStarted, firstHint }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Échec de la recherche de la chasse au trésor." },
            { status: 500 }
        );
    }
}
