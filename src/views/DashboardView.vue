<template>
  <DashboardLayout>
    <template #nav>
      <button class="btn btn-secondary btn-sm mx-2" @click="logout">
        Salir
      </button>
    </template>

    <div class="mb-4 flex items-center gap-4">
      <progress class="progress progress-primary w-56" :value="used" max="3" />
      <span>{{ used }}/3 projectos</span>
    </div>

    <div class="card bg-base-100 mb-6 p-4 shadow">
      <h3 class="font-semibold mb-2">Nuevo Proyecto</h3>
      <input
        v-model="name"
        placeholder="Nombre"
        type="text"
        class="input input-bordered w-full mb-2"
      />
      <textarea
        v-model="desc"
        placeholder="Descripción"
        class="textarea textarea-bordered w-full mb-2"
      ></textarea>
      <button class="btn btn-primary w-full" @click="create">
        Crear proyecto
      </button>
    </div>

    <table class="table w-full">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in projects" :key="p.id">
          <td>{{ p.name }}</td>
          <td>{{ p.descripcion }}</td>
        </tr>
      </tbody>
    </table>
  </DashboardLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import http from "../api/http";
import { useAuth } from "../store/auth";
import DashboardLayout from "../layouts/DashboardLayout.vue";

const store = useAuth();
const projects = ref<any[]>([]);
const name = ref("");
const desc = ref("");

const limitReached = computed(() =>
  store.user?.plan === "FREE" ? 3 : Infinity
);
const used = computed(() => Math.min(projects.value.length, 3));

async function load() {
  const res = await http.get("/proyects");
  projects.value = res.data.data;
  if (store.user) {
    store.user.plan = res.data.plan;
  }
}

async function create() {
  if (projects.value.length >= limitReached.value) {
    alert("Límite de plan FREE alcanzado.");
    return;
  }

  await http.post("/projects", {
    name: name.value,
    desc: desc.value,
  });

  name.value = "";
  desc.value = "";
  await load();
}

function logout() {
  store.logout();
}

onMounted(load);
</script>
