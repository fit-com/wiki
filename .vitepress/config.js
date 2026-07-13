export default {
  base: '/wiki/',
  title: "Википедия ФИТ НГУ",
  description: "Самый большой архив информации, личностей, баек и мемов",
  
  head: [
    // 1. Иконка вкладки
    ['link', { rel: 'icon', type: 'image/png', href: '/wiki/favicon.png' }],
    
    // Агрессивная инъекция стилей фона через псевдоэлемент
    [
      'style', 
      {}, 
      `
      /* Создаем независимую подложку для картинки ПОД всем сайтом */
      html::before {
        content: "" !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: -1000 !important; /* Уносим в самый низ под все слои */
        background-image: url('/wiki/bg.png') !important;
        background-size: cover !important;
        background-position: center center !important;
        background-repeat: no-repeat !important;
      }

      /* Стираем дефолтные фоны у ВСЕХ корневых контейнеров VitePress, чтобы они стали прозрачными стеклами */
      html, body, #app, .VPApp, .VPLayout, .Layout, #VitePress-app {
        background: transparent !important;
        background-color: transparent !important;
      }

      /* Задаем жесткий НЕПРОЗРАЧНЫЙ белый фон для контента и сайдбара (СВЕТЛАЯ ТЕМА) */
      .VPContent, .VPSidebar, .VPDoc, .vp-doc, main, .container { 
        background-color: #ffffff !important; 
      }
      .VPContent { 
        box-shadow: 0 0 30px rgba(0,0,0,0.08) !important; 
      }

      /* Задаем жесткий НЕПРОЗРАЧНЫЙ темно-серый фон для контента и сайдбара (ТЁМНАЯ ТЕМА) */
      .dark .VPContent, .dark .VPSidebar, .dark .VPDoc, .dark .vp-doc, .dark main, .dark .container { 
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
