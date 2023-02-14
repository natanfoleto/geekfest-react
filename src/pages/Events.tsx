import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { findAllEvents, IEvent } from "../services/event";

import DefaultLayout from "../layouts/Default";

import styles from "./Events.module.css";

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
          <h1>Eventos | Competições</h1>
          <span>
            Veja todas as competições que acontecerão dentro do evento. Você
            pode ler as regras de cada uma, e se inscrever caso queira
            participar, seja sozinho ou com sua equipe!
          </span>
        </div>

        <div className={styles.subscribe}>
          <button onClick={() => handleNavigate("/event-subscribe")}>
            QUERO PARTICIPAR!
          </button>
        </div>

        <div className={styles.competitions}>
          {events?.map((event) => (
            <div key={event.id} className={styles.competition}>
              <img src={event.banner_url} alt={event.name} />

              <div>
                <div className={styles.info}>
                  <strong>{event.name}</strong>
                  <p>{event.notes}</p>
                  <br />
                  {event.type === 1 && <p>Inscrição individual</p>}
                  {event.type === 2 && (
                    <>
                      <p>Incrição de times</p>
                      <span>
                        Times de <b>{event.min}</b> até <b>{event.max}</b>{" "}
                        participantes
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Events;
