<script setup>
import { onMounted, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email, maxLength, minLength } from '@vuelidate/validators'
import { useRouter } from 'vue-router';

const router = useRouter();

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(2), maxLength: maxLength(20) },
};

const loginFormData = reactive({
  email: '',
  password: '',
})

const v$ = useVuelidate(rules, loginFormData);

const loginSubmit = async () => {
  const result = await v$.value.$validate();

  if (result) {
    localStorage.setItem('token', JSON.stringify(true));
    router.push({name: 'dashboard'});
  }
}

onMounted(() => {
  const userLogined = JSON.parse(localStorage.getItem('loginData'));

  if (userLogined) {
    loginFormData.email = userLogined.email;
    loginFormData.password = userLogined.password;
  }
});

</script>

<template>
  <div class="max-w-[30rem] w-full mx-auto">
    <h1 class="mb-4 text-3xl font-bold text-center">Login</h1>
    <form @submit.prevent="loginSubmit" class="flex flex-col p-3 border border-green-500 rounded-xl">
      <label class="mb-4">
        <span class="mb-2 block text-xl font-bold">Email</span>
        <input v-model="loginFormData.email" type="text"
          class="w-full p-2 border border-green-400 rounded-md outline-0 input_focus">
      </label>
      <label class="mb-6">
        <span class="mb-2 block text-xl font-bold">Password</span>
        <input v-model="loginFormData.password" type="password"
          class="w-full p-2 border border-green-400 rounded-md outline-0 input_focus">
      </label>
      <button type="submit" class="h-10 text-xl bg-green-500 text-white rounded-md hover:bg-green-600">Login</button>
    </form>
  </div>
</template>

<style scoped>
.input_focus {
  @apply focus:outline-1 outline-green-400;
}
</style>
