<template>
  <div class="auth-container">
    <h2>Register</h2>
    <input type="email" placeholder="Correo" v-model="email" />
    <input type="password" placeholder="Contraseña" v-model="password" />
    <button @click="register">Registrar</button>
    <router-link to="/login">Iniciar sesión</router-link>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../store/auth";

const router = useRouter();
const store = useAuth();
const email = ref("");
const password = ref("");

async function register() {
  try {
    await store.register(email.value, password.value);
    router.push("/login");
  } catch (e: any) {
    alert(e.response?.data?.message || "Error de registro.");
  }
}
</script>
