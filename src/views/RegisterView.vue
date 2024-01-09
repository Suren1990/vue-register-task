<script setup>
import { ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email, maxLength, minLength } from '@vuelidate/validators'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useRouter } from 'vue-router';

const router = useRouter();

const registeredSuccess = ref(false);

const formData = reactive({
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: '',
	date: new Date().toLocaleString('en'),
});

const rules = {
	firstName: { required, minLength: minLength(2) },
	lastName: { required, minLength: minLength(2) },
	email: { required, email },
	password: { required, minLength: minLength(8), maxLength: maxLength(30) },
	confirmPassword: {
		minLength: minLength(8), maxLength: maxLength(30), required: function () {
			return formData.confirmPassword === formData.password;
		}
	},
	date: { required },
};

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
	const result = await v$.value.$validate();

	if (result) {
		localStorage.setItem('loginData', JSON.stringify({
			email: formData.email,
			password: formData.password,
		}));

		formData.firstName = '';
		formData.lastName = '';
		formData.email = '';
		formData.password = '';
		formData.confirmPassword = '';

		registeredSuccess.value = true;
	}
}

</script>

<template>
	<div class="max-w-[30rem] w-full mx-auto">
		<h1 class="mb-4 text-3xl font-bold text-center">Register</h1>
		<div v-if="registeredSuccess">
			<p class="mb-5 text-lg text-center font-bold">You are successfully registered</p>
			<button @click="router.push({ name: 'login' })"
				class="w-full h-[2.5rem] bg-green-500 text-white hover:bg-green-600">Go Login</button>
		</div>
		<form v-else class="flex flex-col mb-4 p-3 border border-green-500 rounded-xl" @submit.prevent="submitForm">
			<label class="mb-4">
				<span class="mb-2 block text-xl font-bold">First Name</span>
				<input type="text" class="w-full p-2 border border-green-400 rounded-md outline-0 input_focus"
					:class="{ 'border-red-600': v$.firstName.$error && v$.firstName.$touch }" v-model="formData.firstName"
					@blur="v$.firstName.$touch">
				<div v-if="v$.firstName.$error" class="text-red-600 font-bold">First name is required</div>
			</label>
			<label class="mb-4">
				<span class="mb-2 block text-xl font-bold">Last Name</span>
				<input v-model="formData.lastName" class="w-full p-2 border border-green-400 rounded-md outline-0 input_focus"
					:class="{ 'border-red-600': v$.firstName.$error && v$.firstName.$touch }" @blur="v$.lastName.$touch"
					type="text">
				<div v-if="v$.lastName.$error" class="text-red-600 font-bold">Last name is required</div>
			</label>
			<label class="mb-4">
				<span class="mb-2 block text-xl font-bold">Email</span>
				<input v-model="formData.email" class="w-full p-2 border border-green-400 rounded-md outline-0 input_focus"
					type="email" :class="{ 'border-red-600': v$.email.$error && v$.email.$touch }" @blur="v$.email.$touch">
				<div v-if="v$.email.$error" class="text-red-600 font-bold">Email is required</div>
			</label>
			<label class="mb-4">
				<span class="mb-2 block text-xl font-bold">Password</span>
				<input v-model="formData.password" class="w-full p-2 border border-green-400 rounded-md outline-0 input_focus"
					type="password" :class="{ 'border-red-600': v$.password.$error && v$.password.$touch }"
					@blur="v$.password.$touch">
				<div v-if="v$.password.$error" class="text-red-600 font-bold">Password is required</div>
			</label>
			<label class="mb-4">
				<span class="mb-2 block text-xl font-bold">Confirm Password</span>
				<input v-model="formData.confirmPassword"
					class="w-full p-2 border border-green-400 rounded-md outline-0 input_focus" type="password"
					:class="{ 'border-red-600': v$.confirmPassword.$error && v$.confirmPassword.$touch }"
					@blur="v$.confirmPassword.$touch">
				<div v-if="formData.password !== formData.confirmPassword" class="text-red-600 font-bold">Confirm password
					must equal to password</div>
				<div v-if="v$.confirmPassword.$error" class="text-red-600 font-bold">Confirm password is required</div>
			</label>
			<label class="mb-4">
				<VueDatePicker v-model="formData.date" @blur="$v.date.$touch()"></VueDatePicker>
			</label>
			<button type="submit" class="h-10 text-xl bg-green-500 text-white rounded-md hover:bg-green-600">Register</button>
		</form>
	</div>
</template>

<style>
.dp__input_readonly,
.dp__input_readonly:hover {
	border-color: #22c55e;
}

.dp__action_select[type='button'] {
	background-color: #1976d2;
}
</style>
