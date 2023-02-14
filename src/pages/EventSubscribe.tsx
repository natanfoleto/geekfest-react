import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { findAllEvents, IEvent } from "../services/event";

import DefaultLayout from "../layouts/Default";

import styles from "./EventSubscribe.module.css";

function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState<IEvent[]>();

  useEffect(() => {
    async function findSetAllEvents() {
      const { status, message, data } = await findAllEvents();

      if (status === "error") toast.error(message);
      if (status === "success") setEvents(data);
    }

    findSetAllEvents();
  }, []);

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <img
          src="https://imagensemoldes.com.br/wp-content/uploads/2021/03/VS-PNG.png"
          alt=""
        />

        <div className={styles.title}>
          <h1>Inscreva-se aqui!</h1>
          <span>Escolha a competição que gostaria de participar. Bora lá!</span>
        </div>

        <div className={styles.competitions}>
          {events?.map(
            (event) =>
              event.type !== 0 && (
                <div key={event.id} className={styles.competition}>
                  <img src={event.banner_url} alt={event.name} />

                  <div>
                    <strong>{event.name}</strong>
                    <p>{event.notes}</p>

                    <div className={styles.choose}>
                      <button onClick={() => handleNavigate("/registrations")}>
                        Ver inscrições
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Events;
