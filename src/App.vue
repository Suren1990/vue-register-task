<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="max-w-[30rem] w-[100%] mx-auto my-4">
      <nav class="flex justify-center gap-4 mb-5">
        <RouterLink to="/" class="text-xl" active-class=" underline text-green-500 underline-offset-[6px]">Login</RouterLink>
        <RouterLink to="/register" class="text-xl" active-class=" underline text-green-500 underline-offset-[6px]">
          Register</RouterLink>
      </nav>
    </div>
  </header>

  <div class="max-w-[60rem] w-[100%] mx-auto">
    <RouterView />
  </div>
</template>
