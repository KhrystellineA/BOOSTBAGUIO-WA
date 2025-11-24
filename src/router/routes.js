import { route } from 'quasar/wrappers'

/*
 * When adding new components to the "pages" directory,
 * first add the route in the routes array below.
 */

export default route(function (/* { store, ssr } */) {
  return [
    {
      path: '/',
      component: () => import('layouts/MinimalLayout.vue'),
      children: [
        { path: '', component: () => import('pages/HomePage.vue') }
      ]
    },
    {
      path: '/apanam',
      component: () => import('layouts/MinimalLayout.vue'),
      children: [
        { path: '', component: () => import('pages/apaman/ApamanPage.vue') }
      ]
    },
    {
      path: '/pagnaam',
      component: () => import('layouts/MinimalLayout.vue'),
      children: [
        { path: '', component: () => import('pages/pagnaam/PagnaamPage.vue') }
      ]
    },
    {
      path: '/maykan',
      component: () => import('layouts/MinimalLayout.vue'),
      children: [
        { path: '', component: () => import('pages/maykan/MaykanPage.vue') }
      ]
    },
    {
      path: '/aramidem',
      component: () => import('layouts/MinimalLayout.vue'),
      children: [
        { path: '', component: () => import('pages/aramidem/AramidemPage.vue') }
      ]
    },
    {
      path: '/ayan-mo',
      component: () => import('layouts/MinimalLayout.vue'),
      children: [
        { path: '', component: () => import('pages/ayanmo/AyanmoPage.vue') }
      ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/ErrorNotFound.vue')
    }
  ]
})