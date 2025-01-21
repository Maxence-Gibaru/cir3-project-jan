import dbConnect from "@/lib/dbConnect";
import { Hunt, HuntModel, HuntZodSchema } from "@/models/Hunt";
import { NextRequest, NextResponse } from "next/server";
import { getparsedBody } from "../utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
    const session = await getServerSession(authOptions);

    console.log('session : ', session);

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
        // body.user_id = getUserId(req);

        /*         console.log("body : ", body) */

        const result = getparsedBody(HuntZodSchema, body);
        console.log("result", result);
        if (!result.success) {
            return NextResponse.json(
                { error: "Failed to parse body", details: result.content },
                { status: 400 }
            );
        }


        result.content.code = Math.random().toString(36).substring(7).toUpperCase();


        const newHunt: Hunt = await HuntModel.create(result.content);
        return NextResponse.json(newHunt, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create hunt" },
            { status: 500 }
        );
    }
}
