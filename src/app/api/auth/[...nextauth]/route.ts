import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email as string,
          },
        });

        if (existingUser) {
          if (existingUser.googleId == null) {
            await prisma.user.update({
              where: { email: user.email as string },
              data: { googleId: profile?.sub },
            });
          }
        } else {
          await prisma.user.create({
            data: {
              email: user.email as string,
              name: user.name as string,
              googleId: profile?.sub,
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, profile }) {
      if (user) {
        token.id = user.id;
        token.email = user?.email as string;
        token.googleId = profile?.sub;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
