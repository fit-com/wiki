<script setup>
import DefaultTheme from 'vitepress/theme'
import { onMounted, nextTick } from 'vue'

const { Layout } = DefaultTheme

onMounted(() => {
  nextTick(() => {
    if (document.querySelector('.categories-wrapper')) return

    const navBar = document.querySelector('.VPNavBar .content-body')
    if (!navBar) return

    const wrapper = document.createElement('div')
    wrapper.className = 'categories-wrapper'
    wrapper.innerHTML = `
      <div class="categories-button" id="categoriesToggle">
        <span class="categories-icon">📂</span>
        Категории
        <span class="arrow">▼</span>
      </div>
      <div class="categories-dropdown" id="categoriesDropdown">
        <a href="/teachers/" class="category-item">
          <span class="category-icon">👨‍🏫</span> Преподаватели
        </a>
        <a href="/events/" class="category-item">
          <span class="category-icon">🎭</span> События
        </a>
        <a href="/subjects/" class="category-item">
          <span class="category-icon">🛠️</span> Предметы
        </a>
        <a href="/buildings/" class="category-item">
          <span class="category-icon">🏢</span> Корпуса и аудитории
        </a>
        <div class="dropdown-divider"></div>
        <a href="https://github.com/fit-com/wiki/new/main" class="category-item add-content">
          <span class="category-icon">➕</span> Добавить контент
        </a>
      </div>
    `

    const search = navBar.querySelector('.VPNavBarSearch')
    if (search) {
      search.after(wrapper)
    } else {
      navBar.appendChild(wrapper)
    }

    // Обработчики (те же)
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
  })
})
</script>

<template>
  <Layout />
</template>
