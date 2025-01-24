// authOptions.js
import dbConnect from "@/lib/dbConnect";
import { OrganizerModel } from "@/models/Organizer";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { v4 as uuidv4 } from 'uuid';
import { fetchApi } from "./api";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
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
                    id: "guest_" + uuidv4().slice(0, 8),
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

    secret: process.env.NEXTAUTH_SECRET,
};
