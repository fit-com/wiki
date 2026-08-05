<script setup>
import DefaultTheme from 'vitepress/theme'
import { onMounted, nextTick } from 'vue'

const { Layout } = DefaultTheme

onMounted(() => {
  nextTick(() => {
    // ============================================
    // 1. СУЩЕСТВУЮЩИЙ КОД ДЛЯ КАТЕГОРИЙ
    // ============================================
    if (document.querySelector('.categories-wrapper')) return

    const searchButton = document.querySelector('.DocSearch-Button')
    if (!searchButton) return

    searchButton.style.position = 'relative'
    searchButton.style.padding = '0 4px 0 12px'
    searchButton.style.boxSizing = 'border-box'

    const wrapper = document.createElement('div')
    wrapper.className = 'categories-wrapper'
    wrapper.style.position = 'relative'
    wrapper.style.display = 'inline-flex'
    wrapper.style.alignItems = 'center'
    wrapper.style.marginLeft = 'auto'
    wrapper.style.height = '100%'
    
    wrapper.innerHTML = `
      <div class="categories-button" id="categoriesToggle">
        <span class="categories-icon">📂</span>
        <span class="categories-text">Категории</span>
        <span class="arrow">▼</span>
      </div>
      <div class="categories-dropdown" id="categoriesDropdown">
        <a href="/wiki/teachers/" class="category-item">
          <span class="category-icon">👨‍🏫</span> Преподаватели
        </a>
        <a href="/wiki/events/" class="category-item">
          <span class="category-icon">🎭</span> События
        </a>
        <a href="/wiki/subjects/" class="category-item">
          <span class="category-icon">🛠️</span> Предметы
        </a>
        <a href="/wiki/buildings/" class="category-item">
          <span class="category-icon">🏢</span> Корпуса и аудитории
        </a>
        <div class="dropdown-divider"></div>
        <a href="https://github.com/fit-com/wiki/new/main" class="category-item add-content">
          <span class="category-icon">➕</span> Добавить контент
        </a>
      </div>
    `

    searchButton.appendChild(wrapper)

    const placeholder = searchButton.querySelector('.DocSearch-Button-Placeholder')
    if (placeholder) {
      placeholder.textContent = 'Поиск'
    }

    const toggle = document.getElementById('categoriesToggle')
    const dropdown = document.getElementById('categoriesDropdown')

    if (toggle && dropdown) {
      const open = () => {
        dropdown.classList.add('open')
        toggle.querySelector('.arrow')?.classList.add('open')
      }
      const close = () => {
        dropdown.classList.remove('open')
        toggle.querySelector('.arrow')?.classList.remove('open')
      }

      toggle.addEventListener('click', (e) => {
        e.stopPropagation()
        const isOpen = dropdown.classList.contains('open')
        isOpen ? close() : open()
      })

      document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
          close()
        }
      })

      dropdown.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', close)
      })
    }

    // ============================================
    // 2. НОВЫЙ КОД ДЛЯ ПЕРЕМЕЩЕНИЯ ОГЛАВЛЕНИЯ
    // ============================================
    const outline = document.querySelector('.VPDocAsideOutline')
    if (!outline) return
    
    // Находим первый абзац после h1
    const firstHeading = document.querySelector('.vp-doc h1')
    if (!firstHeading) return
    
    // Находим следующий элемент после h1 (это может быть абзац или div)
    let nextElement = firstHeading.nextElementSibling
    // Пропускаем пустые элементы и ищем первый абзац с текстом
    while (nextElement && !nextElement.textContent.trim()) {
      nextElement = nextElement.nextElementSibling
    }
    
    // Если есть следующий элемент - вставляем после него, иначе после h1
    const insertTarget = nextElement || firstHeading
    
    const outlineClone = outline.cloneNode(true)
    outlineClone.classList.add('inline-outline')
    
    // Вставляем после найденного элемента
    insertTarget.parentNode.insertBefore(outlineClone, insertTarget.nextSibling)
    
    // Скрываем оригинал
    outline.style.display = 'none'
    
    const aside = document.querySelector('.VPDoc .aside')
    if (aside) {
      aside.style.display = 'none'
    }
  })
})
</script>

<template>
  <Layout />
</template>
