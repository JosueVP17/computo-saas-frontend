import { defineStore } from "pinia";
import http from "../api/http";

export const useAuth = defineStore("auth", {
  state: () => ({
    user: null as any,
    token: localStorage.getItem("token") || "",
  }),
  actions: {
    async register(email: string, password: string) {
      const res = await http.post("/auth/register", { email, password });
      this.user = res.data.user;
      this.token = res.data.token;
      alert("Registro exitoso.");
    },
    async login(email: string, password: string) {
      const res = await http.post("/auth/login", { email, password });
      this.user = res.data.user;
      this.token = res.data.token;
      localStorage.setItem("token", this.token);
    },
    logout() {
      this.user = null;
      this.token = "";
      localStorage.removeItem("token");
      window.location.reload();
    },
  },
});
