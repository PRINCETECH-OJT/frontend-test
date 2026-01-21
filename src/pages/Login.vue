<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

import coverImg from "../assets/loginCoverPage.png";
import ustpLogo from "../assets/ustplogo.png";
import usernameIcon from "../assets/icons/username icon.png";
import passwordIcon from "../assets/icons/password icon.png";

const auth = useAuthStore();
const router = useRouter();

const username = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);

const isLoading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;
  
  // Bypass login - set mock user and navigate to dashboard
  auth.user = { id: 1, name: "Test User", email: "test@example.com" };
  setTimeout(() => {
    router.push("/dashboard");
    isLoading.value = false;
  }, 300);
};
</script>

<template>
  <div class="min-h-screen w-full bg-white">
    <div class="flex min-h-screen flex-col lg:flex-row">
      <!-- Left: Login -->
      <section class="flex w-full items-center justify-center bg-white px-6 py-12 sm:px-10 lg:w-[560px] lg:px-16">
        <div class="w-full max-w-md">
          
          <div class="mb-10 flex items-center gap-3">
            <img :src="ustpLogo" alt="USTP" class="h-24 w-24 rounded-xl" />
          </div>
          <h1 class="text-center text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome Back
          </h1>
          <p class="mt-3 text-center text-sm text-slate-500">
            Please enter your credentials to access your account
          </p>

          <div
            v-if="errorMessage"
            class="mt-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800"
            role="alert"
          >
            {{ errorMessage }}
          </div>

          <form class="mt-10 space-y-6" @submit.prevent="handleLogin">
            <div>
              <label class="block text-sm font-semibold text-slate-800">
                Student / Faculty ID
              </label>
              <div class="relative mt-2">
                <img
                  :src="usernameIcon"
                  alt=""
                  aria-hidden="true"
                  class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 opacity-60"
                />
                <input
                  v-model="username"
                  type="text"
                  autocomplete="username"
                  placeholder="e.g. 2023100456"
                  required
                  class="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-100"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-800">Password</label>
              <div class="relative mt-2">
                <img
                  :src="passwordIcon"
                  alt=""
                  aria-hidden="true"
                  class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 opacity-60"
                />
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  placeholder="••••••••"
                  required
                  class="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-100"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  @click="showPassword = !showPassword"
                >
                  <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                    <path d="M12 5c-7.633 0-11 7-11 7s3.367 7 11 7 11-7 11-7-3.367-7-11-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"/>
                    <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l2.04 2.04C2.52 7.22 1 10 1 10s3.367 7 11 7c2.06 0 3.78-.48 5.22-1.18l2.25 2.25a.75.75 0 1 0 1.06-1.06l-17-17Z"/>
                    <path d="M12 5c-1.74 0-3.27.36-4.58.9l2.11 2.11A4.99 4.99 0 0 1 12 7a5 5 0 0 1 5 5c0 .85-.21 1.65-.58 2.36l1.8 1.8C21.06 14.67 23 10 23 10s-3.367-7-11-7Z"/>
                    <path d="M9.88 10.94a2.25 2.25 0 0 0 3.18 3.18l-3.18-3.18Z"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between gap-4 text-sm">
              <label class="inline-flex items-center gap-2 text-slate-600">
                <input
                  v-model="rememberMe"
                  type="checkbox"
                  class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                />
                Remember me
              </label>
              <a href="#" class="font-semibold text-blue-600 hover:text-blue-700">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="mt-2 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <svg
                v-if="isLoading"
                class="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              <span>Login to Portal</span>
              <span class="text-base leading-none">→</span>
            </button>

            <div class="pt-8">
              <div class="flex items-center gap-3 text-xs font-semibold text-slate-400">
                <div class="h-px flex-1 bg-slate-200"></div>
                SECURITY NOTICE
                <div class="h-px flex-1 bg-slate-200"></div>
              </div>

              <div class="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
                <span class="inline-flex items-center gap-2">
                  <span class="h-2 w-2 rounded-full bg-slate-300"></span>
                  English (US)
                </span>
                <span class="inline-flex items-center gap-2">
                  <span class="h-2 w-2 rounded-full bg-slate-300"></span>
                  Support
                </span>
                <span class="inline-flex items-center gap-2">
                  <span class="h-2 w-2 rounded-full bg-slate-300"></span>
                  Privacy
                </span>
              </div>
            </div>
          </form>
        </div>
      </section>

      <!-- Right: Cover -->
      <section class="relative hidden flex-1 overflow-hidden lg:block">
        <img :src="coverImg" alt="" class="absolute inset-0 h-full w-full object-cover" />
        <div class="absolute inset-0 bg-blue-600/55 mix-blend-multiply"></div>

        <div class="relative flex h-full flex-col items-center justify-end px-10 pb-28 text-center text-white">
          

          <h2 class="text-5xl font-extrabold leading-tight tracking-tight">
            "Advancing a Sustainable Future"<br />
          </h2>

          <p class="mt-6 max-w-xl text-lg text-white/90">
            Access your student profile, grades, and faculty resources in one unified platform.
          </p>

          <p class="absolute bottom-8 left-0 right-0 text-center text-sm text-white/80">
            © 2024 University of Science and Technology of Southern Philippines
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
