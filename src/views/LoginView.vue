<template>
  <AuthLayout>
    <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
    <input type="email" placeholder="Correo" v-model="email" />
    <input type="password" placeholder="Contraseña" v-model="password" />
    <button class="btn btn-primary w-full mt-3" @click="login">Entrar</button>
    <router-link class="link link-primary text-center mt-2 block" to="/register"
      >Crear cuenta</router-link
    >
  </AuthLayout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../store/auth";
import AuthLayout from "../layouts/AuthLayout.vue";

const router = useRouter();
const store = useAuth();
const email = ref("");
const password = ref("");

async function login() {
  try {
    await store.login(email.value, password.value);
    router.push("/dashboard");
  } catch (e: any) {
    alert(e.response?.data?.message || "Error de inicio de sesión.");
  }
}
</script>
