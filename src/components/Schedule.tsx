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
      <h2>Programações do evento</h2>

      <section>
        {/* <div onClick={() => handleNavigate("/games")} className={styles.card}>
          <img src="https://wallpaperaccess.com/full/4334829.jpg" />

          <div className={styles.info}>
            <strong>Sala de jogos</strong>
            <span>Disponível das 9h às 18h</span>
          </div>
        </div> */}

        <div className={styles.card} onClick={handleMap}>
          <img src="https://i.imgur.com/76y79Bt.png" />

          <div className={styles.info}>
            <strong>Mapa do evento</strong>
            <span>Veja para onde quer ir</span>
          </div>
        </div>
      </section>

      <MapModal isOpen={mapModal} onClose={handleMap} />
    </div>
  );
}
