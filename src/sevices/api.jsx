import axios from "axios";
const token = localStorage.getItem("karg_atelier_token");

const instance = axios.create({
  baseURL: "https://localhost:44356/api/",
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  },
});

export default {
  API_Authentication: (data) =>
    instance({
      method: "POST",
      url: `Authentication`,
      data: data,
    }),

  API_GetRole: (data) =>
    instance({
      method: "GET",
      url: `Role`,
      data: data,
    }),

  API_GetUsers: (roleId) =>
    instance({
      method: "GET",
      url: `User?roleId=` + roleId,
    }),

  API_DeleteUser: (userId) =>
    instance({
      method: "DELETE",
      url: `Admin/${userId}`,
    }),

  API_DeleteAtelierBase: (atelierBaseId) =>
    instance({
      method: "DELETE",
      url: `AtelierBase/${atelierBaseId}`,
    }),

  API_DeleteBranch: (branchId) =>
    instance({
      method: "DELETE",
      url: `Branch/${branchId}`,
    }),

  API_PostAtelierChangeStatus: (atelierId) =>
    instance({
      method: "POST",
      url: `AtelierBase/ChangeStatus/${atelierId}`,
    }),
  API_PostBranchChangeStatus: (branchId) =>
    instance({
      method: "POST",
      url: `/Branch/ChangeStatus/${branchId}`,
    }),

  API_PostAdmin: (data) =>
    instance({
      method: "POST",
      url: `Admin`,
      data: data,
    }),

  API_PostBranch: (data) =>
    instance({
      method: "POST",
      url: `Branch`,
      data: data,
    }),

  API_PostAtelier: (data) =>
    instance({
      method: "POST",
      url: `AtelierBase`,
      data: data,
    }),

  API_Ateliers: (symbol) =>
    instance({
      method: "GET",
      url: "AtelierBase",
      params: {
        outputsize: "compact",
        datatype: "json",
        function: "TIME_SERIES_DAILY_ADJUSTED",
        symbol: symbol.toUpperCase(),
      },
    }),

  API_Branches: (symbol) =>
    instance({
      method: "GET",
      url: `Branch/${symbol}`,
    }),
};
