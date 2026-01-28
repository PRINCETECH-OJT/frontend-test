<script setup lang="ts">
import { ref } from "vue";
import { type ApplicationData, type SchoolHistory } from "../types/admission";

import Button from "../../../components/ui/button.vue";
import Modal from "../../../components/modal.vue";

defineProps<{
  data: ApplicationData;
}>();

const emit = defineEmits<{
  (e: "update", data: Partial<ApplicationData>): void;
}>();

const isDialogOpen = ref(false);
const photoPreview = ref<string | null>(null);

const newSchool = ref<Omit<SchoolHistory, "id">>({
  schoolName: "",
  address: "",
  programStrand: "",
  yearOfGraduation: "",
  gwa: "",
  award: "",
  lastGradeLevel: "",
  isPrivate: false,
  isForeign: false,
});

const handleAddSchool = (data: ApplicationData) => {
  const school: SchoolHistory = {
    ...newSchool.value,
    id: Date.now().toString(),
  };
  emit("update", { schoolHistory: [...data.schoolHistory, school] });

  newSchool.value = {
    schoolName: "",
    address: "",
    programStrand: "",
    yearOfGraduation: "",
    gwa: "",
    award: "",
    lastGradeLevel: "",
    isPrivate: false,
    isForeign: false,
  };
  isDialogOpen.value = false;
};
const handleRemoveSchool = (data: ApplicationData, id: string) => {
  emit("update", {
    schoolHistory: data.schoolHistory.filter((s) => s.id !== id),
  });
};

const handlePhotoChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    if (file.size > 1024 * 1024) {
      alert("File is too large. Max limit is 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      photoPreview.value = result;
      emit("update", { photoUrl: result });
    };
    reader.readAsDataURL(file);
  }
};

const removePhoto = () => {
  if (photoPreview.value) {
    URL.revokeObjectURL(photoPreview.value);
  }
  photoPreview.value = null;

  emit("update", { photoUrl: "" });
};
</script>

