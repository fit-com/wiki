<template>
  <ClientOnly>
    <div ref="mermaidRef" class="mermaid-container">
      <slot></slot>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const mermaidRef = ref(null)

onMounted(() => {
  import('https://jsdelivr.net')
    .then(async (m) => {
      const mermaid = m.default
      mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' })
      
      await nextTick()
      if (mermaidRef.value) {
        const rawCode = mermaidRef.value.innerText.trim()
        mermaidRef.value.innerHTML = ''
        const { svg } = await mermaid.render('mermaid-' + Math.random().toString(36).substr(2, 9), rawCode)
        mermaidRef.value.innerHTML = svg
      }
    })
    .catch(err => console.error('Ошибка:', err))
})
</script>

<style scoped>
.mermaid-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>
