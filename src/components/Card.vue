<template>
    <article class="flex flex-col items-start justify-between relative">


        <div class="relative w-full">
            <img :src="content.imageUrl" :alt="content.title" v-if="content.imageUrl" loading="lazy"
                class=" aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
            <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            <div v-if="pending" class="absolute inset-0 flex items-center justify-center h-full w-full bg-gray-100">
                <ArrowPathIcon class="size-8 animate-spin text-gray-600" />
            </div>

        </div>
        <div class="max-w-xl">

            <div class="group relative">
                <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span class="absolute inset-0" />
                    {{ content.title }}
                </h3>
                <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ content.description }}</p>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import type { Content } from '@/assets/types';
import { ArrowPathIcon } from "@heroicons/vue/24/outline"



defineProps<{
    content: Content
    pending: boolean
}>()

</script>

<style scoped></style>