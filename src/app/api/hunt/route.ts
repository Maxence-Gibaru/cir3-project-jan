import dbConnect from "@/lib/dbConnect";
import { Hunt, HuntModel, HuntZodSchema } from "@/models/Hunt";
import { NextRequest, NextResponse } from "next/server";
import { getparsedBody } from "../utils";

export async function GET() {
    try {
        await dbConnect();
        // const user_id = "";
        // const hunts = await HuntModel.find({ user_id });
        const hunts = await HuntModel.find();
        return NextResponse.json(hunts, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch organizers" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const result = getparsedBody(HuntZodSchema, body);
        if (typeof result === "string") {
            return NextResponse.json(
                { error: "Failed to parse body", details: result },
                { status: 400 }
            );
        }

        result.code = Math.random().toString(36).substring(7).toUpperCase();
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
