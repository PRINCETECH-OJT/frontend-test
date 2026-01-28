<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  type ApplicationData,
  initialApplicationData,
} from "./types/admission";
import ApplicationDetailsStep from "./steps/ApplicationDetailsStep.vue";
import PersonalInfoStep from "./steps/PersonalInfoStep.vue";
import EducationalBackgroundStep from "./steps/EducationalBackgroundStep.vue";
import FamilyInfoStep from "./steps/FamilyInfoStep.vue";
import OtherInfoStep from "./steps/OtherInfoStep.vue";
import ReviewStep from "./steps/ReviewStep.vue";
import { submitAdmission } from "./services/admissionService";

defineProps<{ applicationNumber: string | null }>();
const emit = defineEmits<{
  (e: "back"): void;
  (e: "complete", applicationNumber: string): void;
}>();

const STEPS = [
  {
    id: 1,
    title: "Application Details",
    description: "Campus and program selection",
  },
  {
    id: 2,
    title: "Personal Information",
    description: "Your personal details",
  },
  {
    id: 3,
    title: "Educational Background",
    description: "School history and achievements",
  },
  {
    id: 4,
    title: "Family Information",
    description: "Parent and guardian details",
  },
  {
    id: 5,
    title: "Other Information",
    description: "Additional details and documents",
  },
  { id: 6, title: "Review & Submit", description: "Review your application" },
];

const EXAMINATION_TYPES = ["Onsite", "Online"];

const showExamSelection = ref(true);
const selectedExamType = ref("Onsite");

const currentStep = ref(1);
const formData = ref<ApplicationData>({ ...initialApplicationData });
const currentStepData = computed(() => STEPS[currentStep.value - 1]);
const isSubmitting = ref(false);
const errorMessage = ref("");

const handleExamSelectionNext = () => {
  updateFormData({
    ...formData.value,
    examType: selectedExamType.value,
  } as any);

  showExamSelection.value = false;
  window.scrollTo(0, 0);
};

const updateFormData = (data: Partial<ApplicationData>) => {
  formData.value = { ...formData.value, ...data };
};

const handleNext = () => {
  if (currentStep.value < STEPS.length) {
    currentStep.value++;
    window.scrollTo(0, 0);
  }
};

