<script setup lang="ts">
import {
  type ApplicationData,
  CAMPUSES,
  ACADEMIC_YEARS,
  APPLICATION_TYPES,
  DEPARTMENTS,
  GRADE_LEVELS,
  PROGRAMS,
  MAJORS,
} from "../types/admission";

defineProps<{
  data: ApplicationData;
}>();

const emit = defineEmits<{
  (e: "update", data: Partial<ApplicationData>): void;
}>();
</script>

<template>
  <div class="space-y-6">
    <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div class="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Admission Context</h3>
          <p class="text-sm text-gray-500">
            Select your campus and application details
          </p>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-2">
          <label
            for="campus"
            class="text-xs font-bold uppercase tracking-wider text-gray-500"
          >
            School Campus <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <select
              id="campus"
              :value="data.campus"
              class="w-full appearance-none rounded-lg border border-gray-300 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              @change="
                emit('update', {
                  campus: ($event.target as HTMLSelectElement).value,
                })
              "
            >
              <option value="" disabled selected>Select a Campus</option>
              <option v-for="campus in CAMPUSES" :key="campus" :value="campus">
                {{ campus }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <label
            for="academicYear"
            class="text-xs font-bold uppercase tracking-wider text-gray-500"
          >
            Academic Year <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <select
              id="academicYear"
              :value="data.academicYear"
              class="w-full appearance-none rounded-lg border border-gray-300 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              @change="
                emit('update', {
                  academicYear: ($event.target as HTMLSelectElement).value,
                })
              "
            >
              <option v-for="year in ACADEMIC_YEARS" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="space-y-2 md:col-span-2">
          <label
            for="applicationType"
            class="text-xs font-bold uppercase tracking-wider text-gray-500"
          >
            Application Type <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <select
              id="applicationType"
              :value="data.applicationType"
              class="w-full appearance-none rounded-lg border border-gray-300 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              @change="
                emit('update', {
                  applicationType: ($event.target as HTMLSelectElement).value,
                })
              "
            >
              <option
                v-for="type in APPLICATION_TYPES"
                :key="type"
                :value="type"
              >
                {{ type }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div class="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-purple-600"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-bold text-gray-900">Program Preferences</h3>
          <p class="text-sm text-gray-500">
            Select your preferred academic programs in order of priority
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <div
          class="relative overflow-hidden rounded-xl border border-blue-200 bg-blue-50/30 p-1 transition-all hover:border-blue-300"
        >
          <div class="flex flex-col gap-4 p-4 md:flex-row md:items-center">
            <div class="flex shrink-0 items-center gap-3 md:w-48">
              <span
                class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm"
                >1</span
              >
              <div>
                <p class="text-sm font-bold text-blue-900">First Choice</p>
                <p class="text-xs text-blue-600 font-medium">
                  Primary Priority
                </p>
              </div>
            </div>

            <div class="w-full">
              <div class="relative">
                <select
                  id="firstProgram"
                  :value="data.firstChoiceProgram"
                  class="w-full appearance-none rounded-lg border border-blue-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                  @change="
                    emit('update', {
                      firstChoiceProgram: ($event.target as HTMLSelectElement)
                        .value,
                    })
                  "
                >
                  <option value="" disabled selected>
                    Select First Priority Program
                  </option>
                  <option
                    v-for="program in PROGRAMS"
                    :key="program"
                    :value="program"
                  >
                    {{ program }}
                  </option>
                </select>
                <div
                  class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-1 transition-all hover:border-gray-300"
        >
          <div class="flex flex-col gap-4 p-4 md:flex-row md:items-center">
            <div class="flex shrink-0 items-center gap-3 md:w-48">
              <span
                class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600 border border-gray-200"
                >2</span
              >
              <div>
                <p class="text-sm font-bold text-gray-700">Second Choice</p>
                <p class="text-xs text-gray-400">Alternative</p>
              </div>
            </div>
            <div class="w-full">
              <div class="relative">
                <select
                  id="secondProgram"
                  :value="data.secondChoiceProgram"
                  class="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 transition-colors focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/10"
                  @change="
                    emit('update', {
                      secondChoiceProgram: ($event.target as HTMLSelectElement)
                        .value,
                    })
                  "
                >
                  <option value="" disabled selected>
                    Select Alternative Program (Optional)
                  </option>
                  <option
                    v-for="program in PROGRAMS"
                    :key="program"
                    :value="program"
                  >
                    {{ program }}
                  </option>
                </select>
                <div
                  class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-1 transition-all hover:border-gray-300"
        >
          <div class="flex flex-col gap-4 p-4 md:flex-row md:items-center">
            <div class="flex shrink-0 items-center gap-3 md:w-48">
              <span
                class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600 border border-gray-200"
                >3</span
              >
              <div>
                <p class="text-sm font-bold text-gray-700">Third Choice</p>
                <p class="text-xs text-gray-400">Alternative</p>
              </div>
            </div>
            <div class="w-full">
              <div class="relative">
                <select
                  id="thirdProgram"
                  :value="data.thirdChoiceProgram"
                  class="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 transition-colors focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/10"
                  @change="
                    emit('update', {
                      thirdChoiceProgram: ($event.target as HTMLSelectElement)
                        .value,
                    })
                  "
                >
                  <option value="" disabled selected>
                    Select Alternative Program (Optional)
                  </option>
                  <option
                    v-for="program in PROGRAMS"
                    :key="program"
                    :value="program"
                  >
                    {{ program }}
                  </option>
                </select>
                <div
                  class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
