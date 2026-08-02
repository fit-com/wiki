export default {
  base: '/wiki/',
  title: "Википедия ФИТ НГУ",
  description: "Самый большой архив информации, личностей, баек и мемов",
  
  head: [
    // 1. Иконка вкладки
    ['link', { rel: 'icon', type: 'image/png', href: '/wiki/favicon.png' }]
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
        text: 'Категории',
        items: [
          { text: '👨‍🏫 Преподаватели' link: '/teachers/'  },
          { text: '🎭 События' },
          { text: '🛠️ Предметы' },
          { text: '🏢 Корпуса и аудитории' },
          { text: '➕ Добавить контент', link: 'https://github.com/fit-com/wiki/new/main' }
        ]
      }
    ],

    editLink: {
      pattern: 'https://github.com/fit-com/wiki/edit/main/:path',
      text: 'Редактировать статью на GitHub'
    }
  }
}
