<script setup>
import {ref, watch} from 'vue'

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
</script>

<template>
  <p>
    Input:
    <input :type="show ? 'text': 'password'" v-model="input"/>
    <button @click="show = !show">show</button>
  </p>

  <p>
    Output:
    <span>{{ output }}</span>

  </p>

</template>

<style scoped>
</style>
