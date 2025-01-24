// @ts-nocheck

import { Marker } from "@/definitions";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { z } from "zod";
import { getparsedBody } from "../../utils";

const ReqZodSchema = z.object({
    huntId: z.string(),
});

export async function PUT(req: NextRequest) {
    const session: any = await getServerSession(authOptions as any);
    if (!session) return NextResponse.next({ status: 401 });

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
        
        const guestId: string = session.user.id;
        const hunt = await HuntModel.findById({ _id: result.huntId!, organizer_id: guestId, status: 'ended' });
        if (!hunt) {
            return NextResponse.json(
                { error: "Hunt not found" },
                { status: 404 }
            );
        }

        const teams = Array.from({ length: result.max_teams }, () => new TeamModel().toObject());
        const markers = hunt.markers
        markers.map((marker: Marker) => {
            marker.id = uuidv4().slice(0, 8);
        });

        const stories = [];

        const shortUuid = uuidv4().slice(0, 8);
        const code = shortUuid.toUpperCase();

        await HuntModel.updateOne({_id: hunt._id}, {
            teams,
            markers,
            stories,
            code,
            started_at: undefined,
            status: 'closed'
        });

        return NextResponse.json({ isValid: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Echec lors de l'actualisation du status" },
            { status: 500 }
        );
    }
}
