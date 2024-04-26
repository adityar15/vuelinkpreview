<template>
    <div class="max-w-4xl mx-auto p-5">
        <form class="flex flex-col gap-2">
            <FileInput @upload="uploadFile" />
            <ProgressBar :progress="loaded" />
        </form>


        <div class="mt-4">
            <p class="text-lg text-center text-green-500">{{ msg }}</p>
        </div>

    </div>
</template>

<script setup lang="ts">
import FileInput from "@/components/FileInput.vue"
import ProgressBar from "@/components/ProgressBar.vue"
import { ref } from "vue"


const loaded = ref(0);
const msg = ref('')

function uploadFile(file: File) {


    const formData = new FormData()
    formData.append("file", file)


    const es = new EventSource('http://localhost:3000/uploadprogress');
    es.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.progress) {
            loaded.value = (data.progress.loaded / data.progress.total) * 100;
            // total.value = data.progress.total;
        } else if (data.url) {
            console.log('File uploaded:', data.url);
            es.close();
        } else if (data.error) {
            console.error('Upload error:', data.error);
            es.close();
        }
    };

    fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
    }).then(response => response.json())
        .then(data => {
            msg.value = data.message
        })
        .catch(error => console.error('Error:', error));
}

</script>

<style scoped></style>