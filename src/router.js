import Vue from 'vue'
import Router from 'vue-router'
import ReviewQuiz from './views/ReviewQuiz.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ReviewQuiz
    },
  ]
})
