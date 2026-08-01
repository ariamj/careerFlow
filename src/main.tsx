import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'
// import App from './App.tsx'

import { routeTree } from './routeTree.gen.ts'

const router = createRouter({ routeTree })

const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')

const syncDarkClass = (isDark: boolean) => {
  document.documentElement.classList.toggle('dark', isDark)
}

syncDarkClass(darkModeQuery.matches)
darkModeQuery.addEventListener('change', (event) => {
  syncDarkClass(event.matches)
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
