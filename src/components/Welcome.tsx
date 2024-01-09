import { useAuth } from "../contexts/authentication";

import styles from "./Welcome.module.css";

export function Welcome() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between mt-0 mr-0 mb-8 ml-0">
      <div className="flex items-center">
        <h2 className="text-[2rem] text-zinc-100">Olá, {user?.name}</h2>

        <div className="mt-0 mr-0 mb-0 ml-12">
          <p className="text-zinc-300 leading[1.5]">É bom ter você aqui!</p>
          <p className="text-zinc-300 leading[1.5]">O Nosso time está muito feliz com a sua presença.</p>
        </div>
      </div>

      <span className="text-zinc-400">#GeekFestJaborandi</span>
    </div>
  );
}
