import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import AppleProvider from 'next-auth/providers/apple';
import TwitterProvider from 'next-auth/providers/twitter';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const oauthProviders = {
  google: {
    id: 'google',
    name: 'Google',
    type: 'oauth',
    wellKnown: 'https://accounts.google.com/.well-known/openid_configuration',
    authorization: {
      url: 'https://accounts.google.com/o/oauth2/v2/auth',
      params: {
        scope: 'openid email profile',
        access_type: 'offline',
        response_type: 'code',
      },
    },
    token: 'https://oauth2.googleapis.com/token',
    userinfo: 'https://www.googleapis.com/oauth2/v3/userinfo',
    profile(profile: any) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      };
    },
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    type: 'oauth',
    authorization: {
      url: 'https://www.facebook.com/v18.0/dialog/oauth',
      params: {
        scope: 'email public_profile',
      },
    },
    token: 'https://graph.facebook.com/oauth/access_token',
    userinfo: 'https://graph.facebook.com/me',
    profile(profile: any) {
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        image: profile.picture?.data?.url,
      };
    },
    clientId: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
  },
  apple: {
    id: 'apple',
    name: 'Apple',
    type: 'oauth',
    authorization: {
      url: 'https://appleid.apple.com/auth/authorize',
      params: {
        scope: 'name email',
        response_mode: 'form_post',
        response_type: 'code id_token',
      },
    },
    token: 'https://appleid.apple.com/auth/token',
    userinfo: 'https://appleid.apple.com/auth/userinfo',
    profile(profile: any) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: null,
      };
    },
    clientId: process.env.APPLE_CLIENT_ID!,
    clientSecret: process.env.APPLE_CLIENT_SECRET!,
  },
  twitter: {
    id: 'twitter',
    name: 'Twitter',
    type: 'oauth',
    version: '2.0',
    authorization: {
      url: 'https://twitter.com/i/oauth2/authorize',
      params: {
        scope: 'tweet.read users.read offline.access',
      },
    },
    token: 'https://api.twitter.com/2/oauth2/token',
    userinfo: 'https://api.twitter.com/2/users/me',
    profile(profile: any) {
      return {
        id: profile.data.id,
        name: profile.data.name,
        email: profile.data.email,
        image: profile.data.profile_image_url,
      };
    },
    clientId: process.env.TWITTER_CLIENT_ID!,
    clientSecret: process.env.TWITTER_CLIENT_SECRET!,
  },
};

export const oauthConfig: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: '2.0',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // التحقق من صحة الحساب
      if (!user.email) {
        return false;
      }

      // إنشاء أو تحديث المستخدم في قاعدة البيانات
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        // إنشاء مستخدم جديد
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            image: user.image,
            emailVerified: new Date(),
            role: 'USER',
            provider: account?.provider || 'unknown',
            providerId: account?.providerAccountId || '',
          },
        });
      } else {
        // تحديث معلومات المستخدم الموجود
        await prisma.user.update({
          where: { email: user.email },
          data: {
            name: user.name,
            image: user.image,
            provider: account?.provider || existingUser.provider,
            providerId: account?.providerAccountId || existingUser.providerId,
          },
        });
      }

      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};