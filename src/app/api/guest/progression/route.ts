import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { HuntModel } from "@/models/Hunt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.next({ status: 401 });

    try {
        await dbConnect();
        // Get from URl search
        const urlSearch = new URLSearchParams(req.nextUrl.search);
        const huntId = urlSearch.get("id");
        
        let progression = "not_started";
        if (huntId) {
            const hunt = await HuntModel.findById(huntId);
            if (hunt) {
                // Check if the user is in a team
                const guestId = session.user.id;
                const team = hunt.teams.find((team) => team.guests.find((guest) => guest.id === guestId));
                
                if (hunt.status === "opened") {
                    if (!team) {
                        progression = "selection";
                    } else {
                        progression = "waiting";
                    }
                } else if (hunt.status === "started") {
                    progression = "hunting";
                }
            }
        }


       return NextResponse.json({ progression }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Échec de la recherche de la chasse au trésor." },
            { status: 500 }
        );
    }
}
