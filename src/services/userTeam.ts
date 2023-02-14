import api from "./api";

import { IEvent } from "./event";
import { IUser } from "./authenticate";

export interface IUserTeam {
  id: number;
  nickname: string;
  team: {
    name: string;
    event: IEvent;
    user: IUser;
  };
}

export interface IUpdateUserTeamRequest {
  id: number;
  users: {
    id_user: number;
    nickname: string;
  }[];
}

export interface IUpdateUserTeamResponse {
  status: string;
  message: string;
}

export interface IUpdateNicknameRequest {
  id: number;
  nickname: string;
}

export interface IUpdateNicknameResponse {
  status: string;
  message: string;
}

export interface IDeleteUserTeamRequest {
  id: number;
}

export interface IDeleteUserTeamResponse {
  status: string;
  message: string;
}

export interface IFindUserTeamByUserIdRequest {
  id: number;
}

export interface IFindUserTeamByUserIdResponse {
  status: string;
  message?: string;
  data: IUserTeam[];
}

const updateUserTeam = async (
  params: IUpdateUserTeamRequest
): Promise<IUpdateUserTeamResponse> => {
  const { id } = params;

  const { data } = await api
    .put(`/userteam/${id}`, params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const updateNicknameUserTeam = async (
  params: IUpdateNicknameRequest
): Promise<IUpdateNicknameResponse> => {
  const { id } = params;

  const { data } = await api
    .patch(`/userteam/nickname/${id}`, params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const deleteUserTeam = async (
  params: IDeleteUserTeamRequest
): Promise<IDeleteUserTeamResponse> => {
  const { id } = params;

  const { data } = await api
    .delete(`/userteam/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const findUserTeamsByUserId = async (
  params: IFindUserTeamByUserIdRequest
): Promise<IFindUserTeamByUserIdResponse> => {
  const { id } = params;

  const { data } = await api
    .get(`/userteam/user/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export {
  findUserTeamsByUserId,
  updateUserTeam,
  updateNicknameUserTeam,
  deleteUserTeam,
};
