import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { getProviders, signIn } from "next-auth/react";

import type { BuiltInProviderType } from "next-auth/providers";
import type { NextApplicationPage } from "../_app";
import React from "react";

type SignInProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
};

const SignIn: NextApplicationPage<SignInProps> = ({ providers }) => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-[#56CCF2] to-[#2F80ED]">
      <div className="flex w-[95vw] flex-col justify-center rounded-2xl bg-white shadow-xl sm:w-[576px]">
        <div className="mx-[5vw] my-[4vh] select-none sm:mx-16 sm:my-12">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-theme">Please sign in.</h1>
            <span className="mt-2 font-normal text-secondary">
              You need to sign in to use the application.
            </span>
          </div>
          <div className="mt-4 mt-6 flex flex-col">
            <div className="flex flex-col">
              {Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  className="mt-3 rounded-md bg-theme px-6 py-4 text-white shadow-md hover:bg-theme-dark focus:outline-none"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  Sign in with {provider.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

SignIn.requireNotAuth = true;

export default SignIn;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
