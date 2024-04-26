<template>

    <div class="bg-gray-200 h-2 w-full rounded-full">
        <div class="bg-blue-500 h-2 rounded-full" :style="`width: ${progress}%;`"></div>
    </div>

</template>

<script setup lang="ts">

type Props = {
    progress: number
}


withDefaults(defineProps<Props>(), {
    progress: 0
})


</script>

<style scoped></style>