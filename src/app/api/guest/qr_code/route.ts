// @ts-nocheck


import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { Hunt, HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

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
        const teamIndex = hunt.teams.findIndex((team) => team.guests.find((guest) => guest.id === guestId));
        const team = hunt.teams[teamIndex];
        if (!team) {
            return NextResponse.json(
                { error: "Team not found" },
                { status: 404 }
            );
        }

        const currentHintIndex = team.current_hint_index;
        const isTreasureAttending = currentHintIndex === hunt.markers.length - 1;
        const attendingCode = isTreasureAttending
        ? hunt.markers[0].id
        : hunt.markers[team.hints_order[currentHintIndex]].id;

        const isCorrect = attendingCode === qrCode;
        if (isCorrect) {
            const teams = hunt.teams;
            ++teams[teamIndex].current_hint_index;
            if (isTreasureAttending) {
                teams[teamIndex].win_at = new Date();
            }
            await HuntModel.findByIdAndUpdate(hunt._id, {
                teams
            });
        }
        
        return NextResponse.json({ isCorrect }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to check qr code" },
            { status: 500 }
        );
    }
}
