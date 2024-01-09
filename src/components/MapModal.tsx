import { X } from "phosphor-react";
import useMediaQuery from "../hooks/useMediaQuery";

import MapWidth from "../assets/map-w.jpg";
import MapHeight from "../assets/map-h.jpg";

import styles from "./MapModal.module.css";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MapModal({ isOpen, onClose }: MapModalProps) {
  const id = "modal";

  const mediaQueryMap = useMediaQuery("(min-width: 750px)");

  function handleOutsideClick(e: any) {
    if (e.target.id === id) onClose();
  }

  return (
    <div
      id={id}
      onClick={handleOutsideClick}
      className={isOpen ? styles.container : styles.none}
    >
      <X
        className="absolute top-4 right-4 text-zinc-100 cursor-pointer border-2 border-solid border-black rounded-[50px]"
        onClick={onClose}
        size={24}
        weight="bold"
        color="#000"
      />

      <img src={mediaQueryMap ? MapWidth : MapHeight} alt="Mapa do evento" />
    </div>
  );
}
