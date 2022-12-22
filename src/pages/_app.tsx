import "../styles/globals.css";

import type { ComponentType, ReactElement, ReactNode } from "react";

import type { AppProps } from "next/app";
import AuthGuard from "../common/utils/AuthGuard";
import Head from "next/head";
import type { NextPage } from "next";
import NotAuthGuard from "../common/utils/NotAuthGuard";
import React from "react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { SocketContextProvider } from "../common/providers/SocketProvider";

export type NextApplicationPage<P = unknown, IP = P> = NextPage<P, IP> & {
  // Auth
  requireAuth?: boolean;
  requireNotAuth?: boolean;
  // Layout
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: ComponentType;
};

const ChatApp = (props: AppProps) => {
  const {
    Component,
    pageProps: { session, ...pageProps },
  }: {
    Component: NextApplicationPage;
    pageProps: { session: Session | null };
  } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const Layout = Component.layout ?? React.Fragment;

  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider session={session}>
        <SocketContextProvider>
          <Layout>
            {Component.requireAuth ? (
              <AuthGuard>{getLayout(<Component {...pageProps} />)}</AuthGuard>
            ) : Component.requireNotAuth ? (
              <NotAuthGuard>
                {getLayout(<Component {...pageProps} />)}
              </NotAuthGuard>
            ) : (
              getLayout(<Component {...pageProps} />)
            )}
          </Layout>
        </SocketContextProvider>
      </SessionProvider>
    </>
  );
};

export default ChatApp;
