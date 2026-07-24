export default {
  base: '/wiki/',
  title: "Википедия ФИТ НГУ",
  description: "Самый большой архив информации, личностей, баек и мемов",
  
  head: [
    // 1. Иконка вкладки
    ['link', { rel: 'icon', type: 'image/png', href: '/wiki/favicon.png' }],
    
    [
      'script',
      { type: 'module' },
      `if (!import.meta.env.SSR) {
        import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs')
          .then((m) => {
            m.default.initialize({ startOnLoad: true });
          });
      }`
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
