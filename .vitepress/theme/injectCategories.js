export default {
  mounted() {
    // Ждем загрузки DOM
    setTimeout(() => {
      const navBar = document.querySelector('.VPNavBar .content-body')
      if (!navBar) return

      // Создаем кнопку
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

      // Вставляем после поиска
      const search = navBar.querySelector('.VPNavBarSearch')
      if (search) {
        search.after(wrapper)
      } else {
        navBar.appendChild(wrapper)
      }

      // Добавляем функциональность
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

        // Закрытие при клике вне
        document.addEventListener('click', (e) => {
          if (!wrapper.contains(e.target)) {
            close()
          }
        })

        // Закрытие при клике на ссылку
        dropdown.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', close)
        })
      }
    }, 100)
  }
}
