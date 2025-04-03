<script setup>
import "./index.css";
import { ref, watch } from 'vue'

const input = ref('')
const output = ref('')
const show = ref(false);

watch(input, async newVal => {
  const encoder = new TextEncoder();
  const data = encoder.encode(newVal);
  const encoded = await crypto.subtle.digest('SHA-256', data);
  const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(encoded)));

  output.value = base64String;
})

function copy() {
  navigator.clipboard.writeText(output.value);
}
</script>

<template>
  <div class="bg-slate-700 text-slate-400 min-h-screen">
    <div class="flex flex-col gap-4 w-10/12 mx-auto py-12">
      <div class="grid grid-cols-6">
        <label for="input">Input:</label>
        <input :type="show ? 'text' : 'password'" name="input" v-model="input" class="border col-span-3" />
        <button @click="show = !show">show</button>
      </div>

      <div class="grid grid-cols-6">
        <label for="output">Output</label>
        <input type="password" name="output" v-model="output" class="col-span-4" />
        <button @click="copy">Copy</button>
      </div>
    </div>
  </div>
</template>
