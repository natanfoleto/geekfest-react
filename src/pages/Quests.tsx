import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../contexts/authentication";

import useMediaQuery from "../hooks/useMediaQuery";

import { Minus } from "phosphor-react";

import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

import { DeleteDialog } from "../components/DeleteDialog";

import { IQuest, findAllQuests } from "../services/quest";
import { IUser, findAllUsers } from "../services/user";
import {
  IUserQuest,
  createUserQuest,
  findUserQuestsByQuestId,
  findUserQuestsByUserId,
  getAmountBadgesByUserId,
  deleteUserQuest,
} from "../services/userQuest";

import DefaultLayout from "../layouts/Default";

import { PermissionGate } from "../components/PermissionGate";

import styles from "./Quests.module.css";

function Quests() {
  const { user } = useAuth();

  const [quests, setQuests] = useState<IQuest[]>();
  const [selectedQuest, setSelectedQuest] = useState<IQuest | null>();

  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>();

  const [usersQuests, setUsersQuests] = useState<IUserQuest[] | null>();
  const [selectedUserQuest, setSelectedUserQuest] =
    useState<IUserQuest | null>();

  const [myUsersQuests, setMyUsersQuests] = useState<IUserQuest[] | null>();
  const [amountBadges, setAmountBadges] = useState(0);

  const [doneRequest, setDoneRequest] = useState(false);
  const [createUserQuestDialog, setCreateUserQuestDialog] = useState(false);
  const [completedDialog, setCompletedDialog] = useState(false);
  const [deleteCompletedDialog, setDeleteCompletedDialog] = useState(false);

  const mediaQueryCompletedDialog = useMediaQuery("(min-width: 900px)");
  const mediaQueryCreateUserQuest = useMediaQuery("(min-width: 750px)");

  useEffect(() => {
    async function findSetAllQuests() {
      const { status, message, data } = await findAllQuests();

      if (status === "error") toast.error(message);
      if (status === "success") setQuests(data);
    }

    async function findSetUsers() {
      const { status, message, data } = await findAllUsers();

      if (status === "error") toast.error(message);
      if (status === "success") setUsers(data);
    }

    async function findSetUserQuestsByUserId() {
      const id = user?.id;

      if (id) {
        const { status, message, data } = await findUserQuestsByUserId({ id });

        if (status === "error") toast.error(message);
        if (status === "success") setMyUsersQuests(data);
      }
    }

    async function getSetAmountBadgesByUserId() {
      const id = user?.id;

      if (id) {
        const { status, message, data } = await getAmountBadgesByUserId({ id });

        if (status === "error") toast.error(message);
        if (status === "success") setAmountBadges(data.amount);
      }
    }

    findSetAllQuests();
    findSetUsers();
    findSetUserQuestsByUserId();
    getSetAmountBadgesByUserId();
  }, [doneRequest]);

  async function handleSubmitCreateUserQuest() {
    const id_quest = selectedQuest?.id;
    const id_user = selectedUser?.id;

    if (id_quest && id_user) {
      const { status, message } = await createUserQuest({
        id_user,
        id_quest,
      });
      if (status === "success") toast.success(message);
      if (status === "error") toast.error(message);

      clearStates();
      hideDialog();
      setDoneRequest(!doneRequest);
    }
  }

  function handleCreateUserQuest(quest: IQuest) {
    setSelectedQuest(quest);
    setCreateUserQuestDialog(!createUserQuestDialog);
  }

  async function handleCompleted(quest: IQuest) {
    const id = quest?.id;

    if (id) {
      const { status, message, data } = await findUserQuestsByQuestId({ id });

      if (status === "error") toast.error(message);
      if (status === "success") setUsersQuests(data);
    }

    setCompletedDialog(true);
  }

  async function handleSubmitDeleteUserQuest() {
    const id = selectedUserQuest?.id;

    if (id) {
      const { status, message } = await deleteUserQuest({
        id,
      });

      if (status === "success") toast.success(message);
      if (status === "error") toast.error(message);

      setUsersQuests((userQuest) =>
        userQuest?.filter((item) => item.id !== id)
      );

      clearStates();
      hideDialog();
      setDoneRequest(!doneRequest);
    }
  }

  function handleDeleteUserQuest(userQuest: IUserQuest) {
    setSelectedUserQuest(userQuest);
    setDeleteCompletedDialog(true);
  }

  function hideDialog() {
    setCreateUserQuestDialog(false);
    setDeleteCompletedDialog(false);
  }

  function handleUserChange(value: IUser) {
    console.log(value);

    setSelectedUser(value);
  }

  function clearStates() {
    setSelectedUser(null);
    setSelectedQuest(null);
    setSelectedUserQuest(null);
  }

  const selectedUserTemplate = (option: IUser, props: any) => {
    if (option) {
      return (
        <div>
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const userOptionTemplate = (option: IUser) => {
    return (
      <div>
        <div>{option.username}</div>
      </div>
    );
  };

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Missões</h1>
          <span>
            Verifique aqui os requisitos para cumprir suas missões e receber
            insígnias físicas e digitais, durante o evento. Os três primeiros a
            coletarem todas as insígnias e apresentarem no local designado,
            receberão uma case personalizada para guarda-las.
          </span>
        </div>

        <div className={styles.myQuests}>
          <h1>Minhas missões</h1>

          <div className={styles.amountBadges}>
            <span>Total de insígnias coletadas</span>

            <p>{amountBadges}</p>
          </div>

          <div className={styles.completedQuests}>
            <span>Missões completadas</span>

            {myUsersQuests?.length ? (
              <div className={styles.myCompletedList}>
                {myUsersQuests?.map((userQuest) => (
                  <p key={userQuest.id}>
                    {userQuest.quests.amount} — {userQuest.quests.name}
                  </p>
                ))}
              </div>
            ) : (
              <p>Nenhuma missão encontrada!</p>
            )}
          </div>
        </div>

        <div className={styles.quests}>
          <h1>Missões para completar!</h1>

          {quests?.map((quest) => (
            <div key={quest.id} className={styles.quest}>
              <div className={styles.info}>
                <strong>{quest.name}</strong>
                <span>
                  <strong>Objetivo: </strong>
                  {quest.objective}
                </span>

                <span>
                  <strong>Quantidade: </strong>
                  {quest.amount}
                </span>
              </div>

              <div className={styles.reward}>
                <PermissionGate permissions={["award-quest"]}>
                  <button
                    onClick={() => {
                      handleCreateUserQuest(quest);
                    }}
                  >
                    Premiar
                  </button>
                </PermissionGate>

                <PermissionGate permissions={["view-completed"]}>
                  <button
                    onClick={() => {
                      handleCompleted(quest);
                    }}
                  >
                    Completados
                  </button>
                </PermissionGate>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog
        visible={createUserQuestDialog}
        style={{
          width: mediaQueryCreateUserQuest ? "50vw" : "100vw",
          margin: "1rem",
        }}
        header={"Premiar usuário"}
        onHide={hideDialog}
        modal
      >
        <Dropdown
          filter
          value={selectedUser}
          onChange={(e) => handleUserChange(e.value)}
          options={users.filter((user) => user.group.name === "Geek")}
          optionLabel="name"
          placeholder="Escolha um usuário"
          emptyMessage="Nenhum resultado encontrado"
          emptyFilterMessage="Nenhum usuário disponível"
          className="mb-2 w-12"
          valueTemplate={selectedUserTemplate}
          itemTemplate={userOptionTemplate}
        />

        <div className={styles.subimitDialog}>
          {selectedQuest ? (
            <button type="button" onClick={handleSubmitCreateUserQuest}>
              Premiar
            </button>
          ) : null}

          <button type="button" onClick={hideDialog}>
            Cancelar
          </button>
        </div>
      </Dialog>

      <Dialog
        header="Usuários que já completaram"
        visible={completedDialog}
        position={"top"}
        style={{
          width: mediaQueryCompletedDialog ? "50vw" : "100vw",
        }}
        onHide={() => setCompletedDialog(false)}
        draggable={false}
        resizable={false}
      >
        <div className={styles.completed}>
          {usersQuests?.length ? (
            <PermissionGate permissions={["remove-completed"]}>
              <span>Clique no sinal de menos para remover</span>
            </PermissionGate>
          ) : (
            <span>Nenhum usuário completou essa missão ainda!</span>
          )}

          {usersQuests?.length
            ? usersQuests.map((userQuest) => (
                <div className={styles.completedList}>
                  <PermissionGate permissions={["remove-completed"]}>
                    <button onClick={() => handleDeleteUserQuest(userQuest)}>
                      <Minus size={12} weight="bold" />
                    </button>
                  </PermissionGate>

                  <p>
                    {userQuest.users.name} [{userQuest.users.username}] - Missão
                    completa ✅
                  </p>
                </div>
              ))
            : null}
        </div>

        <Button
          className="mt-4"
          label="Ok"
          icon="pi pi-check"
          onClick={() => setCompletedDialog(false)}
          autoFocus
        />
      </Dialog>

      <DeleteDialog
        isOpen={deleteCompletedDialog}
        title="Remover missão deste usuário?"
        lore="Quer mesmo remover a missão completa de "
        subject={selectedUserQuest?.users.name}
        onHide={hideDialog}
        onDelete={handleSubmitDeleteUserQuest}
      />
    </DefaultLayout>
  );
}

export default Quests;
