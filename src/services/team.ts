import api from "./api";

import { IEvent } from "./event";
import { IUser } from "./user";

export interface ITeam {
  id: number;
  name: string;
  event: IEvent;
  user: IUser;
  user_team: IMembersTeam[];
}

export interface IMembersTeam {
  nickname: string;
  user: IUser;
}

export interface ICreateTeamRequest {
  name: string;
  id_event: number;
  id_user: number;
}

export interface ICreateTeamResponse {
  status: string;
  message: string;
  data: ITeam;
}

export interface IUpdateTeamRequest {
  id: number;
  name: string;
  id_event: number;
}

export interface IUpdateTeamResponse {
  status: string;
  message: string;
}

export interface IDeleteTeamRequest {
  id: number;
}

export interface IDeleteTeamResponse {
  status: string;
  message: string;
}

export interface IFindAllTeamsResponse {
  status: string;
  message?: string;
  data: ITeam[];
}

export interface IFindTeamsByUserIdRequest {
  id: number;
}

export interface IFindTeamsByUserIdResponse {
  status: string;
  message?: string;
  data: ITeam[];
}

const createTeam = async (
  params: ICreateTeamRequest
): Promise<ICreateTeamResponse> => {
  const { data } = await api
    .post("/team", params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const updateTeam = async (
  params: IUpdateTeamRequest
): Promise<IUpdateTeamResponse> => {
  const { id } = params;

  const { data } = await api
    .put(`/team/${id}`, params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const deleteTeam = async (
  params: IDeleteTeamRequest
): Promise<IDeleteTeamResponse> => {
  const { id } = params;

  const { data } = await api
    .delete(`/team/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const findAllTeams = async (): Promise<IFindAllTeamsResponse> => {
  const { data } = await api
    .get("/team")
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const findTeamsByUserId = async (
  params: IFindTeamsByUserIdRequest
): Promise<IFindTeamsByUserIdResponse> => {
  const { id } = params;

  const { data } = await api
    .get(`/team/user/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export { findAllTeams, findTeamsByUserId, createTeam, updateTeam, deleteTeam };
