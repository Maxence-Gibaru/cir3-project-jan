import dbConnect from "@/lib/dbConnect";
import { Hunt, HuntModel, HuntZodSchema } from "@/models/Hunt";
import { NextRequest, NextResponse } from "next/server";

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
        // body.user_id = getUserId(req);
        const parsedBody = HuntZodSchema.safeParse(body);

        if (!parsedBody.success) {
            let details = "";
            if (parsedBody.error.errors) {
                details = parsedBody.error.errors.map((error) => error.message + " " + error.path + " " + error.code).join(", ");
            }

            return NextResponse.json(
                { error: "Invalid input", details },
                { status: 400 }
            );
        }

        const newHunt: Hunt = await HuntModel.create(parsedBody.data);
        return NextResponse.json(newHunt, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create hunt" },
            { status: 500 }
        );
    }
}
