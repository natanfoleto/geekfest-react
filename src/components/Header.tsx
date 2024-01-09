import MenuWeb from "./MenuWeb";
import MenuMobile from "./MenuMobile";

import styles from "./Header.module.css";

export function Header() {
  return (
    <header className="flex justify-center bg-zinc-800">
      <MenuWeb />
      <MenuMobile />
    </header>
  );
}