const handlePrevious = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
    window.scrollTo(0, 0);
  } else {
    showExamSelection.value = true;
  }
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    const response = await submitAdmission(formData.value);
    const generatedNumber =
      response.data.data?.application_number ||
      `APP-${Date.now().toString().slice(-8)}`;
    emit("complete", generatedNumber);
  } catch (error: any) {
    console.error("Submission Error:", error);
    if (error.response && error.response.status === 422) {
      const errors = error.response.data.errors;
      const errorList = Object.values(errors).flat().join("\n");
      errorMessage.value = "Please fix the following errors:\n" + errorList;
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      errorMessage.value =
        "Server Error: " + (error.message || "Failed to submit application.");
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-[#F3F4F6] text-[#111827]">
    <header class="sticky top-0 z-50 border-b bg-white text-black shadow-sm">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2563EB]"
            >
              <svg
                class="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-lg font-bold tracking-tight">UniPortal</h1>
              <p class="text-xs text-gray-400">Online Admission</p>
            </div>
          </div>
          <button
            @click="emit('back')"
            class="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Return Log In
          </button>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 py-8">
      <div
        v-if="showExamSelection"
        class="flex flex-col items-center justify-center pt-10"
      >
        <div class="mb-8 text-center space-y-2">
          <h1
            class="text-2xl font-black uppercase tracking-wide text-[#111827] leading-tight"
          >
            UNIVERSITY OF SCIENCE AND TECHNOLOGY <br />
            OF SOUTHERN PHILIPPINES
          </h1>
        </div>

        <div
          class="w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <h2 class="mb-6 text-lg font-bold text-[#111827]">
            Choice Examination Type:
          </h2>
          <hr class="mb-8 border-gray-100" />

          <div class="flex items-center gap-4 mb-12">
            <label class="w-1/3 text-right font-bold text-gray-700"
              >Examination Type</label
            >
            <div class="w-2/3">
              <select
                v-model="selectedExamType"
                class="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option
                  v-for="type in EXAMINATION_TYPES"
                  :key="type"
                  :value="type"
                >
                  {{ type }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <button
              @click="emit('back')"
              class="rounded-full border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              ← Return Log In
            </button>
            <button
              @click="handleExamSelectionNext"
              class="rounded-full bg-white border border-gray-200 px-6 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
            >
              Next →
            </button>
          </div>
        </div>

        <p class="mt-8 text-xs font-medium text-gray-500">
          Powered by: Prince Technologies Corporation
        </p>
      </div>

      <div v-else class="grid gap-8 lg:grid-cols-[300px_1fr]">
        <aside class="hidden lg:block">
          <div
            class="sticky top-24 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <h2
              class="mb-6 text-sm font-bold uppercase tracking-wider text-gray-500"
            >
              Progress
            </h2>
            <nav class="space-y-2">
              <div
                v-for="step in STEPS"
                :key="step.id"
                class="group flex items-center gap-4 rounded-lg p-3 transition-all"
                :class="
                  step.id === currentStep
                    ? 'bg-[#060E57]/5'
                    : 'hover:bg-gray-50'
                "
              >
                <div
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors"
                  :class="[
                    step.id < currentStep
                      ? 'bg-[#2563EB] border-[#2563EB] text-white'
                      : step.id === currentStep
                        ? 'border-[#2563EB] text-[#2563EB]'
                        : 'border-gray-200 text-gray-300',
                  ]"
                >
                  <span v-if="step.id < currentStep">✓</span>
                  <span v-else>{{ step.id }}</span>
                </div>

                <div class="flex-1">
                  <p
                    class="text-sm font-bold leading-tight"
                    :class="
                      step.id === currentStep
                        ? 'text-[#2563EB]'
                        : 'text-gray-500'
                    "
                  >
                    {{ step.title }}
                  </p>
                </div>
              </div>
            </nav>
          </div>
        </aside>

        <main class="space-y-6">
          <div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <div
              v-if="errorMessage"
              class="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-200 whitespace-pre-line"
            >
              {{ errorMessage }}
            </div>

            <div class="mb-8 border-b border-gray-100 pb-6">
              <h2 class="text-3xl font-extrabold text-[#111827]">
                {{ currentStepData.title }}
              </h2>
              <p class="mt-2 text-gray-500">
                {{ currentStepData.description }}
              </p>
            </div>

            <div class="min-h-[400px]">
              <ApplicationDetailsStep
                v-if="currentStep === 1"
                :data="formData"
                @update="updateFormData"
              />
              <PersonalInfoStep
                v-else-if="currentStep === 2"
                :data="formData"
                @update="updateFormData"
              />
              <EducationalBackgroundStep
                v-else-if="currentStep === 3"
                :data="formData"
                @update="updateFormData"
              />
              <FamilyInfoStep
                v-else-if="currentStep === 4"
                :data="formData"
                @update="updateFormData"
              />
              <OtherInfoStep
                v-else-if="currentStep === 5"
                :data="formData"
                @update="updateFormData"
              />
              <ReviewStep
                v-else-if="currentStep === 6"
                :data="formData"
                @update="updateFormData"
              />
            </div>

            <div
              class="mt-10 flex items-center justify-between border-t border-gray-100 pt-8"
            >
              <button
                @click="handlePrevious"
                class="rounded-lg px-6 py-2.5 text-sm font-bold text-[#374151] transition-all hover:bg-gray-100"
              >
                PREVIOUS
              </button>

              <button
                v-if="currentStep < STEPS.length"
                @click="handleNext"
                class="rounded-lg bg-[#2563EB] px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-[#1D4ED8] active:scale-95"
              >
                NEXT STEP
              </button>

              <button
                v-else
                @click="handleSubmit"
                :disabled="!formData.hasAgreedToTerms || isSubmitting"
                class="rounded-lg bg-[#111827] px-8 py-2.5 text-sm font-bold text-white transition-all hover:bg-black disabled:bg-gray-300"
              >
                {{ isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION" }}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
