export default {
  base: '/wiki/',
  title: "Википедия ФИТ НГУ",
  description: "Самый большой архив информации, личностей, баек и мемов",
  
  head: [
    // 1. Иконка вкладки
    ['link', { rel: 'icon', type: 'image/png', href: '/wiki/favicon.png' }],
    
    // 2. Агрессивная инъекция стилей фона
    [
      'style', 
      {}, 
      `
      /* Насильно обнуляем фон у ВСЕХ оберток VitePress, включая Layout и внутренние слои темы */
      html, body, #app, .VPApp, .VPLayout, .Layout, #VitePress-app {
        background-color: transparent !important;
        background-image: url('/wiki/bg.png') !important;
        background-size: cover !important;
        background-position: center center !important;
        background-attachment: fixed !important;
        background-repeat: no-repeat !important;
      }

      /* Возвращаем сплошной НЕПРОЗРАЧНЫЙ белый фон для текста статьи и левого меню (СВЕТЛАЯ ТЕМА) */
      .VPContent, .VPSidebar, .VPDoc, .vp-doc { 
        background-color: #ffffff !important; 
      }
      .VPContent { 
        box-shadow: 0 0 30px rgba(0,0,0,0.08) !important; 
      }

      /* Возвращаем сплошной НЕПРОЗРАЧНЫЙ темно-серый фон для текста и меню (ТЁМНАЯ ТЕМА) */
      .dark .VPContent, .dark .VPSidebar, .dark .VPDoc, .dark .vp-doc { 
        background-color: #1e1e20 !important; 
      }
      .dark .VPContent { 
        box-shadow: 0 0 30px rgba(0,0,0,0.4) !important; 
      }
      `
    ]
  ],

  themeConfig: {
    logo: '/favicon.png', // Иконка появится еще и в шапке сайта
    
    // Включаем встроенный поиск по всем статьям
    search: {
      provider: 'local'
    },

    // Настраиваем левое меню (Sidebar)
    sidebar: [
      {
        text: '➕ Добавить контент',
        items: [
          { 
            text: '✨ Написать новую статью', 
            link: 'https://github.com/fit-com/wiki/new/main' 
          }
        ]
      },
      {
        text: '👨‍🏫 Преподаватели',
        items: [
          { text: 'Епишин И.С.', link: '/epishin' }
        ]
      },
      {
        text: '🎭 События',
        items: []
      },
      { 
        text: '🛠️ Предметы',
        items: []
      },
      { 
        text: '🏢 Корпуса и аудитории',
        items: []
      }
    ],

    editLink: {
      pattern: 'https://github.com/fit-com/wiki/edit/main/:path',
      text: 'Редактировать эту страницу на GitHub'
    }
  }
}