<template>
  <div class="space-y-8">
    <section>
      <div class="mb-6">
        <h3 class="text-xl font-bold tracking-tight text-foreground">
          Educational Information
        </h3>
        <p class="text-sm text-muted-foreground">
          Basic learner details and special classifications.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-12">
        <div class="space-y-2 md:col-span-6 lg:col-span-4">
          <label
            for="lrn"
            class="text-sm font-semibold text-foreground flex items-center gap-1"
          >
            LRN (Learner Reference Number)
            <span class="text-destructive">*</span>
          </label>
          <input
            id="lrn"
            type="text"
            :value="data.lrn"
            placeholder="Input 0 if not applicable"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            @input="
              emit('update', { lrn: ($event.target as HTMLInputElement).value })
            "
          />
        </div>

        <div class="grid grid-cols-2 gap-4 md:col-span-6 lg:col-span-5">
          <div class="space-y-2">
            <label class="text-sm font-semibold text-foreground"
              >SPED Status</label
            >
            <div
              class="flex h-10 w-full rounded-md border border-input bg-muted/30 p-1 shadow-sm"
            >
              <button
                type="button"
                class="flex flex-1 items-center justify-center rounded-md text-sm font-bold transition-all duration-200"
                :class="
                  !data.isSped
                    ? 'bg-slate-200 text-[#060E57] shadow-inner border border-slate-300'
                    : 'text-gray-500 hover:text-[#060E57] hover:bg-slate-100'
                "
                @click="emit('update', { isSped: false })"
              >
                No
              </button>

              <button
                type="button"
                class="flex flex-1 items-center justify-center rounded-md text-sm font-bold transition-all duration-200"
                :class="
                  data.isSped
                    ? 'bg-[#060E57] text-white shadow-md'
                    : 'text-gray-500 hover:text-[#060E57] hover:bg-slate-100'
                "
                @click="emit('update', { isSped: true })"
              >
                Yes
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-semibold text-foreground"
              >PWD Status</label
            >
            <div
              class="flex h-10 w-full rounded-md border border-input bg-muted/30 p-1 shadow-sm"
            >
              <button
                type="button"
                class="flex flex-1 items-center justify-center rounded-md text-sm font-bold transition-all duration-200"
                :class="
                  !data.isPwd
                    ? 'bg-slate-200 text-[#060E57] shadow-inner border border-slate-300'
                    : 'text-gray-500 hover:text-[#060E57] hover:bg-slate-100'
                "
                @click="emit('update', { isPwd: false })"
              >
                No
              </button>
              <button
                type="button"
                class="flex flex-1 items-center justify-center rounded-md text-sm font-bold transition-all duration-200"
                :class="
                  data.isPwd
                    ? 'bg-[#060E57] text-white shadow-md'
                    : 'text-gray-500 hover:text-[#060E57] hover:bg-slate-100'
                "
                @click="emit('update', { isPwd: true })"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-border pt-8">
      <div
        class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <h3
            class="text-xl font-bold tracking-tight text-foreground flex items-center gap-2"
          >
            Last School Attended
            <span
              class="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20"
            >
              Required
            </span>
          </h3>
          <p class="mt-1 text-sm text-muted-foreground">
            Declare all previous schools attended prior to this application.
          </p>
        </div>

        <Button
          @click="isDialogOpen = true"
          variant="default"
          class="flex items-center gap-2 shadow-sm"
        >
          <template #icon-left>
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </template>
          Add School Record
        </Button>
      </div>

      <div
        class="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-muted/50 border-b border-border">
                <th class="px-4 py-3 text-left font-bold text-foreground">
                  School Details
                </th>
                <th class="px-4 py-3 text-left font-bold text-foreground">
                  Program & Level
                </th>
                <th class="px-4 py-3 text-left font-bold text-foreground">
                  Performance
                </th>
                <th
                  class="w-[80px] px-4 py-3 text-center font-bold text-foreground"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-if="data.schoolHistory.length === 0">
                <td colspan="4" class="py-10 text-center">
                  <div
                    class="flex flex-col items-center justify-center text-muted-foreground/60"
                  >
                    <svg
                      class="mb-3 h-10 w-10 opacity-20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <p class="text-sm font-medium">No school records found</p>
                    <p class="text-xs">Click "Add School Record" to begin.</p>
                  </div>
                </td>
              </tr>
              <tr
                v-for="school in data.schoolHistory"
                :key="school.id"
                class="hover:bg-muted/20 transition-colors"
              >
                <td class="px-4 py-4">
                  <div
                    class="font-semibold text-foreground text-base leading-tight"
                  >
                    {{ school.schoolName }}
                  </div>
                  <div class="text-xs text-muted-foreground mt-0.5">
                    {{ school.address }}
                  </div>
                  <div class="mt-2 flex gap-1.5">
                    <span
                      v-if="school.isPrivate"
                      class="text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100 px-1.5 py-0.5 rounded"
                      >Private</span
                    >
                    <span
                      v-if="school.isForeign"
                      class="text-[9px] font-bold uppercase tracking-wider bg-purple-50 text-purple-600 border border-purple-100 px-1.5 py-0.5 rounded"
                      >Foreign</span
                    >
                  </div>
                </td>
                <td class="px-4 py-4 align-top">
                  <div class="font-medium text-foreground">
                    {{ school.programStrand || "-" }}
                  </div>
                  <div class="text-xs text-muted-foreground">
                    Grade/Level: {{ school.lastGradeLevel || "N/A" }}
                  </div>
                </td>
                <td class="px-4 py-4 align-top">
                  <div class="text-foreground">
                    GWA:
                    <span class="font-bold text-primary">{{
                      school.gwa || "-"
                    }}</span>
                  </div>
                  <div
                    v-if="school.award"
                    class="text-[11px] text-amber-600 font-bold mt-1 uppercase leading-none"
                  >
                    {{ school.award }}
                  </div>
                </td>
                <td class="px-4 py-4 text-center">
                  <button
                    class="rounded-md p-2 text-muted-foreground hover:bg-destructive hover:text-white transition-all shadow-sm border border-transparent hover:border-destructive"
                    @click="handleRemoveSchool(data, school.id)"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="border-t border-border pt-8">
      <div class="mb-4">
        <h3 class="text-xl font-bold tracking-tight text-foreground">
          Applicant Photo
        </h3>
        <p class="text-sm text-muted-foreground">
          Please provide a recent formal identification photo.
        </p>
      </div>

      <div
        class="flex flex-col items-center gap-8 rounded-xl border border-dashed border-border bg-muted/20 p-8 md:flex-row md:items-start"
      >
        <div class="relative group">
          <div
            class="flex h-48 w-40 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/30 bg-background shadow-md transition-all group-hover:border-primary/50"
          >
            <template v-if="photoPreview || data.photoUrl">
              <img
                :src="photoPreview || data.photoUrl"
                alt="Applicant photo"
                class="h-full w-full object-cover"
              />
              <button
                type="button"
                class="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-white shadow-lg transition-transform hover:scale-110"
                @click="removePhoto"
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
                    stroke-width="2.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </template>
            <template v-else>
              <div class="flex flex-col items-center text-muted-foreground/40">
                <svg
                  class="h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span
                  class="mt-2 text-[10px] font-bold uppercase tracking-widest"
                  >2x2 Photo</span
                >
              </div>
            </template>
          </div>
        </div>

        <div class="flex flex-col justify-center text-center md:text-left">
          <input
            type="file"
            accept="image/jpeg,image/png"
            class="hidden"
            id="photo-upload"
            @change="handlePhotoChange"
          />
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold text-foreground">Upload Requirements</h4>
              <ul class="mt-1 space-y-1 text-sm text-muted-foreground">
                <li
                  class="flex items-center gap-2 justify-center md:justify-start"
                >
                  <div class="h-1 w-1 rounded-full bg-primary" />
                  JPG or PNG formats only
                </li>
                <li
                  class="flex items-center gap-2 justify-center md:justify-start"
                >
                  <div class="h-1 w-1 rounded-full bg-primary" />
                  Maximum file size of 1MB
                </li>
                <li
                  class="flex items-center gap-2 justify-center md:justify-start"
                >
                  <div class="h-1 w-1 rounded-full bg-primary" />
                  White background recommended
                </li>
              </ul>
            </div>
            <div class="space-y-4">
              <label for="photo-upload" class="cursor-pointer inline-block">
                <Button
                  type="button"
                  variant="primary"
                  class="pointer-events-none flex items-center gap-2"
                >
                  <template #icon-left>
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  </template>
                  {{
                    photoPreview || data.photoUrl
                      ? "Replace Current Photo"
                      : "Select Image from Computer"
                  }}
                </Button>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Modal :show="isDialogOpen" @close="isDialogOpen = false">
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-foreground">
          Add School History
        </h3>
        <p class="text-sm text-muted-foreground">
          Enter the details of the school you attended.
        </p>
      </div>

      <div class="grid gap-4 py-4 md:grid-cols-2">
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >School Name *</label
          >
          <input
            v-model="newSchool.schoolName"
            type="text"
            placeholder="Enter school name"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Address *</label>
          <input
            v-model="newSchool.address"
            type="text"
            placeholder="City, Province"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Program/Strand</label
          >
          <input
            v-model="newSchool.programStrand"
            type="text"
            placeholder="e.g., STEM, ABM, HUMSS"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Year of Graduation</label
          >
          <input
            v-model="newSchool.yearOfGraduation"
            type="text"
            placeholder="YYYY"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">GWA</label>
          <input
            v-model="newSchool.gwa"
            type="text"
            placeholder="e.g., 90"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Award/Honors</label
          >
          <input
            v-model="newSchool.award"
            type="text"
            placeholder="e.g., With Honors"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Last Grade/Level Attended</label
          >
          <input
            v-model="newSchool.lastGradeLevel"
            type="text"
            placeholder="e.g., Grade 12"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <div class="flex items-end gap-4">
          <label class="flex items-center space-x-2">
            <input
              v-model="newSchool.isPrivate"
              type="checkbox"
              class="h-4 w-4 rounded accent-primary"
            />
            <span class="text-sm text-foreground">Private School</span>
          </label>

          <label class="flex items-center space-x-2">
            <input
              v-model="newSchool.isForeign"
              type="checkbox"
              class="h-4 w-4 rounded accent-primary"
            />
            <span class="text-sm text-foreground">Foreign School</span>
          </label>
        </div>
      </div>

      <div class="mt-4 flex justify-end gap-2">
        <Button variant="outline" @click="isDialogOpen = false">
          Cancel
        </Button>
        <Button
          :disabled="!newSchool.schoolName"
          class="disabled:cursor-not-allowed disabled:opacity-50"
          @click="handleAddSchool(data)"
        >
          Add School
        </Button>
      </div>
    </Modal>
  </div>
</template>
