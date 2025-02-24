import passport from "passport";
import { Strategy as GoogleStratrgy } from "passport-google-oauth20";
import { prisma } from "@repo/db/singleton";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStratrgy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;

                if (!email) {
                    return done(new Error("No email found from google!"), false);
                }

                let user = await prisma.user.findUnique({ where: { email } });

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            email,
                            googleId: profile.id,
                            authtype: "google",
                            name: profile.displayName
                        }
                    });
                } else if(user.authtype !== "google"){
                    return done(null, false);
                }

                const token = jwt.sign(
                    {id: user.id},
                    process.env.JWT_SECRET!,
                    {expiresIn: "7d"}
                );

                return done(null, {user, token});
            } catch (error) {
                return done(error, false);
            }
        }
    )
)