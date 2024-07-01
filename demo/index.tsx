import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { createRoot } from 'react-dom/client'

import App from './Redux'

createRoot(document.getElementById('root') as HTMLElement).render(<App />)
