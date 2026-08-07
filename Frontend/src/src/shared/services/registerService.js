import apiClient from "./apiClient";

export async function submitRegister(payload) {
  const { data } = await apiClient.post("/api/Register", payload);
  return data;
}
