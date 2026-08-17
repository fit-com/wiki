<script>
import DefaultTheme from 'vitepress/theme'
import { onMounted, nextTick } from 'vue'

const { Layout } = DefaultTheme

export default {
  name: 'CustomLayout',
  components: {
    Layout
  },
  setup() {
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
              <span class="category-icon">🏢</span> Корпуса
            </a>
            <a href="/wiki/structure/" class="category-item">
              <span class="category-icon">💼</span> Структура
            </a>
            <a href="/wiki/communities/" class="category-item">
              <span class="category-icon">🧑‍🤝‍🧑</span> Сообщества
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
        // 2. ДОБАВЛЯЕМ КНОПКУ "+" СПРАВА В ШАПКЕ
        // ============================================
        const navBar = document.querySelector('.VPNavBar')
        if (!navBar) return

        if (document.querySelector('.add-button-wrapper')) return

        navBar.style.position = 'relative'

        const addButtonWrapper = document.createElement('div')
        addButtonWrapper.className = 'add-button-wrapper'
        addButtonWrapper.style.cssText = `
          position: absolute;
          top: 50%;
          right: 16px;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          z-index: 100;
          pointer-events: auto !important;
        `

        const addButton = document.createElement('a')
        addButton.href = '/wiki/#Добавить-контент'
        addButton.className = 'add-button'
        addButton.innerHTML = '➕'
        addButton.title = 'Добавить контент'
        addButton.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #2c2c2e;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 20px;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
          user-select: none;
          pointer-events: auto !important;
        `

        addButton.addEventListener('mouseenter', () => {
          addButton.style.background = '#3c3c3e'
          addButton.style.borderColor = 'rgba(255, 255, 255, 0.2)'
        })
        addButton.addEventListener('mouseleave', () => {
          addButton.style.background = '#2c2c2e'
          addButton.style.borderColor = 'rgba(255, 255, 255, 0.1)'
        })

        addButtonWrapper.appendChild(addButton)
        navBar.appendChild(addButtonWrapper)

        // ============================================
        // 3. СКРЫВАЕМ ВСПЛЫВАЮЩЕЕ МЕНЮ НА МОБИЛЬНЫХ
        // ============================================
        function hideMobileMenu() {
          const isMobile = window.innerWidth <= 768
          const navScreen = document.querySelector('.VPNavScreen')
          
          if (isMobile && navScreen) {
            navScreen.style.display = 'none !important'
            navScreen.style.visibility = 'hidden !important'
            navScreen.style.opacity = '0 !important'
            navScreen.style.pointerEvents = 'none !important'
          } else if (navScreen) {
            navScreen.style.display = ''
            navScreen.style.visibility = ''
            navScreen.style.opacity = ''
            navScreen.style.pointerEvents = ''
          }
        }

        // Вызываем при загрузке
        hideMobileMenu()

        // Вызываем при изменении размера окна
        let resizeTimer
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer)
          resizeTimer = setTimeout(hideMobileMenu, 100)
        })

        // Дополнительно скрываем кнопку гамбургера на мобильных
        const style = document.createElement('style')
        style.textContent = `
          @media (max-width: 768px) {
            .VPNavBarSidebarToggle {
              display: none !important;
            }
            .VPNavScreen {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
          }
        `
        document.head.appendChild(style)

        // ============================================
        // 4. ПЕРЕМЕЩЕНИЕ ОГЛАВЛЕНИЯ
        // ============================================
        const outline = document.querySelector('.VPDocAsideOutline')
        if (!outline) return
        
        const firstHeading = document.querySelector('.vp-doc h1')
        if (!firstHeading) return
        
        let nextElement = firstHeading.nextElementSibling
        while (nextElement && !nextElement.textContent.trim()) {
          nextElement = nextElement.nextElementSibling
        }
        
        const insertTarget = nextElement || firstHeading
        
        const outlineClone = outline.cloneNode(true)
        outlineClone.classList.add('inline-outline')
        
        insertTarget.parentNode.insertBefore(outlineClone, insertTarget.nextSibling)
        
        outline.style.display = 'none'
        
        const aside = document.querySelector('.VPDoc .aside')
        if (aside) {
          aside.style.display = 'none'
        }
      })
    })
  }
}
</script>

<template>
  <Layout />
</template>
