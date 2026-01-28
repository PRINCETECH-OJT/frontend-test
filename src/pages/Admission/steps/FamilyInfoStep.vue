<script setup lang="ts">
import { ref, watch } from "vue";
import {
  type ApplicationData,
  type Sibling,
  PROVINCES,
  YEARLY_INCOMES,
} from "../types/admission";
import Modal from "../../../components/modal.vue";

defineProps<{
  data: ApplicationData;
}>();

const emit = defineEmits<{
  (e: "update", data: Partial<ApplicationData>): void;
}>();

const isDialogOpen = ref(false);

const newSibling = ref<Omit<Sibling, "id">>({
  fullName: "",
  dateOfBirth: "",
  age: "",
  gender: "",
  gradeLevel: "",
  schoolAttended: "",
});

const handleAddSibling = (data: ApplicationData) => {
  const sibling: Sibling = {
    ...newSibling.value,
    id: Date.now().toString(),
  };
  emit("update", { siblings: [...data.siblings, sibling] });
  newSibling.value = {
    fullName: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    gradeLevel: "",
    schoolAttended: "",
  };
  isDialogOpen.value = false;
};

watch(
  () => newSibling.value.dateOfBirth,
  (newDate) => {
    if (newDate) {
      const today = new Date();
      const birthDate = new Date(newDate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      newSibling.value.age = age.toString();
    }
  },
);

const handleRemoveSibling = (data: ApplicationData, id: string) => {
  emit("update", {
    siblings: data.siblings.filter((s) => s.id !== id),
  });
};
</script>

<template>
  <div class="space-y-8">
    <!-- Father's Information -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-foreground">
        Father's Information
      </h3>
      <p class="mb-4 text-sm text-muted-foreground">
        Write N/A if not applicable.
      </p>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="space-y-2 lg:col-span-2">
          <label for="fatherName" class="text-sm font-medium text-foreground"
            >Father's Name *</label
          >
          <input
            id="fatherName"
            type="text"
            :value="data.fatherName"
            placeholder="Full name"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                fatherName: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>

        <div class="space-y-2">
          <label for="fatherBday" class="text-sm font-medium text-foreground"
            >Date of Birth</label
          >
          <input
            id="fatherBday"
            type="date"
            :value="data.fatherBirthday"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                fatherBirthday: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>

        <div class="space-y-2">
          <label
            for="fatherOccupation"
            class="text-sm font-medium text-foreground"
            >Occupation</label
          >
          <input
            id="fatherOccupation"
            type="text"
            :value="data.fatherOccupation"
            placeholder="Enter occupation"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                fatherOccupation: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>

        <div class="space-y-2">
          <label for="fatherIncome" class="text-sm font-medium text-foreground"
            >Monthly Income</label
          >
          <input
            id="fatherIncome"
            type="text"
            :value="data.fatherMonthlyIncome"
            placeholder="e.g., 25,000"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                fatherMonthlyIncome: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>

        <div class="space-y-2">
          <label for="fatherYearly" class="text-sm font-medium text-foreground"
            >Yearly Compensation</label
          >
          <select
            id="fatherYearly"
            :value="data.fatherYearlyIncome"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @change="
              emit('update', {
                fatherYearlyIncome: ($event.target as HTMLSelectElement).value,
              })
            "
          >
            <option
              v-for="income in YEARLY_INCOMES"
              :key="income"
              :value="income"
            >
              {{ income }}
            </option>
          </select>
        </div>

        <div class="space-y-2">
          <label for="fatherContact" class="text-sm font-medium text-foreground"
            >Contact Number</label
          >
          <input
            id="fatherContact"
            type="tel"
            :value="data.fatherContact"
            placeholder="+63 9XX XXX XXXX"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                fatherContact: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>
      </div>
    </section>

    <!-- Mother's Information -->
    <section class="border-t pt-6">
      <h3 class="mb-4 text-lg font-semibold text-foreground">
        Mother's Information
      </h3>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="space-y-2 lg:col-span-2">
          <label for="motherName" class="text-sm font-medium text-foreground"
            >Mother's Maiden Name *</label
          >
          <input
            id="motherName"
            type="text"
            :value="data.motherName"
            placeholder="Full maiden name"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                motherName: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>

        <div class="space-y-2">
          <label for="motherBday" class="text-sm font-medium text-foreground"
            >Date of Birth</label
          >
          <input
            id="motherBday"
            type="date"
            :value="data.motherBirthday"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                motherBirthday: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>

        <div class="space-y-2">
          <label
            for="motherOccupation"
            class="text-sm font-medium text-foreground"
            >Occupation</label
          >
          <input
            id="motherOccupation"
            type="text"
            :value="data.motherOccupation"
            placeholder="Enter occupation"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                motherOccupation: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>

        <div class="space-y-2">
          <label for="motherIncome" class="text-sm font-medium text-foreground"
            >Monthly Income</label
          >
          <input
            id="motherIncome"
            type="text"
            :value="data.motherMonthlyIncome"
            placeholder="e.g., 25,000"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                motherMonthlyIncome: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>

        <div class="space-y-2">
          <label for="motherYearly" class="text-sm font-medium text-foreground"
            >Yearly Compensation</label
          >
          <select
            id="motherYearly"
            :value="data.motherYearlyIncome"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @change="
              emit('update', {
                motherYearlyIncome: ($event.target as HTMLSelectElement).value,
              })
            "
          >
            <option
              v-for="income in YEARLY_INCOMES"
              :key="income"
              :value="income"
            >
              {{ income }}
            </option>
          </select>
        </div>

        <div class="space-y-2">
          <label for="motherContact" class="text-sm font-medium text-foreground"
            >Contact Number</label
          >
          <input
            id="motherContact"
            type="tel"
            :value="data.motherContact"
            placeholder="+63 9XX XXX XXXX"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                motherContact: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>
      </div>
    </section>

    <!-- Guardian's Information -->
    <section class="border-t pt-6">
      <h3 class="mb-4 text-lg font-semibold text-foreground">
        Guardian's Information
      </h3>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-2 md:col-span-2">
          <label for="guardianName" class="text-sm font-medium text-foreground"
            >Guardian's Name</label
          >
          <input
            id="guardianName"
            type="text"
            :value="data.guardianName"
            placeholder="Full name"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                guardianName: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>

        <div class="space-y-2 md:col-span-2">
          <label
            for="guardianAddress"
            class="text-sm font-medium text-foreground"
            >Address</label
          >
          <input
            id="guardianAddress"
            type="text"
            :value="data.guardianAddress"
            placeholder="Complete address"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                guardianAddress: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>

        <div class="space-y-2">
          <label
            for="guardianProvince"
            class="text-sm font-medium text-foreground"
            >Province/Region</label
          >
          <select
            id="guardianProvince"
            :value="data.guardianProvince"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @change="
              emit('update', {
                guardianProvince: ($event.target as HTMLSelectElement).value,
              })
            "
          >
            <option v-for="prov in PROVINCES" :key="prov" :value="prov">
              {{ prov }}
            </option>
          </select>
        </div>

        <div class="space-y-2">
          <label for="guardianCity" class="text-sm font-medium text-foreground"
            >City/Municipality</label
          >
          <input
            id="guardianCity"
            type="text"
            :value="data.guardianCity"
            placeholder="Enter city"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                guardianCity: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>

        <div class="space-y-2">
          <label
            for="guardianTelephone"
            class="text-sm font-medium text-foreground"
            >Telephone Number</label
          >
          <input
            id="guardianTelephone"
            type="tel"
            :value="data.guardianTelephone"
            placeholder="(000) 000-0000"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                guardianTelephone: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>

        <div class="space-y-2">
          <label
            for="guardianMobile"
            class="text-sm font-medium text-foreground"
            >Mobile Number</label
          >
          <input
            id="guardianMobile"
            type="tel"
            :value="data.guardianMobile"
            placeholder="+63 9XX XXX XXXX"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                guardianMobile: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>

        <div class="space-y-2 md:col-span-2">
          <label for="guardianEmail" class="text-sm font-medium text-foreground"
            >Email</label
          >
          <input
            id="guardianEmail"
            type="email"
            :value="data.guardianEmail"
            placeholder="email@example.com"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                guardianEmail: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>
      </div>
    </section>

    <!-- Sibling Information -->
    <section class="border-t pt-6">
      <div class="mb-4 flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-foreground">
            Sibling Information
          </h3>
          <p class="mt-1 text-sm text-muted-foreground">
            Please input siblings who are not currently attending this school
            and siblings also applying.
          </p>
        </div>

        <button
          class="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          @click="isDialogOpen = true"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Sibling
        </button>
      </div>

      <!-- Siblings Table -->
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-muted/50">
            <tr>
              <th class="px-4 py-3 text-left font-medium text-foreground">
                Full Name
              </th>
              <th class="px-4 py-3 text-left font-medium text-foreground">
                Date of Birth
              </th>
              <th class="px-4 py-3 text-left font-medium text-foreground">
                Age
              </th>
              <th class="px-4 py-3 text-left font-medium text-foreground">
                Gender
              </th>
              <th class="px-4 py-3 text-left font-medium text-foreground">
                Grade Level
              </th>
              <th class="px-4 py-3 text-left font-medium text-foreground">
                School Attended
              </th>
              <th
                class="w-[60px] px-4 py-3 text-left font-medium text-foreground"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="data.siblings.length === 0">
              <td colspan="7" class="py-8 text-center text-muted-foreground">
                No siblings added yet. Click Add Sibling to add.
              </td>
            </tr>
            <tr
              v-for="sibling in data.siblings"
              :key="sibling.id"
              class="border-t"
            >
              <td class="px-4 py-3 font-medium text-foreground">
                {{ sibling.fullName }}
              </td>
              <td class="px-4 py-3 text-muted-foreground">
                {{ sibling.dateOfBirth || "-" }}
              </td>
              <td class="px-4 py-3 text-muted-foreground">
                {{ sibling.age || "-" }}
              </td>
              <td class="px-4 py-3 text-muted-foreground">
                {{ sibling.gender || "-" }}
              </td>
              <td class="px-4 py-3 text-muted-foreground">
                {{ sibling.gradeLevel || "-" }}
              </td>
              <td class="px-4 py-3 text-muted-foreground">
                {{ sibling.schoolAttended || "-" }}
              </td>
              <td class="px-4 py-3">
                <button
                  class="rounded p-1 text-destructive hover:bg-destructive/10"
                  @click="handleRemoveSibling(data, sibling.id)"
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
    </section>

    <!-- Emergency Contact -->
    <section class="border-t pt-6">
      <h3 class="mb-4 text-lg font-semibold text-foreground">
        Contact Person in Case of Emergency
      </h3>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-2">
          <label for="emergencyName" class="text-sm font-medium text-foreground"
            >Complete Name *</label
          >
          <input
            id="emergencyName"
            type="text"
            :value="data.emergencyContactName"
            placeholder="Full name"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                emergencyContactName: ($event.target as HTMLInputElement).value,
              })
            "
          />
        </div>

        <div class="space-y-2">
          <label
            for="emergencyRelation"
            class="text-sm font-medium text-foreground"
            >Relationship</label
          >
          <select
            id="emergencyRelation"
            :value="data.emergencyContactRelation"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @change="
              emit('update', {
                emergencyContactRelation: ($event.target as HTMLSelectElement)
                  .value,
              })
            "
          >
            <option value="">Select</option>
            <option value="Mother">Mother</option>
            <option value="Father">Father</option>
            <option value="Guardian">Guardian</option>
            <option value="Sibling">Sibling</option>
            <option value="Spouse">Spouse</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="space-y-2 md:col-span-2">
          <label
            for="emergencyAddress"
            class="text-sm font-medium text-foreground"
            >Complete Address *</label
          >
          <input
            id="emergencyAddress"
            type="text"
            :value="data.emergencyContactAddress"
            placeholder="Complete address"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                emergencyContactAddress: ($event.target as HTMLInputElement)
                  .value,
              })
            "
          />
        </div>

        <div class="space-y-2">
          <label
            for="emergencyTelephone"
            class="text-sm font-medium text-foreground"
            >Telephone</label
          >
          <input
            id="emergencyTelephone"
            type="tel"
            :value="data.emergencyContactTelephone"
            placeholder="(000) 000-0000"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                emergencyContactTelephone: ($event.target as HTMLInputElement)
                  .value,
              })
            "
          />
        </div>

        <div class="space-y-2">
          <label
            for="emergencyMobile"
            class="text-sm font-medium text-foreground"
            >Mobile *</label
          >
          <input
            id="emergencyMobile"
            type="tel"
            :value="data.emergencyContactMobile"
            placeholder="+63 9XX XXX XXXX"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                emergencyContactMobile: ($event.target as HTMLInputElement)
                  .value,
              })
            "
          />
        </div>

        <div class="space-y-2 md:col-span-2">
          <label
            for="emergencyEmail"
            class="text-sm font-medium text-foreground"
            >Email</label
          >
          <input
            id="emergencyEmail"
            type="email"
            :value="data.emergencyContactEmail"
            placeholder="email@example.com"
            class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                emergencyContactEmail: ($event.target as HTMLInputElement)
                  .value,
              })
            "
          />
        </div>
      </div>
    </section>

    <!-- Add Sibling Dialog -->
    <Modal :show="isDialogOpen" @close="isDialogOpen = false">
      <div class="mb-6">
        <h3 class="text-xl font-bold tracking-tight text-[#060E57]">
          Add Sibling
        </h3>
        <p class="text-sm text-gray-500">
          Enter the personal and school details of your sibling.
        </p>
      </div>

      <div class="space-y-5">
        <div class="space-y-1.5">
          <label class="text-sm font-bold text-gray-700">
            Full Name <span class="text-red-500">*</span>
          </label>
          <input
            v-model="newSibling.fullName"
            type="text"
            placeholder="e.g. Juan Dela Cruz"
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#060E57] focus:outline-none focus:ring-1 focus:ring-[#060E57]"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="text-sm font-bold text-gray-700">Date of Birth</label>
            <input
              v-model="newSibling.dateOfBirth"
              type="date"
              class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 focus:border-[#060E57] focus:outline-none focus:ring-1 focus:ring-[#060E57]"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-sm font-bold text-gray-700">Age</label>
            <input
              v-model="newSibling.age"
              type="number"
              readonly
              placeholder="Auto"
              class="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500 focus:outline-none"
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-bold text-gray-700">Gender</label>
          <div class="flex gap-4">
            <label
              class="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 px-4 py-2 transition-all hover:bg-gray-50 has-[:checked]:border-[#060E57] has-[:checked]:bg-[#060E57]/5"
            >
              <input
                v-model="newSibling.gender"
                type="radio"
                value="M"
                class="h-4 w-4 accent-[#060E57]"
              />
              <span class="text-sm font-medium text-gray-700">Male</span>
            </label>

            <label
              class="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 px-4 py-2 transition-all hover:bg-gray-50 has-[:checked]:border-[#060E57] has-[:checked]:bg-[#060E57]/5"
            >
              <input
                v-model="newSibling.gender"
                type="radio"
                value="F"
                class="h-4 w-4 accent-[#060E57]"
              />
              <span class="text-sm font-medium text-gray-700">Female</span>
            </label>
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-bold text-gray-700"
            >Grade Level / Occupation</label
          >
          <input
            v-model="newSibling.gradeLevel"
            type="text"
            placeholder="e.g. Grade 10 or Working"
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#060E57] focus:outline-none focus:ring-1 focus:ring-[#060E57]"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-bold text-gray-700"
            >School / Company</label
          >
          <input
            v-model="newSibling.schoolAttended"
            type="text"
            placeholder="Name of school or workplace"
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#060E57] focus:outline-none focus:ring-1 focus:ring-[#060E57]"
          />
        </div>
      </div>

      <div class="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-5">
        <button
          type="button"
          class="rounded-lg px-5 py-2.5 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#060E57]"
          @click="isDialogOpen = false"
        >
          Cancel
        </button>
        <button
          type="button"
          :disabled="!newSibling.fullName"
          class="rounded-lg bg-[#060E57] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#060E57]/20 transition-all hover:bg-[#060E57]/90 disabled:cursor-not-allowed disabled:bg-gray-300"
          @click="handleAddSibling(data)"
        >
          Add Sibling
        </button>
      </div>
    </Modal>
  </div>
</template>
