<template>
  <label class="block">
    <span class="sr-only">Upload file</span>
    <input type="file" @input="handleFileUpload" class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    " />
  </label>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'upload', file: File): void
}>()


function handleFileUpload(event: Event) {
  const file = ((event.currentTarget as HTMLInputElement).files as FileList)[0]
  emit('upload', file)
}

</script>
