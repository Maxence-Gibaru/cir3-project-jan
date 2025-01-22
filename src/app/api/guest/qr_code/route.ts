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
        const qr_code = urlSearch.get("markers_count");
        if (!qr_code) {
            return NextResponse.json(
                { error: "Markers count missing" },
                { status: 400 }
            );
        }

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

        const attending_code = hunt.markers[team.hints_order[team.current_hint_index]].id;

        return NextResponse.json({isCorrect: attending_code === qr_code}, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to check qr code" },
            { status: 500 }
        );
    }
}
