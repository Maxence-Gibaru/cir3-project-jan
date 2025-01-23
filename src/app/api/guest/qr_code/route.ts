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
        const qrCode = urlSearch.get("qr_code");
        const lobbyCode = urlSearch.get("lobby_code");
        if (!qrCode) {
            return NextResponse.json(
                { error: "QR code is missing" },
                { status: 400 }
            );
        }
        if (!lobbyCode) {
            return NextResponse.json(
                { error: "Lobby code is missing" },
                { status: 400 }
            );
        }

        const hunt: Hunt | null = await HuntModel.findOne({ code: lobbyCode, status: "started" });
        if (!hunt) {
            return NextResponse.json(
                { error: "Hunt not found" },
                { status: 404 }
            );
        }

        const guestId = await session.user.id;
        const team = hunt.teams.find((team) => team.guests.find((guest) => guest.id === guestId));
        if (!team) {
            return NextResponse.json(
                { error: "Team not found" },
                { status: 404 }
            );
        }

        const attendingCode = hunt.markers[team.hints_order[team.current_hint_index]].id;
        return NextResponse.json({isCorrect: attendingCode === qrCode}, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to check qr code" },
            { status: 500 }
        );
    }
}
