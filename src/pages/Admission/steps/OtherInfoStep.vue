<script setup lang="ts">
import { ref } from "vue";
import { type ApplicationData, REQUIRED_DOCUMENTS } from "../types/admission";

defineProps<{
  data: ApplicationData;
}>();

const emit = defineEmits<{
  (e: "update", data: Partial<ApplicationData>): void;
}>();

const uploadedFiles = ref<{ [key: string]: string }>({});

const handleFileUpload = (docName: string, event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    uploadedFiles.value[docName] = file.name;
  }
};

const removeFile = (docName: string) => {
  delete uploadedFiles.value[docName];
};
</script>

<template>
  <div class="space-y-8">
    <!-- How Did You Know -->
    <section>
      <h3 class="mb-4 text-lg font-semibold text-foreground">
        How Did You Know About Our University?
      </h3>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-3">
          <label class="flex items-center space-x-2">
            <input
              type="checkbox"
              :checked="data.howDidYouKnow === 'Social Media'"
              class="h-4 w-4 rounded accent-primary"
              @change="emit('update', { howDidYouKnow: 'Social Media' })"
            />
            <span class="text-sm text-foreground">Social Media</span>
          </label>

          <label class="flex items-center space-x-2">
            <input
              type="checkbox"
              :checked="data.howDidYouKnow === 'Referral / Recommendation'"
              class="h-4 w-4 rounded accent-primary"
              @change="
                emit('update', { howDidYouKnow: 'Referral / Recommendation' })
              "
            />
            <span class="text-sm text-foreground"
              >Referral / Recommendation</span
            >
          </label>

          <label class="flex items-center space-x-2">
            <input
              type="checkbox"
              :checked="data.howDidYouKnow === 'Walk-In'"
              class="h-4 w-4 rounded accent-primary"
              @change="emit('update', { howDidYouKnow: 'Walk-In' })"
            />
            <span class="text-sm text-foreground">Walk-In</span>
          </label>

          <label class="flex items-center space-x-2">
            <input
              type="checkbox"
              :checked="data.howDidYouKnow === 'Others'"
              class="h-4 w-4 rounded accent-primary"
              @change="emit('update', { howDidYouKnow: 'Others' })"
            />
            <span class="text-sm text-foreground">Others</span>
          </label>
        </div>

        <div class="space-y-2">
          <label for="reason" class="text-sm font-medium text-foreground"
            >Reason for Applying at Our University</label
          >
          <textarea
            id="reason"
            :value="data.reasonForApplying"
            placeholder="Please share your reasons for choosing our university..."
            class="min-h-[100px] w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                reasonForApplying: ($event.target as HTMLTextAreaElement).value,
              })
            "
          />
        </div>
      </div>

      <div class="mt-4 space-y-2">
        <label for="coordinator" class="text-sm font-medium text-foreground"
          >Site Coordinator</label
        >
        <select
          id="coordinator"
          :value="data.siteCoordinator"
          class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          @change="
            emit('update', {
              siteCoordinator: ($event.target as HTMLSelectElement).value,
            })
          "
        >
          <option value="">Please select coordinator</option>
          <option value="No Coordinator">No Coordinator</option>
          <option value="Coordinator 1">Coordinator 1</option>
          <option value="Coordinator 2">Coordinator 2</option>
          <option value="Coordinator 3">Coordinator 3</option>
        </select>
      </div>
    </section>

    <!-- For Transferee -->
    <section class="border-t pt-6">
      <h3 class="mb-4 text-lg font-semibold text-foreground">For Transferee</h3>

      <div class="space-y-4">
        <div class="space-y-2">
          <label for="leavingReason" class="text-sm font-medium text-foreground"
            >Reason for leaving other school</label
          >
          <textarea
            id="leavingReason"
            :value="data.reasonForLeaving"
            placeholder="Enter reason..."
            class="min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            @input="
              emit('update', {
                reasonForLeaving: ($event.target as HTMLTextAreaElement).value,
              })
            "
          />
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <label class="text-sm font-medium text-foreground"
              >Has the child ever been a repeater?</label
            >
            <div class="flex items-center gap-4">
              <div class="flex gap-4">
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="repeater"
                    :checked="!data.hasBeenRepeater"
                    class="h-4 w-4 accent-primary"
                    @change="emit('update', { hasBeenRepeater: false })"
                  />
                  <span class="text-sm text-foreground">No</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="repeater"
                    :checked="data.hasBeenRepeater"
                    class="h-4 w-4 accent-primary"
                    @change="emit('update', { hasBeenRepeater: true })"
                  />
                  <span class="text-sm text-foreground">Yes</span>
                </label>
              </div>
              <input
                v-if="data.hasBeenRepeater"
                type="text"
                :value="data.repeaterGrade"
                placeholder="Which grade?"
                class="max-w-[150px] rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                @input="
                  emit('update', {
                    repeaterGrade: ($event.target as HTMLInputElement).value,
                  })
                "
              />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-foreground"
              >Or dropped from school?</label
            >
            <div class="flex items-center gap-4">
              <div class="flex gap-4">
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="dropped"
                    :checked="!data.hasDropped"
                    class="h-4 w-4 accent-primary"
                    @change="emit('update', { hasDropped: false })"
                  />
                  <span class="text-sm text-foreground">No</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="dropped"
                    :checked="data.hasDropped"
                    class="h-4 w-4 accent-primary"
                    @change="emit('update', { hasDropped: true })"
                  />
                  <span class="text-sm text-foreground">Yes</span>
                </label>
              </div>
              <input
                v-if="data.hasDropped"
                type="text"
                :value="data.droppedGrade"
                placeholder="Which grade?"
                class="max-w-[150px] rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                @input="
                  emit('update', {
                    droppedGrade: ($event.target as HTMLInputElement).value,
                  })
                "
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Alumni Connection -->
    <section class="border-t pt-6">
      <h3 class="mb-4 text-lg font-semibold text-foreground">
        Alumni Connection
      </h3>

      <div class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-medium text-foreground">
            Do you have any family member, relative and/or friend who is a
            graduate of our university?
          </label>
          <div class="flex gap-4">
            <label class="flex items-center space-x-2">
              <input
                type="radio"
                name="alumni"
                :checked="!data.hasAlumniConnection"
                class="h-4 w-4 accent-primary"
                @change="emit('update', { hasAlumniConnection: false })"
              />
              <span class="text-sm text-foreground">No</span>
            </label>
            <label class="flex items-center space-x-2">
              <input
                type="radio"
                name="alumni"
                :checked="data.hasAlumniConnection"
                class="h-4 w-4 accent-primary"
                @change="emit('update', { hasAlumniConnection: true })"
              />
              <span class="text-sm text-foreground">Yes</span>
            </label>
          </div>
        </div>

        <div v-if="data.hasAlumniConnection" class="grid gap-4 md:grid-cols-2">
          <div class="space-y-2">
            <label for="alumniName" class="text-sm font-medium text-foreground"
              >Name</label
            >
            <input
              id="alumniName"
              type="text"
              :value="data.alumniName"
              placeholder="Full name"
              class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
              @input="
                emit('update', {
                  alumniName: ($event.target as HTMLInputElement).value,
                })
              "
            />
          </div>

          <div class="space-y-2">
            <label
              for="alumniContact"
              class="text-sm font-medium text-foreground"
              >Contact Number</label
            >
            <input
              id="alumniContact"
              type="tel"
              :value="data.alumniContact"
              placeholder="+63 9XX XXX XXXX"
              class="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
              @input="
                emit('update', {
                  alumniContact: ($event.target as HTMLInputElement).value,
                })
              "
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Required Documents -->
    <section class="border-t pt-6">
      <h3 class="mb-4 text-lg font-semibold text-foreground">
        Required Admission Documents
      </h3>

      <div class="mb-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div class="flex items-start gap-2">
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <ul
            class="list-inside list-disc space-y-1 text-sm text-muted-foreground"
          >
            <li>Maximum of 1MB file size per upload</li>
            <li>
              File format in JPEG (.jpg), PNG & PDF are the only acceptable
              files for upload
            </li>
          </ul>
        </div>
      </div>

      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <thead class="bg-muted/50">
            <tr>
              <th
                class="w-[40px] px-4 py-3 text-left font-medium text-foreground"
              >
                #
              </th>
              <th class="px-4 py-3 text-left font-medium text-foreground">
                Document Name
              </th>
              <th class="px-4 py-3 text-left font-medium text-foreground">
                Attachment
              </th>
              <th
                class="w-[120px] px-4 py-3 text-left font-medium text-foreground"
              >
                Upload
              </th>
              <th class="px-4 py-3 text-left font-medium text-foreground">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(doc, index) in REQUIRED_DOCUMENTS"
              :key="doc.name"
              class="border-t"
            >
              <td class="px-4 py-3 font-medium text-foreground">
                {{ index + 1 }}
              </td>
              <td class="px-4 py-3 text-foreground">
                <span>{{ doc.name }}</span>
                <span v-if="doc.required" class="ml-1 text-destructive">*</span>
              </td>
              <td class="px-4 py-3">
                <div
                  v-if="uploadedFiles[doc.name]"
                  class="flex items-center gap-2"
                >
                  <svg
                    class="h-4 w-4 text-primary"
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
                  <span class="text-sm">{{ uploadedFiles[doc.name] }}</span>
                  <button
                    type="button"
                    class="text-destructive hover:text-destructive/80"
                    @click="removeFile(doc.name)"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <span v-else class="text-sm text-muted-foreground"
                  >No file</span
                >
              </td>
              <td class="px-4 py-3">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  class="hidden"
                  :id="`file-${index}`"
                  @change="handleFileUpload(doc.name, $event)"
                />
                <label
                  :for="`file-${index}`"
                  class="inline-flex cursor-pointer items-center gap-1 rounded-md border bg-transparent px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <svg
                    class="h-3 w-3"
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
                  Upload
                </label>
              </td>
              <td class="px-4 py-3">
                <span class="text-sm text-muted-foreground">
                  {{ doc.required ? "Required" : "Optional" }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <p class="text-center text-sm text-muted-foreground">
      Reminder: Please check your registered email regularly for updates.
    </p>
  </div>
</template>
