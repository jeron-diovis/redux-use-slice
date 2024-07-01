import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { slice } from './slice'

const reducer = combineSlices(slice)

const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export { store }
