import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit'

const createAsyncSlice = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
})

const slice = createAsyncSlice({
  name: 'counter',
  initialState: 0,
  reducers: create => {
    return {
      increment: create.reducer(state => state + 1),
      decrement: create.reducer(state => state - 1),
      thunk: create.asyncThunk<void, unknown>(async (arg, thunkAPI) => {
        /* eslint-disable no-console */
        console.group('thunk')
        console.log('arg', arg)
        console.log('thunkAPI: getState()', thunkAPI.getState())
        console.log('thunkAPI: dispatch', thunkAPI.dispatch)
        console.groupEnd()
        /* eslint-enable */
      }),
    }
  },
})

export { slice }
