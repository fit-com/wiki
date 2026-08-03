import DefaultTheme from 'vitepress/theme'
import './custom.css'
import injectCategories from './injectCategories.js'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Добавляем кастомную логику
    app.mixin(injectCategories)
  }
}
