import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getparsedBody } from "../../utils";

const ReqZodSchema = z.object({
    lobby_code: z.string(),
});

// Join lobby
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
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

        if (!result.lobby_code) {
            return NextResponse.json(
                { error: "Code de chasse au trésor manquant." },
                { status: 400 }
            );
        }

        const hunt = await HuntModel.findOne({ code: result.lobby_code, status: "opened" });
        if (!hunt) {
            return NextResponse.json(
                { error: "Aucune chasse au trésor trouvée avec ce code." },
                { status: 404 }
            );
        }

        return NextResponse.json({ hunt }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Échec de la recherche de la chasse au trésor." },
            { status: 500 }
        );
    }
}
