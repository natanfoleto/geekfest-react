import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { findAllAttractions, IAttraction } from "../services/attraction";

import DefaultLayout from "../layouts/Default";

import styles from "./Attractions.module.css";

function Attractions() {
  const [attractions, setAttractions] = useState<IAttraction[]>();

  useEffect(() => {
    async function findSetAllAttractions() {
      const { status, message, data } = await findAllAttractions();

      if (status === "error") toast.error(message);
      if (status === "success") setAttractions(data);
    }

    findSetAllAttractions();
  }, []);

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Atrações</h1>
          <span>
            Confira todas as atrações do evento geek. Temos workshops,
            apresentações, sala de games, lojas, comidas, entrevistas e muito
            mais. Lembrando que nenhuma atração precisa de inscrição.
          </span>
        </div>

        <div className={styles.attractions}>
          {attractions?.map((attraction) => (
            <div key={attraction.id} className={styles.attraction}>
              <div>
                <div className={styles.info}>
                  <strong>{attraction.name}</strong>
                  <p>{attraction.description}</p>
                </div>
              </div>

              {attraction.banner_url && (
                <img src={attraction.banner_url} alt={attraction.name} />
              )}
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Attractions;
