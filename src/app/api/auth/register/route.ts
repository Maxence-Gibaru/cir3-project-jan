import dbConnect from "@/lib/dbConnect";
import { OrganizerModel } from "@/models/Organizer";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();
        const organizers = await OrganizerModel.find();
        return NextResponse.json(organizers, { status: 200 });
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

        const hashedPassword = await bcrypt.hash(body.password, 10);

        body.password = hashedPassword;

        await OrganizerModel.create(body);
        return NextResponse.json({ message: "Registered well !" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create organizer" },
            { status: 500 }
        );
    }
}
