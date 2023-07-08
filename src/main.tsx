import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { MantineProvider } from '@mantine/core'
import { theme } from './constants/theme.ts'
import { Notifications } from '@mantine/notifications'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Notifications />
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
