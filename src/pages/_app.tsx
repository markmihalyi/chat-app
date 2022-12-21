import "../styles/globals.css";

import type { AppProps } from "next/app";
import AuthGuard from "../common/helpers/AuthGuard";
import Head from "next/head";
import type { NextPage } from "next";
import NotAuthGuard from "../common/helpers/NotAuthGuard";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { SocketContextProvider } from "../common/providers/SocketProvider";

export type NextApplicationPage<P = unknown, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
  requireNotAuth?: boolean;
};

const ChatApp = (props: AppProps) => {
  const {
    Component,
    pageProps: { session, ...pageProps },
  }: {
    Component: NextApplicationPage;
    pageProps: { session: Session | null };
  } = props;

  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider session={session}>
        <SocketContextProvider>
          {Component.requireAuth ? (
            <AuthGuard>
              <Component {...pageProps} />
            </AuthGuard>
          ) : Component.requireNotAuth ? (
            <NotAuthGuard>
              <Component {...pageProps} />
            </NotAuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
        </SocketContextProvider>
      </SessionProvider>
    </>
  );
};

export default ChatApp;
