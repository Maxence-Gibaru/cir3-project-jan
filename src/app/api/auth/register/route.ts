// @ts-nocheck


import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { Organizer, OrganizerModel, OrganizerZodSchema } from "@/models/Organizer";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getparsedBody } from "../../utils";

export async function POST(req: NextRequest) {
    // If already authenticated
    const session = await getServerSession(authOptions);
    if (session && session.user.role == "organizer") return NextResponse.json({ error: "Vous êtes déjà connecté" }, { status: 401 });
    
    try {
        await dbConnect();
        const body = await req.json();
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;
        const result = getparsedBody(OrganizerZodSchema, body);
        if (typeof result === "string") {
            return NextResponse.json(
                { error: "Failed to parse body", details: result },
                { status: 400 }
            );
        }

        const newOrganizer: Organizer = await OrganizerModel.create(result);
        return NextResponse.json(newOrganizer, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create organizer" },
            { status: 500 }
        );
    }
}
