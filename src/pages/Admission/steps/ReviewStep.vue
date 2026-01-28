<script setup lang="ts">
import { computed } from "vue";
import type { ApplicationData } from "../types/admission";

const props = defineProps<{
  data: ApplicationData;
}>();

const emit = defineEmits<{
  (e: "update", data: Partial<ApplicationData>): void;
}>();

const fullName = computed(() => {
  return (
    [
      props.data.surname,
      props.data.givenName,
      props.data.middleName,
      props.data.nameExtension,
    ]
      .filter(Boolean)
      .join(" ") || "Not specified"
  );
});

const fullAddress = computed(() => {
  return (
    [
      props.data.houseStreet,
      props.data.barangay,
      props.data.city,
      props.data.province,
    ]
      .filter(Boolean)
      .join(", ") || "Not specified"
  );
});
</script>

<template>
  <div class="space-y-6">
    <div class="rounded-lg bg-muted/50 p-4">
      <h3 class="font-semibold text-foreground">Review Information</h3>
      <p class="mt-1 text-sm text-muted-foreground">
        Please review all information carefully before submitting your
        application.
      </p>
    </div>

    <!-- Application Details -->
    <div class="rounded-lg border bg-card">
      <div class="border-b px-4 py-3">
        <h4
          class="flex items-center gap-2 text-base font-semibold text-card-foreground"
        >
          <svg
            class="h-5 w-5 text-primary"
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
          Application Details
        </h4>
      </div>
      <div class="grid gap-4 p-4 md:grid-cols-2">
        <div>
          <p class="text-sm text-muted-foreground">Campus</p>
          <p class="font-medium text-foreground">
            {{ data.campus || "Not specified" }}
          </p>
        </div>
        <div>
          <p class="text-sm text-muted-foreground">Academic Year</p>
          <p class="font-medium text-foreground">
            {{ data.academicYear || "Not specified" }}
          </p>
        </div>
        <div>
          <p class="text-sm text-muted-foreground">Application Type</p>
          <p class="font-medium text-foreground">
            {{ data.applicationType || "Not specified" }}
          </p>
        </div>

        <div>
          <p class="text-sm text-muted-foreground">First Choice Program</p>
          <p class="font-medium text-foreground">
            {{ data.firstChoiceProgram || "Not specified" }}
          </p>
        </div>
        <div v-if="data.secondChoiceProgram">
          <p class="text-sm text-muted-foreground">Second Choice Program</p>
          <p class="font-medium text-foreground">
            {{ data.secondChoiceProgram }}
          </p>
        </div>
        <div v-if="data.thirdChoiceProgram">
          <p class="text-sm text-muted-foreground">Third Choice Program</p>
          <p class="font-medium text-foreground">
            {{ data.thirdChoiceProgram }}
          </p>
        </div>
      </div>
    </div>

    <!-- Personal Information -->
    <div class="rounded-lg border bg-card">
      <div class="border-b px-4 py-3">
        <h4
          class="flex items-center gap-2 text-base font-semibold text-card-foreground"
        >
          <svg
            class="h-5 w-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          Personal Information
        </h4>
      </div>
      <div class="p-4">
        <div class="flex flex-col gap-4 md:flex-row">
          <!-- Photo -->
          <div
            v-if="data.photoUrl"
            class="flex h-32 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border"
          >
            <img
              :src="data.photoUrl"
              alt="Applicant"
              class="h-full w-full object-cover"
            />
          </div>

          <div class="grid flex-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p class="text-sm text-muted-foreground">Full Name</p>
              <p class="font-medium text-foreground">{{ fullName }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Date of Birth</p>
              <p class="font-medium text-foreground">
                {{ data.dateOfBirth || "Not specified" }}
              </p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Gender</p>
              <p class="font-medium text-foreground">
                {{ data.gender || "Not specified" }}
              </p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Civil Status</p>
              <p class="font-medium text-foreground">
                {{ data.civilStatus || "Not specified" }}
              </p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Nationality</p>
              <p class="font-medium text-foreground">
                {{ data.nationality || "Not specified" }}
              </p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Religion</p>
              <p class="font-medium text-foreground">
                {{ data.religion || "Not specified" }}
              </p>
            </div>
          </div>
        </div>

        <hr class="my-4" />

        <!-- Contact Information -->
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div class="flex items-start gap-2">
            <svg
              class="mt-1 h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <p class="text-sm text-muted-foreground">Address</p>
              <p class="font-medium text-foreground">{{ fullAddress }}</p>
            </div>
          </div>
          <div class="flex items-start gap-2">
            <svg
              class="mt-1 h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <div>
              <p class="text-sm text-muted-foreground">Mobile Number</p>
              <p class="font-medium text-foreground">
                {{ data.mobileNumber || "Not specified" }}
              </p>
            </div>
          </div>
          <div class="flex items-start gap-2">
            <svg
              class="mt-1 h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div>
              <p class="text-sm text-muted-foreground">Email</p>
              <p class="font-medium text-foreground">
                {{ data.email || "Not specified" }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Educational Background -->
    <div class="rounded-lg border bg-card">
      <div class="border-b px-4 py-3">
        <h4
          class="flex items-center gap-2 text-base font-semibold text-card-foreground"
        >
          <svg
            class="h-5 w-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Educational Background
        </h4>
      </div>
      <div class="p-4">
        <div class="grid gap-4 md:grid-cols-1">
          <div>
            <p class="text-sm text-muted-foreground">LRN</p>
            <p class="font-medium text-foreground">
              {{ data.lrn || "Not specified" }}
            </p>
          </div>
        </div>

        <template v-if="data.schoolHistory.length > 0">
          <hr class="my-4" />
          <div>
            <p class="mb-2 text-sm font-medium text-muted-foreground">
              Schools Attended
            </p>
            <div class="space-y-2">
              <div
                v-for="school in data.schoolHistory"
                :key="school.id"
                class="rounded-md bg-muted/50 p-3"
              >
                <p class="font-medium text-foreground">
                  {{ school.schoolName }}
                </p>
                <p class="text-sm text-muted-foreground">
                  {{ school.address }} | {{ school.yearOfGraduation }} | GWA:
                  {{ school.gwa || "N/A" }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Family Information -->
    <div class="rounded-lg border bg-card">
      <div class="border-b px-4 py-3">
        <h4
          class="flex items-center gap-2 text-base font-semibold text-card-foreground"
        >
          <svg
            class="h-5 w-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          Family Information
        </h4>
      </div>
      <div class="grid gap-4 p-4 md:grid-cols-2">
        <div>
          <p class="text-sm text-muted-foreground">Father's Name</p>
          <p class="font-medium text-foreground">
            {{ data.fatherName || "Not specified" }}
          </p>
          <p v-if="data.fatherOccupation" class="text-sm text-muted-foreground">
            Occupation: {{ data.fatherOccupation }}
          </p>
        </div>
        <div>
          <p class="text-sm text-muted-foreground">Mother's Name</p>
          <p class="font-medium text-foreground">
            {{ data.motherName || "Not specified" }}
          </p>
          <p v-if="data.motherOccupation" class="text-sm text-muted-foreground">
            Occupation: {{ data.motherOccupation }}
          </p>
        </div>
        <div v-if="data.guardianName" class="md:col-span-2">
          <p class="text-sm text-muted-foreground">Guardian's Name</p>
          <p class="font-medium text-foreground">{{ data.guardianName }}</p>
        </div>
        <div class="md:col-span-2">
          <p class="text-sm text-muted-foreground">Emergency Contact</p>
          <p class="font-medium text-foreground">
            {{ data.emergencyContactName || "Not specified" }}
            <template v-if="data.emergencyContactMobile">
              - {{ data.emergencyContactMobile }}
            </template>
          </p>
        </div>
        <div v-if="data.siblings.length > 0" class="md:col-span-2">
          <p class="text-sm text-muted-foreground">
            Number of Siblings: {{ data.siblings.length }}
          </p>
        </div>
      </div>
    </div>

    <!-- Agreement -->
    <div class="rounded-lg border border-primary/20 bg-primary/5 p-6">
      <h4 class="mb-4 font-semibold text-foreground">By clicking the box,</h4>

      <div class="space-y-4 text-sm text-muted-foreground">
        <p>
          I confirm that I have read, understood and accepted the Admission
          Policies of the Department I am applying to.
        </p>
        <p>
          I understand that my application will be evaluated based on the
          policies set by the department I am applying to.
        </p>
        <p>
          I certify that the foregoing information and credentials that I will
          submit are true and complete to the best of my knowledge.
        </p>
        <p>
          I am aware that omission or falsification of any information and
          credentials will be considered sufficient reason for rejection of this
          application or for dismissal, even if already admitted.
        </p>
        <p>I agree with the Privacy Policy of the University.</p>
      </div>

      <div
        class="mt-6 flex items-start space-x-3 rounded-lg border bg-background p-4"
      >
        <input
          type="checkbox"
          id="agree"
          :checked="data.hasAgreedToTerms"
          class="mt-1 h-4 w-4 rounded accent-primary"
          @change="
            emit('update', {
              hasAgreedToTerms: ($event.target as HTMLInputElement).checked,
            })
          "
        />
        <label
          for="agree"
          class="text-sm font-medium leading-relaxed text-foreground"
        >
          I have read and agree to the terms and conditions stated above. I
          confirm that all information provided in this application is accurate
          and complete.
        </label>
      </div>
    </div>
  </div>
</template>
