import api from "./api";

import { IEvent } from "./event";

export interface IUserEvent {
  id: number;
  nickname: string;
  event: IEvent;
}

export interface ICreateUserEventRequest {
  id_user: number;
  id_event: number;
  nickname: string;
}

export interface ICreateUserEventResponse {
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

export interface IDeleteUserEventRequest {
  id: number;
}

export interface IDeleteUserEventResponse {
  status: string;
  message: string;
}

export interface IFindUserEventsByUserIdRequest {
  id: number;
}

export interface IFindUserEventsByUserIdResponse {
  status: string;
  message?: string;
  data: IUserEvent[];
}

const createUserEvent = async (
  params: ICreateUserEventRequest
): Promise<ICreateUserEventResponse> => {
  const { data } = await api
    .post("/userevent", params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const updateNicknameUserEvent = async (
  params: IUpdateNicknameRequest
): Promise<IUpdateNicknameResponse> => {
  const { id } = params;

  const { data } = await api
    .patch(`/userevent/nickname/${id}`, params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const deleteUserEvent = async (
  params: IDeleteUserEventRequest
): Promise<IDeleteUserEventResponse> => {
  const { id } = params;

  const { data } = await api
    .delete(`/userevent/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const deleteUserEventByUserId = async (
  params: IDeleteUserEventRequest
): Promise<IDeleteUserEventResponse> => {
  const { id } = params;

  const { data } = await api
    .delete(`/userevent/user/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const findUserEventsByUserId = async (
  params: IFindUserEventsByUserIdRequest
): Promise<IFindUserEventsByUserIdResponse> => {
  const { id } = params;

  const { data } = await api
    .get(`/userevent/user/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export {
  findUserEventsByUserId,
  createUserEvent,
  updateNicknameUserEvent,
  deleteUserEvent,
  deleteUserEventByUserId,
};
