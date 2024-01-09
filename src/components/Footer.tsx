import { CaretUp } from "phosphor-react";

import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className="h-16 flex justify-center bg-zinc-700">
      <div className="w-[1120px] flex items-center justify-center">
        <span className="text-sm text-zinc-400">Geek Fest Jaborandi - Todos os direitos reservados - Ctech 2024</span>
      </div>
    </footer>
  );
}
