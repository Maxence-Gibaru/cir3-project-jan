// @ts-nocheck


import { getparsedBody } from "@/app/api/utils";
import { Marker } from "@/definitions";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { Hunt, HuntModel, HuntZodSchema } from "@/models/Hunt";
import { TeamModel } from "@/models/Team";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.next({ status: 401 });

    try {
        await dbConnect();
        const body = await req.json();
        body.organizer_id = session.user.id;

        const shortUuid = uuidv4().slice(0, 8);
        body.code = shortUuid.toUpperCase();

        body.markers.map((marker: Marker) => {
            marker.id = uuidv4().slice(0, 8);
        });

        const result = getparsedBody(HuntZodSchema, body);
        if (typeof result === "string") {
            return NextResponse.json(
                { error: "Failed to parse body", details: result },
                { status: 400 }
            );
        }

        if (!result.max_teams) {
            return NextResponse.json(
                { error: "max_teams is required" },
                { status: 400 }
            );
        }
        result.teams = Array.from({ length: result.max_teams }, () => new TeamModel().toObject());

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
