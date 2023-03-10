import { NavLink, useNavigate } from "react-router-dom";
import { SignOut, WhatsappLogo } from "phosphor-react";

import { useAuth } from "../contexts/authentication";

import { ITEMS_HEADER } from "../constants/config";

import styles from "./MenuWeb.module.css";

function MenuWeb() {
  const navigate = useNavigate();

  const { user, signOut } = useAuth();

  function handleSignOut() {
    signOut();

    navigate("/");
  }

  return (
    <div className={styles.container}>
      <nav className={styles.menu}>
        {ITEMS_HEADER.map((navItem, idx) => (
          <NavLink
            key={idx}
            to={navItem.path}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
            end
          >
            {navItem.title}
          </NavLink>
        ))}
      </nav>

      <aside className={styles.aside}>
        <NavLink to={`/me/${user?.username}`}>Meu perfil</NavLink>
        <a href="http://wa.me/+5517992685060" target="_blank">
          Help
          <p>
            <WhatsappLogo color="#1AD140" size={24} />
          </p>
        </a>
        <button onClick={handleSignOut} className={styles.logout}>
          <SignOut />
          Logout
        </button>
      </aside>
    </div>
  );
}

export default MenuWeb;
