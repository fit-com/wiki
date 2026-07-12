export default {
  title: "Википедия ФИТ НГУ",
  description: "Самый большой архив информации, личностей, баек и мемов",
  
  // Жестко прописываем иконку для вкладки браузера
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]
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
    ]
  }
}
