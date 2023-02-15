import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { findAllEvents, IEvent } from "../services/event";

import styles from "./Championship.module.css";

export function Championship() {
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
    <div
      className={styles.container}
      onClick={() => handleNavigate("/event-subscribe")}
    >
      <div className={styles.left}>
        <div className={styles.head}>
          <img
            className={styles.cover}
            src="https://us.123rf.com/450wm/dolva/dolva1507/dolva150700009/43439811-symbol-competition-vs-vector-illustration-.jpg"
          />

          <div className={styles.titles}>
            <h2>Campeonatos</h2>
            <p>Participe, ganhe premios e insígnias</p>
          </div>
        </div>

        <p>Inscreva-se clicando no card!</p>
      </div>

      <div className={styles.right}>
        <span className={styles.info}>
          Para participar, inscreva-se no campeonato desejado. Não se esqueca de
          ler as especificações de cada um.
        </span>

        <div className={styles.games}>
          <ul>
            {events?.map((event) => (
              <li key={event.id}>
                {event.name} {event.type === 0 && ""}
                {event.type === 1 && "| Individual"}
                {event.type === 2 && "| Times"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
