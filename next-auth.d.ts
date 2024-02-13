import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    backendTokens: {
      accessToken: string;
      expiresIn?: number;
      refreshToken?: string;
    };

    user: {
      email: string;
      id?: number;
      name: string;
    };
  }
}


declare module "next-auth/jwt" {
  interface JWT {
    backendTokens: {
      accessToken: string;
      expiresIn?: number;
      refreshToken?: string;
    };

    user: {
      email: string;
      id?: number;
      name: string;
    };
  }
}
