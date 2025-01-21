import dbConnect from "@/lib/dbConnect";
import { OrganizerZodSchema, OrganizerModel, Organizer } from "@/models/Organizer";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "path";

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


        const parsedBody = OrganizerZodSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json(
                { error: "Invalid input", details: parsedBody.error.errors },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(parsedBody.data.password, 10);

        parsedBody.data.password = hashedPassword;

        const newOrganizer: Organizer = await OrganizerModel.create(parsedBody.data);
        return NextResponse.json(newOrganizer, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create organizer" },
            { status: 500 }
        );
    }
}
