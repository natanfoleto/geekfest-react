import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

import { Plus, Minus } from "phosphor-react";

import { useAuth } from "../contexts/authentication";

import { DeleteDialog } from "../components/DeleteDialog";
import { TeamInfoModal } from "../components/TeamInfoModal";

import useMediaQuery from "../hooks/useMediaQuery";

import {
  ITeam,
  IMembersTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  findTeamsByUserId,
} from "../services/team";

import {
  IUserTeam,
  updateUserTeam,
  findUserTeamsByUserId,
} from "../services/userTeam";

import {
  IUserEvent,
  createUserEvent,
  updateNicknameUserEvent,
  deleteUserEvent,
  deleteUserEventByUserId,
  findUserEventsByUserId,
} from "../services/userEvent";

import { IUser, findAllUsers } from "../services/user";
import { IEvent, findAllEvents } from "../services/event";

import DefaultLayout from "../layouts/Default";

import styles from "./Registrations.module.css";

function Team() {
  const { user } = useAuth();

  // - Entities
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null);
  const [members, setMembers] = useState<IMembersTeam[]>([]);

  const [usersTeams, setUsersTeams] = useState<IUserTeam[]>([]);
  const [selectedUserTeam, setSelectedUserTeam] = useState<IUserTeam | null>(
    null
  );

  const [usersEvents, setUsersEvents] = useState<IUserEvent[]>([]);
  const [selectedUserEvent, setSelectedUserEvent] = useState<IUserEvent | null>(
    null
  );

  // - States
  const [users, setUsers] = useState<IUser[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [eventsByType, setEventsByType] = useState<IEvent[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>();
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>();

  const [doneRequest, setDoneRequest] = useState(false);
  const [teamDialog, setTeamDialog] = useState(false);
  const [deleteTeamDialog, setDeleteTeamDialog] = useState(false);
  const [userEventDialog, setUserEventDialog] = useState(false);
  const [deleteUserEventDialog, setDeleteUserEventDialog] = useState(false);
  const [deleteAllUserEventDialog, setDeleteAllUserEventDialog] =
    useState(false);
  const [teamInfoModal, setTeamInfoModal] = useState(false);

  // - Labels
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  const mediaQueryTeamDialog = useMediaQuery("(min-width: 1000px)");
  const mediaQueryUserEventDialog = useMediaQuery("(min-width: 750px)");

  useEffect(() => {
    async function findSetTeamsByUserId() {
      const id = user?.id;

      if (id) {
        const { status, message, data } = await findTeamsByUserId({ id });

        if (status === "error") toast.error(message);
        if (status === "success") setTeams(data);
      }
    }

    async function findSetUserTeamsByUserId() {
      const id = user?.id;

      if (id) {
        const { status, message, data } = await findUserTeamsByUserId({ id });

        if (status === "error") toast.error(message);
        if (status === "success") setUsersTeams(data);
      }
    }

    async function findSetUserEventsByUserId() {
      const id = user?.id;

      if (id) {
        const { status, message, data } = await findUserEventsByUserId({ id });

        if (status === "error") toast.error(message);
        if (status === "success") setUsersEvents(data);
      }
    }

    async function findSetUsers() {
      const { status, message, data } = await findAllUsers();

      if (status === "error") toast.error(message);
      if (status === "success") setUsers(data);
    }

    async function findSetEvents() {
      const { status, message, data } = await findAllEvents();

      if (status === "error") toast.error(message);
      if (status === "success") setEvents(data);
    }

    findSetTeamsByUserId();
    findSetUserTeamsByUserId();
    findSetUserEventsByUserId();
    findSetUsers();
    findSetEvents();
  }, [doneRequest]);

  // - Funções Team

  async function handleSubmitCreateTeam(event: FormEvent) {
    event.preventDefault();

    if (!selectedEvent) {
      toast.error("Selecione um evento ou competição!");

      return;
    }

    const id_user = user?.id;

    if (id_user) {
      const { status, message } = await createTeam({
        name,
        id_event: selectedEvent.id,
        id_user,
      });

      if (status === "success") toast.success(message);
      if (status === "error") toast.error(message);

      clearAll();
      hideDialog();
      setDoneRequest(!doneRequest);
    }
  }

  async function handleSubmitEditTeam(event: FormEvent) {
    event.preventDefault();

    if (!selectedEvent) {
      toast.error("Selecione um evento ou competição!");

      return;
    }

    const id = selectedTeam?.id;

    if (id) {
      const users = members.map((member) => {
        return { id_user: member.user.id, nickname: member.nickname };
      });

      if (users.length > selectedEvent.max) {
        toast.error(`O time tem apenas ${selectedEvent.max} vagas 😕`);

        return;
      }

      const { status, message } = await updateTeam({
        id,
        name,
        id_event: selectedEvent.id,
      });

      const res = await updateUserTeam({
        id,
        users,
      });

      if (status === "error") toast.error(message);
      if (status === "success") {
        toast.success(message);
      }

      if (res.status === "error") toast.error(res.message);

      clearAll();
      hideDialog();
      setDoneRequest(!doneRequest);
    }
  }

  async function handleSubmitDeleteTeam() {
    const id = selectedTeam?.id;

    if (id) {
      const { status, message } = await deleteTeam({
        id,
      });

      if (status === "success") toast.success(message);
      if (status === "error") toast.error(message);

      clearAll();
      hideDialog();
      setDoneRequest(!doneRequest);
    }
  }

  function handleCreateTeam() {
    clearAll();
    setEventsByType(events.filter((event) => event.type === 2));

    setTeamDialog(true);
  }

  function handleEditTeam(team: ITeam) {
    setName(team.name);
    setSelectedEvent(team.event);
    setSelectedTeam(team);
    setMembers(team.user_team);

    setEventsByType(events.filter((event) => event.type === 2));

    setTeamDialog(true);
  }

  function handleDeleteTeam() {
    setDeleteTeamDialog(true);
  }

  function addMemberToTeam() {
    if (!selectedUser) {
      toast.error("Selecione um usuário!");
      return;
    }

    const memberFound = members.filter(
      (item) => item.user.id === selectedUser?.id
    );

    if (memberFound.length > 0) {
      toast.error(selectedUser?.name + " já é membro do time.");
      return;
    }

    const nicknameFound = members.filter((item) => item.nickname === nickname);

    if (nicknameFound.length > 0) {
      toast.error("Já tem um membro com esse nickname.");
      return;
    }

    if (!nickname) {
      toast.error("Escolha um nickname!");
      return;
    }

    setMembers([
      ...members,
      {
        nickname,
        user: selectedUser,
      },
    ]);
  }

  function removeTeamMember(id: number) {
    setMembers((member) => member.filter((item) => item.user.id !== id));
  }

  // - Funções UserEvent

  async function handleSubmitCreateUserEvent(event: FormEvent) {
    event.preventDefault();

    if (!selectedEvent) {
      toast.error("Selecione um evento ou competição!");

      return;
    }

    const id_user = user?.id;

    if (id_user) {
      const { status, message } = await createUserEvent({
        nickname,
        id_user,
        id_event: selectedEvent.id,
      });

      if (status === "success") toast.success(message);
      if (status === "error") toast.error(message);

      clearAll();
      hideDialog();
      setDoneRequest(!doneRequest);
    }
  }

  async function handleSubmitEditUserEvent(event: FormEvent) {
    event.preventDefault();

    const id = selectedUserEvent?.id;

    if (id) {
      const { status, message } = await updateNicknameUserEvent({
        id,
        nickname,
      });

      if (status === "error") toast.error(message);
      if (status === "success") {
        toast.success(message);
      }

      clearAll();
      hideDialog();
      setDoneRequest(!doneRequest);
    }
  }

  async function handleSubmitDeleteUserEvent() {
    const id = selectedUserEvent?.id;

    if (id) {
      const { status, message } = await deleteUserEvent({
        id,
      });

      if (status === "success") toast.success(message);
      if (status === "error") toast.error(message);

      clearAll();
      hideDialog();
      setDoneRequest(!doneRequest);
    }
  }

  async function handleSubmitDeleteAllUserEvent() {
    const id = user?.id;

    if (id) {
      const { status, message } = await deleteUserEventByUserId({
        id,
      });

      if (status === "success") toast.success(message);
      if (status === "error") toast.error(message);

      clearAll();
      hideDialog();
      setDoneRequest(!doneRequest);
    }
  }

  function handleCreateUserEvent() {
    clearAll();
    setEventsByType(events.filter((event) => event.type === 1));

    setUserEventDialog(true);
  }

  function handleEditUserEvent(userEvent: IUserEvent) {
    setSelectedUserEvent(userEvent);
    setSelectedEvent(userEvent.event);
    setNickname(userEvent.nickname);
    setUserEventDialog(true);
  }

  function handleDeleteUserEvent() {
    setDeleteUserEventDialog(true);
  }

  function handleAllDeleteUserEvent() {
    setDeleteAllUserEventDialog(true);
  }

  // - Funções UserTeam

  function handleTeamInfo() {
    setTeamInfoModal(!teamInfoModal);
  }

  function onDoneRequest() {
    setDoneRequest(!doneRequest);
  }

  // - Funções Gerais

  function hideDialog() {
    setTeamDialog(false);
    setDeleteTeamDialog(false);
    setUserEventDialog(false);
    setDeleteUserEventDialog(false);
    setDeleteAllUserEventDialog(false);
  }

  function clearLabels() {
    setName("");
    setNickname("");
  }

  function clearStates() {
    setSelectedUser(null);
    setSelectedEvent(null);
    setEventsByType([]);
  }

  function clearEntities() {
    setSelectedTeam(null);
    setMembers([]);
    setSelectedUserTeam(null);
    setSelectedUserEvent(null);
  }

  function clearAll() {
    clearEntities();
    clearStates();
    clearLabels();
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setName(event.target.value);
  }

  function handleNicknameChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNickname(event.target.value);
  }

  function handleUserChange(value: IUser) {
    setSelectedUser(value);
  }

  function handleEventChange(value: IEvent) {
    setSelectedEvent(value);
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
        <div>{option.name}</div>
      </div>
    );
  };

  const selectedEventTemplate = (option: IEvent, props: any) => {
    if (option) {
      return (
        <div>
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const eventOptionTemplate = (option: IEvent) => {
    return (
      <div>
        <div>{option.name}</div>
      </div>
    );
  };

  function checkTeamEligibility(team: ITeam) {
    const nMembers = team.user_team.length;

    if (nMembers < team.event.min) return false;
    if (nMembers > team.event.max) return false;

    return true;
  }

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <aside className={styles.aside}>
          <button onClick={handleCreateTeam}>Criar Time</button>
          <button onClick={handleCreateUserEvent}>Inscrever-se</button>
        </aside>

        <main className={styles.main}>
          <div className={styles.card}>
            <h2>Minhas inscrições</h2>

            <p>
              <strong>IMPORTANTE! </strong>
              Para participar, o time precisa estar elegível. Para isso
              acontecer, a quantidade de membros do time precisa estar dentro
              dos requisitos de cada evento ou competição.
            </p>
            <br />
            <p>
              Como saber se meu time está elegível ou não? É muito simples...
            </p>
            <br />
            <p>🟢 ➝ Elegível</p>
            <p>🔴 ➝ Não Elegível</p>
          </div>

          <div className={styles.card}>
            <h2>Inscrições de times</h2>

            <div className={styles.teams}>
              <h3>Times criado por min</h3>

              {teams?.length ? (
                <div className={styles.teamsHeader}>
                  <p>Nome do Time</p>
                  <p>Evento ou competição</p>
                </div>
              ) : (
                <p>Você não é capitão de nenhum time</p>
              )}

              {teams?.map((team) => (
                <div
                  key={team.id}
                  className={styles.team}
                  onClick={() => handleEditTeam(team)}
                >
                  <p>
                    {team.name}
                    {!checkTeamEligibility(team) ? (
                      <span> 🔴</span>
                    ) : (
                      <span> 🟢</span>
                    )}
                  </p>

                  <p>{team.event.name}</p>
                </div>
              ))}

              <div className={styles.buttonCard}>
                <button
                  className={styles.teamsButton}
                  onClick={handleCreateTeam}
                >
                  Criar Time
                </button>
              </div>
            </div>

            <div className={styles.usersTeams}>
              <h3>Times que estou participando</h3>

              {usersTeams?.length ? (
                <div className={styles.usersTeamsHeader}>
                  <p>Evento ou competição</p>
                  <p>⟦Nome do time⟧ • ⟦Meu nickname⟧ </p>
                </div>
              ) : (
                <p>Você não está inserido em nenhum time</p>
              )}

              {usersTeams?.map((userTeam) => (
                <div
                  key={userTeam.id}
                  className={styles.userTeam}
                  onClick={() => {
                    setSelectedUserTeam(userTeam);
                    handleTeamInfo();
                  }}
                >
                  <p>{userTeam.team.event.name}</p>

                  <p>
                    ⟦{userTeam.team.name}⟧ • ⟦{userTeam.nickname}⟧
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h2>Inscrições individuias</h2>

            <div className={styles.usersEvents}>
              <h3>Meus eventos e competições</h3>

              {usersEvents?.length ? (
                <div className={styles.usersEventsHeader}>
                  <p>Evento ou competição</p>
                  <p>Meu nickname</p>
                </div>
              ) : (
                <p>Você não tem nenhuma inscrição individual</p>
              )}

              {usersEvents?.map((userEvent) => (
                <div
                  key={userEvent.id}
                  className={styles.userEvent}
                  onClick={() => handleEditUserEvent(userEvent)}
                >
                  <p>{userEvent.event.name}</p>
                  <p>{userEvent.nickname}</p>
                </div>
              ))}

              <div className={styles.buttonCard}>
                <button
                  className={styles.usersEventsSubscribe}
                  onClick={handleCreateUserEvent}
                >
                  Inscrever-se
                </button>

                <button
                  className={styles.usersEventsDelete}
                  onClick={handleAllDeleteUserEvent}
                  disabled={!usersEvents.length}
                >
                  Excluir todas
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Dialog
        visible={teamDialog}
        style={{
          width: mediaQueryTeamDialog ? "50vw" : "100vw",
          margin: "1rem",
        }}
        header={selectedTeam ? selectedTeam.name : "Novo time"}
        onHide={hideDialog}
        modal
      >
        <form
          onSubmit={
            selectedTeam ? handleSubmitEditTeam : handleSubmitCreateTeam
          }
          className={styles.form}
        >
          {selectedTeam ? (
            <>
              {!checkTeamEligibility(selectedTeam) ? (
                <>
                  <span>🔴 ➭ Este time está inelegível</span>

                  <br />

                  {selectedEvent && (
                    <div className={styles.rules}>
                      <span>
                        {members.length}/{selectedEvent.max}《
                        {selectedEvent.name}》
                      </span>
                      <p>Mínimo de membros ⇛ {selectedEvent.min}</p>
                      <p>Máximo de membros ⇛ {selectedEvent.max}</p>
                      <p>
                        Número de membros do seu time ⇛{" "}
                        {selectedTeam?.user_team.length}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <span>🟢 ➭ Este time está elegível</span>
                  <br />
                  <span>
                    Lotação do time {members.length}/{selectedEvent?.max}
                  </span>
                </>
              )}
            </>
          ) : null}

          <br />

          <input
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className={styles.input}
            placeholder="Nome do time"
            required
          />

          <Dropdown
            filter
            value={selectedEvent}
            onChange={(e) => handleEventChange(e.value)}
            options={eventsByType}
            optionLabel="name"
            placeholder="Escolha um evento ou competição"
            emptyMessage="Nenhum resultado encontrado"
            emptyFilterMessage="Nenhum evento ou competição disponível"
            className="mb-2"
            valueTemplate={selectedEventTemplate}
            itemTemplate={eventOptionTemplate}
          />

          {selectedTeam ? (
            <>
              {members.length ? (
                <label htmlFor="users">Membros do time</label>
              ) : (
                <label htmlFor="users">Não há membros nesse time</label>
              )}

              <div className={styles.members}>
                {members.map((member) => (
                  <div key={member.user.id} className={styles.membersTeam}>
                    <p>{member.nickname}</p>
                    <p>{member.user.name}</p>
                    <button
                      type="button"
                      onClick={() => removeTeamMember(member.user.id)}
                    >
                      <Minus size={12} weight="bold" />
                    </button>
                  </div>
                ))}
              </div>

              <div className={styles.addMember}>
                <Dropdown
                  filter
                  value={selectedUser}
                  onChange={(e) => handleUserChange(e.value)}
                  options={users}
                  optionLabel="name"
                  placeholder="Escolha um usuário"
                  emptyMessage="Nenhum resultado encontrado"
                  emptyFilterMessage="Nenhum usuário disponível"
                  className="w-12"
                  valueTemplate={selectedUserTemplate}
                  itemTemplate={userOptionTemplate}
                />

                <input
                  name="nickname"
                  type="text"
                  value={nickname}
                  onChange={handleNicknameChange}
                  className={styles.input}
                  placeholder="Nickname"
                />

                <button type="button" onClick={addMemberToTeam}>
                  <Plus size={16} weight="bold" />
                </button>
              </div>
            </>
          ) : null}

          <div className={styles.subimitDialog}>
            {selectedTeam ? (
              <button
                type="button"
                className={styles.deleteSubmit}
                onClick={handleDeleteTeam}
              >
                Excluir
              </button>
            ) : null}

            <button type="button" onClick={hideDialog}>
              Cancelar
            </button>

            <button type="submit">Salvar</button>
          </div>
        </form>
      </Dialog>

      <Dialog
        visible={userEventDialog}
        style={{
          width: mediaQueryUserEventDialog ? "50vw" : "100vw",
          margin: "1rem",
        }}
        header={selectedUserEvent ? "Editar Nickname" : "Inscrever-se"}
        onHide={hideDialog}
        modal
      >
        <form
          onSubmit={
            selectedUserEvent
              ? handleSubmitEditUserEvent
              : handleSubmitCreateUserEvent
          }
          className={styles.form}
        >
          <input
            name="nickname"
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            className={styles.input}
            placeholder="Seu nickname"
          />

          {!selectedUserEvent ? (
            <Dropdown
              filter
              value={selectedEvent}
              onChange={(e) => handleEventChange(e.value)}
              options={eventsByType}
              optionLabel="name"
              placeholder="Escolha um evento ou competição"
              emptyMessage="Nenhum resultado encontrado"
              emptyFilterMessage="Nenhum evento ou competição disponível"
              className="mb-2"
              valueTemplate={selectedEventTemplate}
              itemTemplate={eventOptionTemplate}
            />
          ) : null}

          <div className={styles.subimitDialog}>
            {selectedUserEvent ? (
              <button
                type="button"
                className={styles.deleteSubmit}
                onClick={handleDeleteUserEvent}
              >
                Excluir
              </button>
            ) : null}

            <button type="button" onClick={hideDialog}>
              Cancelar
            </button>

            <button type="submit">Salvar</button>
          </div>
        </form>
      </Dialog>

      <DeleteDialog
        isOpen={deleteTeamDialog}
        title="Deletar Time?"
        lore="Deseja mesmo apagar o "
        subject={selectedTeam?.name}
        onHide={hideDialog}
        onDelete={handleSubmitDeleteTeam}
      />

      <DeleteDialog
        isOpen={deleteUserEventDialog}
        title="Deletar Inscrição?"
        lore="Deseja mesmo cancelar a incrição no "
        subject={selectedUserEvent?.event.name}
        onHide={hideDialog}
        onDelete={handleSubmitDeleteUserEvent}
      />

      <DeleteDialog
        isOpen={deleteAllUserEventDialog}
        title="Deletar todas inscrições?"
        lore="Quer mesmo deletar todas as suas inscrições"
        onHide={hideDialog}
        onDelete={handleSubmitDeleteAllUserEvent}
      />

      <TeamInfoModal
        isOpen={teamInfoModal}
        onClose={handleTeamInfo}
        userTeam={selectedUserTeam}
        onDoneRequest={onDoneRequest}
      />
    </DefaultLayout>
  );
}

export default Team;
