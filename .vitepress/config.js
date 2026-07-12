export default {
  base: '/wiki/',
  title: "Википедия ФИТ НГУ",
  description: "Самый большой архив информации, личностей, баек и мемов",
  
  // Жестко прописываем иконку для вкладки браузера
  head: [
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
