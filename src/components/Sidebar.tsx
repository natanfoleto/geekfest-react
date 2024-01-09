import { Phone } from "phosphor-react";

import { useAuth } from "../contexts/authentication";

import { Avatar } from "./Avatar";

import styles from "./Sidebar.module.css";

export function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="bg-zinc-700 rounded-lg overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1557683311-eac922347aa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1129&q=80"
        className="w-full h-[72px] object-cover"
      />

      <div className="flex flex-col items-center mt-[calc(0px - 1.5rem - 6px)]">
        <Avatar src="https://i.pinimg.com/474x/8f/e6/66/8fe66626ec212bb54e13fa94e84c105c.jpg" />

        <strong className="mt-4 text-zinc-100 leading[1.6]">{user?.name}</strong>
        <span className="text-sm text-zinc-400 leading-[1.6]">{user?.username}</span>
      </div>

      <footer className="flex flex-col items-center justify-center gap-2 text-zinc-400 text-base">
        {user?.phone && <Phone size={22} color="#04C04D" />} {user?.phone}
        {/* <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a> */}
      </footer>
    </aside>
  );
}
