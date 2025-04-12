import NextAuth, { type NextAuthOptions } from "next-auth";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),

    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     */
  ],

  // Include user.id on session
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;

      return true;
    },
    async session({ session, user }) {
      if (user) {
        const userData = await prisma.user.findFirst({
          where: { id: user.id },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            bio: true,
            contacts: true,
          },
        });
        if (!userData) {
          return session;
        }

        const sessionUser = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          image: userData.image,
          bio: userData.bio,
          contactCount: userData.contacts.length,
        };

        session.user = sessionUser;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
