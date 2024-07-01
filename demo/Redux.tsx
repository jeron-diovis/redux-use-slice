import React from 'react'
import { Provider, useSelector } from 'react-redux'

import {
  DemoUseSlice,
  DemoUseSliceActions,
  DemoUseStoreSlice,
  DemoUseThunkReducer,
} from './Demo'
import { store } from './store'

export default function ReduxApp() {
  return (
    <Provider store={store}>
      <div style={{ justifySelf: 'center' }}>
        Global store state:
        <StoreState />
      </div>

      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
      >
        <DemoUseThunkReducer />
        <DemoUseSliceActions />
        <DemoUseSlice />
        <DemoUseStoreSlice />
      </div>
    </Provider>
  )
}

function StoreState() {
  const state = useSelector(s => s)
  return (
    <pre style={{ textAlign: 'start' }}>{JSON.stringify(state, null, 4)}</pre>
  )
}
