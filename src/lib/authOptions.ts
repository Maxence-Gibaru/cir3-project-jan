// authOptions.js
import dbConnect from "@/lib/dbConnect";
import { OrganizerModel } from "@/models/Organizer";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextRequest } from "next/server";
import { fetchApi } from "./api";

export const authOptions = {
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
                    if (!credentials) return null;
                    const { email, password } = credentials;

                    const user = await OrganizerModel.findOne({ email });

                    if (user && password) {
                        const isValidPassword = await bcrypt.compare(password, user.password);
                        if (isValidPassword) {
                            return {
                                id: user._id.toString(),
                                email: user.email,
                                role: "organizer",
                            };
                        }
                    }
                    return null;
                } catch (e) {
                    console.error(e);
                    return null;
                }
            },

        }),
        CredentialsProvider({
            id: "guest-credentials",
            name: "Guest",
            credentials: {},
            async authorize() {
                const response = await fetchApi("generate")
                const data = await response.output
                const guestUser = {
                    id: "guest_" + Math.random().toString(36).substring(2, 15),
                    name: data,
                    role: "guest",
                    huntId: null,
                    teamIndex: null,
                };
                return guestUser;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.user = user;
            }
            if (trigger === 'update' && session) {

                token = { ...token, user: session }
                return token;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;

            return session;
        },
    },
};
