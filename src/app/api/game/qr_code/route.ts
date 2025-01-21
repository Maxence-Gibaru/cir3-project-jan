import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { Hunt, HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getparsedBody } from "../../utils";

const ReqZodSchema = z.object({
    code: z.string(),
});

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.isGuest) return NextResponse.next({ status: 401 });

    try {
        await dbConnect();
        const body = await req.json();
        const result = getparsedBody(ReqZodSchema, body);
        if (typeof result === "string") {
            return NextResponse.json(
                { error: "Failed to parse body", details: result },
                { status: 400 }
            );
        }

        const hunt_id = session.user.hunt_id;
        const team_index = session.user.team_index;

        const hunt: Hunt | null = await HuntModel.findById(hunt_id);
        if (!hunt) {
            return NextResponse.json(
                { error: "Hunt not found" },
                { status: 404 }
            );
        }

        const team = hunt.teams[team_index];
        if (!team) {
            return NextResponse.json(
                { error: "Team not found" },
                { status: 404 }
            );
        }

        const attending_code = hunt.markers[team.hints_order[team.current_hint_index]].id;

        return NextResponse.json({isCorrect: attending_code === result.code}, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to check qr code" },
            { status: 500 }
        );
    }
}
