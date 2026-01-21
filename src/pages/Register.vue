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
  <div class="register-page">
    <div class="register-container">
      <div class="register-header">
        <div class="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
        </div>
        <h2 class="register-title">Create an account</h2>
        <p class="register-subtitle">Start your 14-day free trial</p>
      </div>

      <div class="register-form-wrapper">
        <div class="register-form-card">
          <form @submit.prevent="handleRegister" class="register-form">
            <div v-if="errorMessage" class="error-message">
              <div class="error-content">
                <svg
                  class="error-icon"
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
                <h3 class="error-text">{{ errorMessage }}</h3>
              </div>
            </div>

            <div class="form-group">
              <label for="name" class="form-label">Full Name</label>
              <input
                v-model="name"
                id="name"
                name="name"
                type="text"
                required
                class="form-input"
                placeholder="Enter your full name"
              />
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email address</label>
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                required
                class="form-input"
                placeholder="Enter your email"
              />
            </div>

            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                required
                class="form-input"
                placeholder="Enter your password"
              />
            </div>

            <div class="form-group">
              <label for="confirm-password" class="form-label">Confirm Password</label>
              <input
                v-model="confirmPassword"
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                class="form-input"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="submit-button"
            >
              <svg
                v-if="isLoading"
                class="spinner"
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
          </form>
        </div>

        <p class="register-footer">
          Already have an account?
          <router-link to="/login" class="register-link">Sign in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(to bottom right, #e0e7ff, #f3e8ff, #d1fae5);
  padding: 24px 16px;
  box-sizing: border-box;
}

.register-container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
}

.register-header {
  text-align: center;
  margin-bottom: 32px;
}

.icon-container {
  margin: 0 auto 16px;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: #4f46e5;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.icon {
  width: 32px;
  height: 32px;
  color: white;
}

.register-title {
  margin: 0 0 8px 0;
  font-size: 30px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.025em;
}

.register-subtitle {
  margin: 0;
  font-size: 14px;
  color: #4b5563;
}

.register-form-wrapper {
  width: 100%;
}

.register-form-card {
  background: white;
  padding: 48px;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.error-message {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 16px;
}

.error-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.error-icon {
  width: 20px;
  height: 20px;
  color: #ef4444;
  flex-shrink: 0;
  margin-top: 2px;
}

.error-text {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #991b1b;
  word-wrap: break-word;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  line-height: 1.5;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.5;
  color: #111827;
  background-color: white;
  box-sizing: border-box;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

.submit-button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  box-sizing: border-box;
}

.submit-button:hover:not(:disabled) {
  background-color: #4338ca;
}

.submit-button:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.register-footer {
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
  color: #6b7280;
}

.register-link {
  font-weight: 600;
  color: #4f46e5;
  text-decoration: none;
  margin-left: 4px;
}

.register-link:hover {
  color: #4338ca;
  text-decoration: underline;
}

/* Tablet Responsive */
@media (max-width: 1024px) {
  .register-form-card {
    padding: 40px;
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .register-page {
    padding: 20px 12px;
  }

  .register-header {
    margin-bottom: 24px;
  }

  .register-title {
    font-size: 24px;
  }

  .register-subtitle {
    font-size: 13px;
  }

  .register-form-card {
    padding: 32px 24px;
    border-radius: 12px;
  }

  .register-form {
    gap: 20px;
  }

  .icon-container {
    width: 44px;
    height: 44px;
  }

  .icon {
    width: 28px;
    height: 28px;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .register-page {
    padding: 16px 12px;
    min-height: 100vh;
  }

  .register-header {
    margin-bottom: 20px;
  }

  .icon-container {
    width: 40px;
    height: 40px;
    margin-bottom: 12px;
  }

  .icon {
    width: 24px;
    height: 24px;
  }

  .register-title {
    font-size: 22px;
  }

  .register-subtitle {
    font-size: 12px;
  }

  .register-form-card {
    padding: 24px 20px;
    border-radius: 10px;
  }

  .register-form {
    gap: 18px;
  }

  .form-input {
    font-size: 16px; /* Prevents zoom on iOS */
  }

  .submit-button {
    padding: 12px;
    font-size: 15px;
  }

  .register-footer {
    font-size: 13px;
    margin-top: 20px;
  }
}

/* Landscape orientation on mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .register-page {
    padding: 16px;
  }

  .register-header {
    margin-bottom: 16px;
  }

  .icon-container {
    width: 36px;
    height: 36px;
    margin-bottom: 8px;
  }

  .icon {
    width: 20px;
    height: 20px;
  }

  .register-title {
    font-size: 20px;
    margin-bottom: 4px;
  }

  .register-subtitle {
    font-size: 11px;
  }

  .register-form-card {
    padding: 24px;
  }

  .register-form {
    gap: 16px;
  }
}
</style>
