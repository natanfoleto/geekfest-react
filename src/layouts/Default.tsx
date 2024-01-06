import React from "react";
import { NavLink } from "react-router-dom";

import { GameController } from "phosphor-react";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import { PermissionGate } from "../components/PermissionGate";

interface DefaultLayoutProps {
  children: React.ReactNode;
  buttonPanel?: boolean;
}

export function DefaultLayout({
  children,
  buttonPanel = true,
}: DefaultLayoutProps) {
  return (
    <div className="relative min-h-screen bg-login bg-cover bg-no-repeat bg-fixed">
      <Header />

      <div className="min-h-[calc(100vh - 64px - 76px)] flex justify-center px-5">
        {children}
      </div>

      {buttonPanel && (
        <PermissionGate permissions={["admin-panel"]}>
          <div>
            <NavLink 
              to={"/panel"} 
              className="fixed bottom-2 right-2 rounded-lg p-1 bg-emerald-500 cursor-pointer"
            >
              <GameController size={36} color="#FFF" />
            </NavLink>
          </div>
        </PermissionGate>
      )}

      <button
        className="fixed bottom-2 left-2 flex p-2 border-0 outline-0 rounded-md text-zinc-200 bg-zinc-700 cursor-pointer transition-all hover:bg-zinc-800"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Voltar ao Topo
      </button>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
