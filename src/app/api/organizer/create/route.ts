import { getparsedBody } from "@/app/api/utils";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { Hunt, HuntModel, HuntZodSchema } from "@/models/Hunt";
import { TeamModel } from "@/models/Team";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.next({ status: 401 });

    try {
        await dbConnect();
        const body = await req.json();
        body.organizer_id = session.user.id;
        body.code = Math.random().toString(36).substring(7).toUpperCase();
        const result = getparsedBody(HuntZodSchema, body);
        if (typeof result === "string") {
            return NextResponse.json(
                { error: "Failed to parse body", details: result },
                { status: 400 }
            );
        }

        result.teams = Array.from({ length: 5 }, () => new TeamModel().toObject());

        const newHunt: Hunt = await HuntModel.create(result);
        return NextResponse.json(newHunt, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create hunt" },
            { status: 500 }
        );
    }
}
