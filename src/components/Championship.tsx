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
      className="flex rounded-lg cursor-pointer transition-shadow [background-image: linear-gradient(62deg, var(--gray-700) 50%, var(--purple-500) 300%);] hover:[box-shadow: 0px 0px 0px 2px var(--blue-300);]"
      onClick={() => handleNavigate("/registrations")}
    >
      <div className="flex flex-col justify-between w-2/4 p-8">
        <div className="flex gap-6 mb-5">
          <img
            className="w-32 h-32 rounded"
            src="https://us.123rf.com/450wm/dolva/dolva1507/dolva150700009/43439811-symbol-competition-vs-vector-illustration-.jpg"
          />

          <div className="flex flex-col">
            <h2 className="text-zinc-100">Campeonatos</h2>
            <p className="text-zinc-400 mt-2">Participe, ganhe premios e insígnias</p>
          </div>
        </div>

        <p className=" text-zinc-500 text-sm"
        >Inscreva-se clicando no card!</p>
      </div>

      <div className="right-2/4 p-8">
        <span className="text-zinc-100">
          Para participar, inscreva-se no campeonato desejado. Não se esqueça de
          ler as especificações de cada um.
        </span>

        <div className="bg-zinc-600 mt-4 py-5 px-8 rounded-md">
          <ul>
            {events?.map((event) => (
              <li className="mt-3 before: content-[╺] mr-2 text-[rgb(106, 128, 255)]" key={event.id}>
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
