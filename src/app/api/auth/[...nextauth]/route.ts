import dbConnect from "@/lib/dbConnect";
import { OrganizerModel, OrganizerZodSchema } from "@/models/Organizer";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest } from "next/server";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req: NextRequest) {
                try {
                    await dbConnect();
                    const { email, password } = credentials;

                    const user = await OrganizerModel.findOne({ email: email });

                    if (user && password) {
                        const isValidPassword = await bcrypt.compare(password, user.password);
                        if (isValidPassword) {
                            return { id: user._id.toString(), email: user.email };
                        }
                    }
                    return null;
                } catch (e) {
                    console.error(e);
                    return null;
                }
            },
        }),
    ],
    // adding user info to the user session object
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user);
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
});

export { handler as GET, handler as POST };

