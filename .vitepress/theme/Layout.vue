<script setup>
import DefaultTheme from 'vitepress/theme'
import { onMounted, nextTick } from 'vue'

const { Layout } = DefaultTheme

onMounted(() => {
  nextTick(() => {
    if (document.querySelector('.categories-wrapper')) return

    const searchButton = document.querySelector('.DocSearch-Button')
    if (!searchButton) return

    // Убедимся, что у кнопки поиска есть position: relative
    searchButton.style.position = 'relative'

    // Создаем контейнер для кнопки категорий
    const wrapper = document.createElement('div')
    wrapper.className = 'categories-wrapper'
    wrapper.style.display = 'inline-flex'
    wrapper.style.alignItems = 'center'
    wrapper.style.flexShrink = '0'
    wrapper.style.marginLeft = 'auto'
    wrapper.style.height = '100%'
    wrapper.style.position = 'static'
    
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

    // Меняем текст Search на Поиск
    const placeholder = searchButton.querySelector('.DocSearch-Button-Placeholder')
    if (placeholder) {
      placeholder.textContent = 'Поиск'
    }

    // Обработчики
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
        if (!wrapper.contains(e.target) && !dropdown.contains(e.target)) {
          close()
        }
      })

      dropdown.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', close)
      })
    }
  })
})
</script>

<template>
  <Layout />
</template>
