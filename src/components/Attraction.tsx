import { useNavigate } from "react-router-dom";

import styles from "./Attraction.module.css";

export function Attraction() {
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <div className="flex items-center justify-between py-8 px-12 rounded-t-lg border-solid border-b-2 border-transparent [border-image: linear-gradient(45deg,#3838FC,#202024)_1] bg-zinc-800 bg-gradient-to-t from-linear-gradient"
    >
      <h2 className="text-zinc-100">Atrações</h2>

      <p className="w-6/12 text-zinc-100 leading-normal">
        Confira todas as atrações do evento geek. Temos workshops,
        apresentações, sala de games, lojas, comidas, entrevistas e muito mais.
        Lembrando que nenhuma atração precisa de inscrição. Clique em saber
        mais, e veja quais são elas, e como você pode participar.
      </p>

      <button className="py-3 px-8 font-bold text-sm text-zinc-100 bg-blue-300 border-0 rounded-md cursor-pointer transition-all hover:bg-blue-400" type="button" onClick={() => handleNavigate("/attractions")}>
        SABER MAIS
      </button>
    </div>
  );
}
