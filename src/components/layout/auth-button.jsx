"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export const AuthButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-8 h-8 rounded-full border-2 border-white/10 animate-pulse bg-white/5"></div>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <img 
          src={session.user?.image} 
          alt={session.user?.name} 
          className="w-8 h-8 rounded-full border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]" 
        />
        <button 
          onClick={() => signOut()}
          className="text-xs font-mono text-gray-400 hover:text-white transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => signIn('google')}
      className="px-5 py-2 rounded-full text-xs font-mono font-bold bg-white text-black hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]"
    >
      Sign In
    </button>
  );
};
