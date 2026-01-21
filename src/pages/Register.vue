<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const isLoading = ref(false);
const errorMessage = ref("");

const handleRegister = async () => {
  errorMessage.value = "";

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match!";
    return;
  }

  isLoading.value = true;

  try {
    const response = await api.post("/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    });

    console.log("Registration Success:", response.data);

    localStorage.setItem("token", response.data.token);

    router.push("/dashboard");
  } catch (error) {
    console.error("Error registering:", error);

    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = "Network error or server is unreachable.";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="flex min-h-screen flex-col justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-50 px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div
        class="mx-auto h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z"
          />
        </svg>
      </div>
      <h2
        class="mt-6 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900"
      >
        Create an account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Start your 14-day free trial
      </p>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow-2xl sm:rounded-2xl sm:px-12">
        <form class="space-y-6" @submit.prevent="handleRegister">
          <div
            v-if="errorMessage"
            class="rounded-md bg-red-50 p-4 border border-red-200"
          >
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  {{ errorMessage }}
                </h3>
              </div>
            </div>
          </div>

          <div>
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Full Name</label
            >
            <div class="mt-2">
              <input
                v-model="name"
                id="name"
                name="name"
                type="text"
                required
                class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label
            >
            <div class="mt-2">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                required
                class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="mt-2">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                required
                class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>

          <div>
            <label
              for="confirm-password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Confirm Password</label
            >
            <div class="mt-2">
              <input
                v-model="confirmPassword"
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-150 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span v-if="isLoading">Creating account...</span>
              <span v-else>Sign up</span>
            </button>
          </div>
        </form>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        <router-link
          to="/"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Sign in</router-link
        >
      </p>
    </div>
  </div>
</template>
