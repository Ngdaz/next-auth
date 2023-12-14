import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {},
      async authorize(credentials: any) {
        const res = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.userName,
            password: credentials.password,
            // expiresInMins: 60, // optional
          }),
        });
        if (res.ok) {
          return res.json();
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/authentication",
  },
};
