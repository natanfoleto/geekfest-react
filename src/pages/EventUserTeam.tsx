import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { findUsersTeams, IEventUser, IEventTeam } from "../services/event";

import DefaultLayout from "../layouts/Default";

import styles from "./EventUserTeam.module.css";

function EventUserTeam() {
  const navigate = useNavigate();

  const [eventUsers, setEventUsers] = useState<IEventUser[]>();
  const [eventTeams, setEventTeams] = useState<IEventTeam[]>();

  const [visibilityUserEvent, setVisibilityUserEvent] = useState(false);
  const [visibilityTeamEvent, setVisibilityTeamEvent] = useState(true);

  useEffect(() => {
    async function findSetUsersTeams() {
      const { status, message, data } = await findUsersTeams();

      if (status === "error") toast.error(message);
      if (status === "success") {
        setEventUsers(data.users);
        setEventTeams(data.teams);
      }
    }

    findSetUsersTeams();
  }, []);

  function handleNavigate(path: string) {
    navigate(path);
  }

  function toggleVisibilityUserEvent() {
    setVisibilityUserEvent(!visibilityUserEvent);
  }

  function toggleVisibilityTeamEvent() {
    setVisibilityTeamEvent(!visibilityTeamEvent);
  }

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Eventos | Usuários | Times</h1>
        </div>

        <div
          className={
            visibilityUserEvent ? styles.mainCardHide : styles.mainCard
          }
        >
          <h1>Inscrições Individuais</h1>
          <a className={styles.showLess} onClick={toggleVisibilityUserEvent}>
            {visibilityUserEvent ? "🔽 Mostrar mais" : "🔼 Mostar menos"}
          </a>

          {eventUsers?.map((eventUser) => (
            <div key={eventUser.id} className={styles.event}>
              <div className={styles.content}>
                <h2>{eventUser.name}</h2>

                <div className={styles.itemContent}>
                  {eventUser.user_event.length > 0 ? (
                    <>
                      <h1>
                        Jogadores Inscritos — {eventUser.user_event.length}
                      </h1>

                      {eventUser.user_event.map((userEvent) => (
                        <div>
                          <p>
                            <b>Nickname: </b>
                            {userEvent.nickname}
                          </p>
                          <p>
                            <b>Nome: </b>
                            {userEvent.user.name}
                          </p>
                          <p>
                            <b>Username: </b>
                            {userEvent.user.username}
                          </p>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p style={{ color: "#e46363" }}>
                      Nenhum jogador inscrito aqui ainda.
                    </p>
                  )}
                </div>
              </div>

              <img src={eventUser.banner_url} alt={eventUser.name} />
            </div>
          ))}
        </div>

        <div
          className={
            visibilityTeamEvent ? styles.mainCardHide : styles.mainCard
          }
        >
          <h1>Inscrições de Times</h1>
          <a className={styles.showLess} onClick={toggleVisibilityTeamEvent}>
            {visibilityTeamEvent ? "🔽 Mostrar mais" : "🔼 Mostar menos"}
          </a>

          {eventTeams?.map((eventTeam) => (
            <div key={eventTeam.id} className={styles.event}>
              <div className={styles.content}>
                <h2>{eventTeam.name}</h2>

                <div className={styles.itemContent}>
                  {eventTeam.team.length > 0 ? (
                    <>
                      <h1>Times Inscritos — {eventTeam.team.length}</h1>

                      {eventTeam.team.map((teamEvent) => (
                        <div className={styles.team}>
                          <div>
                            <p>
                              <b>Nome: </b>
                              {teamEvent.name}
                            </p>
                            <p>
                              <b>Capitão: </b>
                              {teamEvent.user.name}
                            </p>
                            <p>
                              <b>Username do Capitão: </b>
                              {teamEvent.user.username}
                            </p>
                          </div>

                          <div className={styles.players}>
                            {teamEvent.user_team.length > 0 ? (
                              <>
                                <strong>Membros do time</strong>

                                {teamEvent.user_team.map((userTeam, idx) => (
                                  <div className={styles.player}>
                                    {idx + 1} — <b>Nickname:</b>
                                    {userTeam.nickname} <b>Nome:</b>{" "}
                                    {userTeam.user.name} <b>Username:</b>{" "}
                                    {userTeam.user.username}
                                  </div>
                                ))}
                              </>
                            ) : (
                              <p style={{ color: "#e46363" }}>
                                Nenhum membro no time ainda
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p style={{ color: "#e46363" }}>
                      Nenhum time inscrito aqui ainda.
                    </p>
                  )}
                </div>
              </div>

              <img src={eventTeam.banner_url} alt={eventTeam.name} />
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default EventUserTeam;
