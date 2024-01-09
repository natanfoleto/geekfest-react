import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MapModal } from "../components/MapModal";

import styles from "./Schedule.module.css";

export function Schedule() {
  const navigate = useNavigate();

  const [mapModal, setMapModal] = useState(false);

  function handleNavigate(path: string) {
    navigate(path);
  }

  function handleMap() {
    setMapModal(!mapModal);
  }

  return (
    <div className={styles.container}>
      <h2 className="text-zinc-100 mb-6">Programações do evento</h2>

      <section className="flex gap-3">
        {/* <div onClick={() => handleNavigate("/games")} className={styles.card}>
          <img src="https://wallpaperaccess.com/full/4334829.jpg" />

          <div className="flex flex-col gap-[6px] py-3 px-4">
            <strong className="text-zinc-100">Sala de jogos</strong>
            <span className="text-zinc-400 text-xs">Disponível das 9h às 18h</span>
          </div>
        </div> */}

        <div className="w-[264px] rounded-md bg-zinc-600 transition-[box-shadow 0.2s] hover:cursor-pointer shadow-[0px 0px 0px 2px #04C04D]" onClick={handleMap}>
          <img src="https://i.imgur.com/76y79Bt.png" />

          <div className="flex flex-col gap-[6px] py-3 px-4">
            <strong className="text-zinc-100">Mapa do evento</strong>
            <span className="text-zinc-400 text-xs">Veja para onde quer ir</span>
          </div>
        </div>
      </section>

      <MapModal isOpen={mapModal} onClose={handleMap} />
    </div>
  );
}
