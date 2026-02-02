<script setup lang="ts">
import {
  type ApplicationData,
  NATIONALITIES,
  RELIGIONS,
  PROVINCES,
  VACCINATION_STATUS,
  CIVIL_STATUS,
  SPORTS,
  ARTS,
  TECHNICAL,
} from "../types/admission";

import Input from "../../../components/ui/input.vue";
import Dropdown from "../../../components/ui/dropdown.vue";
import Button from "../../../components/ui/button.vue";

defineProps<{
  data: ApplicationData;
  errors: Record<string, string>;
}>();

const emit = defineEmits<{
  (e: "update", data: Partial<ApplicationData>): void;
  (e: "next"): void;
  (e: "prev"): void;
}>();

const updateField = (field: keyof ApplicationData, value: any) => {
  emit("update", { [field]: value });
};
</script>

<template>
  <div class="space-y-8">
    <section>
      <h3 class="mb-4 text-lg font-semibold text-foreground">
        Basic Information
      </h3>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Surname <span class="text-red-500">*</span></label
          >
          <Input
            :model-value="data.surname"
            :error="errors.surname"
            placeholder="Last name"
            @update:model-value="(v) => updateField('surname', v)"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Given Name <span class="text-red-500">*</span></label
          >
          <Input
            :model-value="data.givenName"
            :error="errors.givenName"
            placeholder="First name"
            @update:model-value="(v) => updateField('givenName', v)"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Middle Name</label>
          <Input
            :model-value="data.middleName"
            :error="errors.middleName"
            placeholder="Middle name"
            @update:model-value="(v) => updateField('middleName', v)"
          />
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="space-y-2">
            <label class="text-sm font-medium text-foreground">M.I.</label>
            <Input
              :model-value="data.middleInitial"
              :error="errors.middleInitial"
              maxlength="2"
              @update:model-value="(v) => updateField('middleInitial', v)"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-foreground">Ext.</label>
            <Input
              :model-value="data.nameExtension"
              placeholder="Jr./Sr."
              @update:model-value="(v) => updateField('nameExtension', v)"
            />
          </div>
        </div>
      </div>

      <div class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Date of Birth <span class="text-red-500">*</span></label
          >
          <Input
            type="date"
            :model-value="data.dateOfBirth"
            :error="errors.dateOfBirth"
            @update:model-value="(v) => updateField('dateOfBirth', v)"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Place of Birth <span class="text-red-500">*</span></label
          >
          <Input
            :model-value="data.placeOfBirth"
            :error="errors.placeOfBirth"
            placeholder="City, Province"
            @update:model-value="(v) => updateField('placeOfBirth', v)"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Gender <span class="text-red-500">*</span></label
          >
          <div class="flex gap-4 pt-2">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="MALE"
                :checked="data.gender === 'MALE'"
                class="h-4 w-4 accent-primary"
                @change="updateField('gender', 'MALE')"
              />
              <span class="text-sm text-foreground">Male</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="FEMALE"
                :checked="data.gender === 'FEMALE'"
                class="h-4 w-4 accent-primary"
                @change="updateField('gender', 'FEMALE')"
              />
              <span class="text-sm text-foreground">Female</span>
            </label>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Civil Status <span class="text-red-500">*</span></label
          >
          <Dropdown
            :options="CIVIL_STATUS"
            :model-value="data.civilStatus"
            :error="errors.civilStatus"
            placeholder="Select Status"
            @update:model-value="(v) => updateField('civilStatus', v)"
          />
        </div>
      </div>
    </section>

    <section class="border-t pt-6">
      <h3 class="mb-4 text-lg font-semibold text-foreground">
        Present Address
      </h3>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-2 md:col-span-2">
          <label class="text-sm font-medium text-foreground"
            >House No., Street Name <span class="text-red-500">*</span></label
          >
          <Input
            :model-value="data.houseStreet"
            :error="errors.houseStreet"
            placeholder="Enter complete address"
            @update:model-value="(v) => updateField('houseStreet', v)"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Province/Region <span class="text-red-500">*</span></label
          >
          <Dropdown
            :options="PROVINCES"
            :model-value="data.province"
            :error="errors.province"
            placeholder="Select Province"
            @update:model-value="(v) => updateField('province', v)"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >City/Municipality <span class="text-red-500">*</span></label
          >
          <Input
            :model-value="data.city"
            :error="errors.city"
            placeholder="Enter city"
            @update:model-value="(v) => updateField('city', v)"
          />
        </div>

        <div class="space-y-2 md:col-span-2">
          <label class="text-sm font-medium text-foreground"
            >Barangay <span class="text-red-500">*</span></label
          >
          <Input
            :model-value="data.barangay"
            :error="errors.barangay"
            placeholder="Enter barangay"
            @update:model-value="(v) => updateField('barangay', v)"
          />
        </div>
      </div>
    </section>

    <section class="border-t pt-6">
      <h3 class="mb-4 text-lg font-semibold text-foreground">
        Other Personal Details
      </h3>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Nationality <span class="text-red-500">*</span></label
          >
          <Dropdown
            :options="NATIONALITIES"
            :model-value="data.nationality"
            :error="errors.nationality"
            placeholder="Select Nationality"
            @update:model-value="(v) => updateField('nationality', v)"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Religion <span class="text-red-500">*</span></label
          >
          <Dropdown
            :options="RELIGIONS"
            :model-value="data.religion"
            :error="errors.religion"
            placeholder="Select Religion"
            @update:model-value="(v) => updateField('religion', v)"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Ethnic Affiliation</label
          >
          <Input
            :model-value="data.ethnicAffiliation"
            placeholder="Enter if applicable"
            @update:model-value="(v) => updateField('ethnicAffiliation', v)"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Telephone Number</label
          >
          <Input
            type="tel"
            :model-value="data.telephoneNumber"
            placeholder="(000) 000-0000"
            @update:model-value="(v) => updateField('telephoneNumber', v)"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Mobile Number <span class="text-red-500">*</span></label
          >
          <Input
            type="tel"
            :model-value="data.mobileNumber"
            :error="errors.mobileNumber"
            placeholder="+63 9XX XXX XXXX"
            @update:model-value="(v) => updateField('mobileNumber', v)"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Email <span class="text-red-500">*</span></label
          >
          <Input
            type="email"
            :model-value="data.email"
            :error="errors.email"
            placeholder="example@gmail.com"
            @update:model-value="(v) => updateField('email', v)"
          />
        </div>
      </div>

      <p class="mt-2 text-xs text-muted-foreground">
        * Provide the newly created e-mail address following this format:
        LastName.FirstName(special character)@gmail.com
      </p>
    </section>

    <section class="border-t pt-6">
      <h3 class="mb-4 text-lg font-semibold text-foreground">
        Additional Information
      </h3>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Are you a Solo Parent?</label
          >
          <div class="flex gap-4 pt-2">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="soloParent"
                :checked="!data.isSoloParent"
                class="h-4 w-4 accent-primary"
                @change="updateField('isSoloParent', false)"
              />
              <span class="text-sm text-foreground">No</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="soloParent"
                :checked="data.isSoloParent"
                class="h-4 w-4 accent-primary"
                @change="updateField('isSoloParent', true)"
              />
              <span class="text-sm text-foreground">Yes</span>
            </label>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Child of Solo Parent?</label
          >
          <div class="flex gap-4 pt-2">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="childSoloParent"
                :checked="!data.isChildOfSoloParent"
                class="h-4 w-4 accent-primary"
                @change="updateField('isChildOfSoloParent', false)"
              />
              <span class="text-sm text-foreground">No</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="childSoloParent"
                :checked="data.isChildOfSoloParent"
                class="h-4 w-4 accent-primary"
                @change="updateField('isChildOfSoloParent', true)"
              />
              <span class="text-sm text-foreground">Yes</span>
            </label>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Philhealth Member?</label
          >
          <div class="flex gap-4 pt-2">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="philhealth"
                :checked="!data.isPhilhealthMember"
                class="h-4 w-4 accent-primary"
                @change="updateField('isPhilhealthMember', false)"
              />
              <span class="text-sm text-foreground">No</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="philhealth"
                :checked="data.isPhilhealthMember"
                class="h-4 w-4 accent-primary"
                @change="updateField('isPhilhealthMember', true)"
              />
              <span class="text-sm text-foreground">Yes</span>
            </label>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground"
            >Vaccination Status *</label
          >
          <Dropdown
            :options="VACCINATION_STATUS"
            :model-value="data.vaccinationStatus"
            placeholder="Select Status"
            @update:model-value="(v) => updateField('vaccinationStatus', v)"
          />
        </div>

        <div class="space-y-2 lg:col-span-2">
          <label class="text-sm font-medium text-foreground"
            >Member of Indigenous Peoples Community?</label
          >
          <div class="flex items-center gap-4">
            <div class="flex gap-4">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="indigenous"
                  :checked="!data.isIndigenous"
                  class="h-4 w-4 accent-primary"
                  @change="updateField('isIndigenous', false)"
                />
                <span class="text-sm text-foreground">No</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="indigenous"
                  :checked="data.isIndigenous"
                  class="h-4 w-4 accent-primary"
                  @change="updateField('isIndigenous', true)"
                />
                <span class="text-sm text-foreground">Yes</span>
              </label>
            </div>

            <Input
              v-if="data.isIndigenous"
              :model-value="data.indigenousGroup"
              placeholder="Specify group"
              class="max-w-[200px]"
              @update:model-value="(v) => updateField('indigenousGroup', v)"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="border-t pt-6">
      <h3 class="mb-4 text-lg font-semibold text-foreground">
        Special Skills and Talents
      </h3>

      <div class="grid gap-4 md:grid-cols-3">
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Sports</label>
          <Dropdown
            :options="SPORTS"
            :model-value="data.sports"
            placeholder="Select Sport"
            @update:model-value="(v) => updateField('sports', v)"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Arts</label>
          <Dropdown
            :options="ARTS"
            :model-value="data.arts"
            placeholder="Select Art"
            @update:model-value="(v) => updateField('arts', v)"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">Technical</label>
          <Dropdown
            :options="TECHNICAL"
            :model-value="data.technical"
            placeholder="Select Technical Skill"
            @update:model-value="(v) => updateField('technical', v)"
          />
        </div>
      </div>
    </section>
  </div>
</template>
