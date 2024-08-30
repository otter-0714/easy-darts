import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../../lib/prisma";

type ClientType = {
  clientId: string;
  clientSecret: string;
};

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as ClientType),
  ],

  callbacks: {
    async signIn({ user }) {
      // ユーザーのメールアドレスを取得
      const email = user.email;

      if (email) {
        // データベースにユーザーが存在するか確認
        const existingUser = await prisma.user.findUnique({
          where: { email: email },
        });

        // ユーザーが存在しない場合、新しいユーザーを作成
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: email,
            },
          });
        }
      }

      return true; // ログインを許可
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
