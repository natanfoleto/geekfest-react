import api from "./api";

export interface IAttraction {
  id: number;
  name: string;
  description: string;
  banner_url: string | null;
}

export interface ICreateAttractionRequest {
  name: string;
  description: string;
  bannerUrl?: string;
}

export interface ICreateAttractionResponse {
  status: string;
  message: string;
  data: IAttraction;
}

export interface IUpdateAttractionRequest {
  id: number;
  name: string;
  description: string;
  bannerUrl?: string;
}

export interface IUpdateAttractionResponse {
  status: string;
  message: string;
}

export interface IDeleteAttractionRequest {
  id: number;
}

export interface IDeleteAttractionResponse {
  status: string;
  message: string;
}

export interface IFindAllAttractionsResponse {
  status: string;
  message?: string;
  data: IAttraction[];
}

const createAttraction = async (
  params: ICreateAttractionRequest
): Promise<ICreateAttractionResponse> => {
  const { data } = await api
    .post("/attraction", params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const updateAttraction = async (
  params: IUpdateAttractionRequest
): Promise<IUpdateAttractionResponse> => {
  const { id } = params;

  const { data } = await api
    .put(`/attraction/${id}`, params)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const deleteAttraction = async (
  params: IDeleteAttractionRequest
): Promise<IDeleteAttractionResponse> => {
  const { id } = params;

  const { data } = await api
    .delete(`/attraction/${id}`)
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

const findAllAttractions = async (): Promise<IFindAllAttractionsResponse> => {
  const { data } = await api
    .get("/attraction")
    .then((response) => response)
    .catch((err) => err.response);

  if (!data) console.log("Houve um erro inesperado.");

  return data;
};

export {
  findAllAttractions,
  createAttraction,
  updateAttraction,
  deleteAttraction,
};
