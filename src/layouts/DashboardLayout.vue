<template>
  <div class="min-h-screen bg-base-100">
    <header class="navbar bg-primary text-primary-content shadow-md px-6">
      <div class="flex-1">
        <h1 class="text-lg font-bold">SaaS Cómputo</h1>
      </div>
      <div class="flex-none">
        <slot name="nav" />
      </div>
    </header>
    <main class="p-6">
      <slot />
    </main>
  </div>
</template>
