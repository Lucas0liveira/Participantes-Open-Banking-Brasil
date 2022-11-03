import axios from "axios";

const SANDBOX =
  "https://data.sandbox.directory.openbankingbrasil.org.br/participants";
const PRODUCTION =
  "https://data.directory.openbankingbrasil.org.br/participants";
const OPINBRASIL =
  "https://data.sandbox.directory.opinbrasil.org.br/participants";

export const fetchFromSandbox = async (params) => {
  const { data } = await axios.get(SANDBOX, { params });
  return data;
};

export const fetchFromProduction = async (params) => {
  const { data } = await axios.get(PRODUCTION, { params });
  return data;
};

export const fetchFromOPINBrasil = async (params) => {
  const { data } = await axios.get(OPINBRASIL, { params });
  return data;
};
