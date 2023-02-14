import api from "./api";

import { IQuest } from "./quest";
import { IUser } from "./user";

export interface IUserQuest {
  id: number;
  users: IUser;
  quests: IQuest;
}

export interface ICreateUserQuestRequest {
  id_user: number;
  id_quest: number;
}

export interface ICreateUserQuestResponse {
  status: string;
  message: string;
}

export interface IDeleteUserQuestRequest {
  id: number;
}

export interface IDeleteUserQuestResponse {
  status: string;
  message: string;
}

export interface IFindUserQuestsByUserIdRequest {
  id: number;
}

export interface IFindUserQuestsByUserIdResponse {
  status: string;
  message?: string;
  data: IUserQuest[];
}

export interface IFindUserQuestsByQuestIdRequest {
  id: number;
}

export interface IFindUserQuestsByQuestIdResponse {
  status: string;
  message?: string;
  data: IUserQuest[];
}

export interface IGetAmountBadgesByUserIdRequest {
  id: number;
}

export interface IGetAmountBadgesByUserIdResponse {
  status: string;
  message?: string;
  data: {
    amount: number;
  };
}

const createUserQuest = async (
  params: ICreateUserQuestRequest
): Promise<ICreateUserQuestResponse> => {
  const { data } = await api
    .post("/userquest", params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const deleteUserQuest = async (
  params: IDeleteUserQuestRequest
): Promise<IDeleteUserQuestResponse> => {
  const { id } = params;

  const { data } = await api
    .delete(`/userquest/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const deleteUserQuestByUserId = async (
  params: IDeleteUserQuestRequest
): Promise<IDeleteUserQuestResponse> => {
  const { id } = params;

  const { data } = await api
    .delete(`/userquest/user/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const findUserQuestsByUserId = async (
  params: IFindUserQuestsByUserIdRequest
): Promise<IFindUserQuestsByUserIdResponse> => {
  const { id } = params;

  const { data } = await api
    .get(`/userquest/user/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const findUserQuestsByQuestId = async (
  params: IFindUserQuestsByQuestIdRequest
): Promise<IFindUserQuestsByQuestIdResponse> => {
  const { id } = params;

  const { data } = await api
    .get(`/userquest/quest/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const getAmountBadgesByUserId = async (
  params: IGetAmountBadgesByUserIdRequest
): Promise<IGetAmountBadgesByUserIdResponse> => {
  const { id } = params;

  const { data } = await api
    .get(`/userquest/amount/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export {
  findUserQuestsByUserId,
  findUserQuestsByQuestId,
  getAmountBadgesByUserId,
  createUserQuest,
  deleteUserQuest,
  deleteUserQuestByUserId,
};
