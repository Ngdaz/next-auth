import NextAuth from "next-auth";
// import { authOptitons } from "@/lib/auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
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
            username: credentials.username,
            password: credentials.password,
          }),
        });
        if (res.ok) {
          const user = await res.json();

          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/authentication",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, user: { ...token } };
    },
  },
});

export { handler as GET, handler as POST };
