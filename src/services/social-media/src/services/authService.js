import { api } from "./api";

export async function registerUser({ username, password }) {
    return api.post("/auth/register", { username, password });
}

export async function loginUser({ username, password }) {
    return api.post("/auth/login", { username, password });
}
