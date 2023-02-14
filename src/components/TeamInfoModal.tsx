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
      className={isOpen ? styles.container : styles.none}
    >
      <div className={styles.content}>
        <X className={styles.close} onClick={onClose} size={24} />

        <h1 className={styles.teamName}>{userTeam?.team.name}</h1>

        <div className={styles.body}>
          <div className={styles.capitain}>
            <h1>Informações do capitão</h1>

            <p>{userTeam?.team.user.name}</p>
            <p>{userTeam?.team.user.phone}</p>
          </div>

          <div className={styles.event}>
            <h1>Evento ou competição</h1>

            <div className={styles.eventInfo}>
              <img
                src={
                  userTeam?.team.event.banner_url
                    ? userTeam?.team.event.banner_url
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQomRIT4OKajo2mGAToSVe48g_SBEMF3PJO1vRPLTJe420MpxJsj7McYZ57_ibN3UVgJrQ&usqp=CAU"
                }
              />

              <div>
                <p>{userTeam?.team.event.name}</p>
                <p>{userTeam?.team.event.notes}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.nickname}>
          <strong>Meu nickname</strong>
          <p>{userTeam?.nickname}</p>
        </div>

        <form
          onSubmit={handleSubmitUpdateNickname}
          className={styles.changeNickname}
        >
          <input
            name="nickname"
            type="text"
            placeholder="Novo nickname"
            value={nickname}
            onChange={handleNicknameChange}
            required
          />
          <button type="submit">Alterar nickname</button>
        </form>

        <div
          className={styles.leaveTeam}
          onClick={() => setDeleteUserTeamDialog(true)}
        >
          <button type="submit">Sair do time</button>
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
