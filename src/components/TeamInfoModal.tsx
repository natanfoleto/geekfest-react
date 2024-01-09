import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { X } from "phosphor-react";
import { toast } from "react-toastify";

import { DeleteDialog } from "../components/DeleteDialog";

import {
  IUserTeam,
  updateNicknameUserTeam,
  deleteUserTeam,
} from "../services/userTeam";

import styles from "./TeamInfoModal.module.css";

interface TeamInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDoneRequest: () => void;
  userTeam: IUserTeam | null;
}

export function TeamInfoModal({
  isOpen,
  onClose,
  onDoneRequest,
  userTeam,
}: TeamInfoModalProps) {
  const id = "modal";

  const [nickname, setNickname] = useState<string>("");

  const [deleteUserTeamDialog, setDeleteUserTeamDialog] = useState(false);

  function handleOutsideClick(e: any) {
    if (e.target.id === id) onClose();
  }

  async function handleSubmitUpdateNickname(event: FormEvent) {
    event.preventDefault();

    const id = userTeam?.id;

    if (id) {
      const { status, message } = await updateNicknameUserTeam({
        id,
        nickname,
      });

      if (status === "error") toast.error(message);
      if (status === "success") {
        toast.success(message);
      }

      setNickname("");
      onClose();
      onDoneRequest();
    }
  }

  async function handleSubmitDeleteUserTeam() {
    const id = userTeam?.id;

    if (id) {
      const { status, message } = await deleteUserTeam({
        id,
      });

      if (status === "error") toast.error(message);
      if (status === "success") {
        toast.success(message);
      }

      onClose();
      hideDialog();
      onDoneRequest();
    }
  }

  function handleNicknameChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNickname(event.target.value);
  }

  function hideDialog() {
    setDeleteUserTeamDialog(!deleteUserTeamDialog);
  }

  return (
    <div
      id={id}
      onClick={handleOutsideClick}
      className={isOpen ? "w-full h-screen fixed top-0 left-0 bg-black opacity-100 transition-[opacity 0.5s linear] p-4 flex items-center justify-center" : "hidden"}
    >
      <div className="rounded-sm bg-zinc-900 p-8 relative flex flex-col justify-center">
        <X className="absolute top-[15px] right-[15px] text-zinc-100 cursor-pointer" onClick={onClose} size={24} />

        <h1 className="mt-4 text-zinc-100 text-2xl">{userTeam?.team.name}</h1>

        <div className="mt-4 flex gap-8">
          <div>
            <h1 className="text-zinc-100 text-base mb-3">Informações do capitão</h1>

            <p className="text-zinc-300">{userTeam?.team.user.name}</p>
            <p className="text-zinc-300">{userTeam?.team.user.phone}</p>
          </div>

          <div className={styles.event}>
            <h1 className="text-zinc-100 text-base mb-3">Evento ou competição</h1>

            <div className="max-w-[50vw] flex gap-2">
              <img
              className="rounded-lg w-12 object-cover"
                src={
                  userTeam?.team.event.banner_url
                    ? userTeam?.team.event.banner_url
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQomRIT4OKajo2mGAToSVe48g_SBEMF3PJO1vRPLTJe420MpxJsj7McYZ57_ibN3UVgJrQ&usqp=CAU"
                }
              />

              <div className="flex flex-col gap-2">
                <p className="text-zinc-300">{userTeam?.team.event.name}</p>
                <p className="text-zinc-300">{userTeam?.team.event.notes}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 mb-2">
          <strong className="text-zinc-100">Meu nickname</strong>
          <p className="text-zinc-300">{userTeam?.nickname}</p>
        </div>

        <form
          onSubmit={handleSubmitUpdateNickname}
          className="flex items-center gap-2"
        >
          <input
            className="outline-0 py-1 px-2 rounded border-0"
            name="nickname"
            type="text"
            placeholder="Novo nickname"
            value={nickname}
            onChange={handleNicknameChange}
            required
          />
          <button className="border-0 rounded py-1 px-2 bg-blue-300 text-zinc-300 cursor-pointer hover:bg-blue-500 transition-[0.2s]" type="submit">Alterar nickname</button>
        </form>

        <div
          onClick={() => setDeleteUserTeamDialog(true)}
        >
          <button className="border-0 rounded mt-4 py-1 px-2 bg-red-300 text-zinc-300 cursor-pointer" type="submit">Sair do time</button>
        </div>

        <span>
          《 Apenas o capitão pode gerenciar as informações do time 》
        </span>
      </div>

      <DeleteDialog
        isOpen={deleteUserTeamDialog}
        title="Sair do time?"
        lore="Deseja mesmo sair do "
        subject={userTeam?.team.name}
        onHide={hideDialog}
        onDelete={handleSubmitDeleteUserTeam}
      />
    </div>
  );
}
