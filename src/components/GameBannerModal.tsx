import { X } from "phosphor-react";

import styles from "./GameBannerModal.module.css";

interface GameBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  bannerUrl: string | null;
  title: string;
  modality: string;
  schedules: {
    hour_start: string;
    hour_end: string;
  }[];
}

export function GameBannerModal({
  isOpen,
  onClose,
  bannerUrl,
  title,
  modality,
  schedules,
}: GameBannerModalProps) {
  const id = "modal";

  function handleOutsideClick(e: any) {
    if (e.target.id === id) onClose();
  }

  return (
    <div
      id={id}
      onClick={handleOutsideClick}
      className={isOpen ? styles.container : styles.none}
    >
      <div className="rounded-sm bg-zinc-900 p-8 relative flex flex-col justify-center">
      
        <X className="absolute top-4 right-4 text-zinc-100 cursor-pointer" onClick={onClose} size={24} />

        <img
          src={
            bannerUrl
              ? bannerUrl
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQomRIT4OKajo2mGAToSVe48g_SBEMF3PJO1vRPLTJe420MpxJsj7McYZ57_ibN3UVgJrQ&usqp=CAU"
          }
          className="rounded-lg h-64 object-cover mt-4 mr-4 mb-8 ml-4"
        />

        <div>
          <strong className="flex text-zinc-300">{title}</strong>
          <span className="block text-zinc-500">{modality}</span>
          <div className="flex flex-col mt-4">
            <strong className="mb-2">Horários de funcionamento</strong>

            {schedules.map((item) => (
              <div className="flex gap-2 text-zinc-500">
                <span className="text-zinc-500 leading-snug">{item.hour_start}</span>
                <span className="text-zinc-500 leading-snug">•</span>
                <span className="text-zinc-500 leading-snug">{item.hour_end}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
