<script setup lang="ts">
import useDebounce from "@/composables/useDebounce";
import Textarea from "../components/Textarea.vue"
import Card from "@/components/Card.vue"
import { ref, watch } from "vue"
import type { Content } from "@/assets/types";


const text = ref('')
const urlScraped = ref<string>("")


const { debouncedValue } = useDebounce(text, 500)

let controller = new AbortController()

const content = ref<Content>({
  title: "",
  description: "",
  imageUrl: ""
})

const pending = ref<boolean>(false)

watch(debouncedValue, (newText: string) => {
  fetchContent()
})

function fetchContent() {

  const urls = debouncedValue.value.match(/\bhttps?:\/\/\S+/gi);

  if (!urls || (urls && urls[0] == urlScraped.value)) {
    content.value = {
      title: "",
      description: "",
      imageUrl: ""
    }
    pending.value = false
    return
  }

  pending.value = true

  urlScraped.value = urls[0]

  controller.abort()
  controller = new AbortController()



  fetch("http://localhost:3000/preview", {
    method: "POST",
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: debouncedValue.value })
  }).then(response => response.json()).then(data => {
    content.value = {
      title: data.title,
      description: data.description,
      imageUrl: data.images[0]
    }
    pending.value = false
  }).catch(error => {
    content.value = {
      title: "",
      description: "",
      imageUrl: ""
    }
    pending.value = false
  })

}

</script>

<template>
  <main class="max-w-4xl mx-auto my-20">
    <Textarea v-model="text" />
    <div class="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-x-8 gap-y-20 lg:mx-0">
      <Card :pending="pending" :content="content" />
    </div>
  </main>
</template>
