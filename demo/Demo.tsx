import React from 'react'

import { useBindActions } from '../src/useBindActions'
import { useSlice } from '../src/useSlice'
import { useStoreSlice } from '../src/useStoreSlice'
import { useThunkReducer } from '../src/useThunkReducer'

import { slice } from './slice'

export function DemoUseThunkReducer() {
  const [state, dispatch] = useThunkReducer(
    slice.reducer,
    undefined,
    slice.getInitialState
  )
  return (
    <Demo
      title="useThunkReducer"
      state={state}
      onInc={() => dispatch(slice.actions.increment())}
      onDec={() => dispatch(slice.actions.decrement())}
      onThunk={() => dispatch(slice.actions.thunk('whatever'))}
    />
  )
}

export function DemoUseSliceActions() {
  const [state, dispatch] = useThunkReducer(
    slice.reducer,
    undefined,
    slice.getInitialState
  )
  const actions = useBindActions(slice.actions, dispatch)
  return (
    <Demo
      title="useBindActions"
      state={state}
      onInc={() => actions.increment()}
      onDec={() => actions.decrement()}
      onThunk={() => actions.thunk('whatever')}
    />
  )
}

export function DemoUseSlice() {
  const [state, actions] = useSlice(slice)
  return (
    <Demo
      title="useSlice"
      state={state}
      onInc={() => actions.increment()}
      onDec={() => actions.decrement()}
      onThunk={() => actions.thunk('whatever')}
    />
  )
}

export function DemoUseStoreSlice() {
  const [state, actions] = useStoreSlice(slice)
  return (
    <Demo
      title="useStoreSlice"
      state={state}
      onInc={() => actions.increment()}
      onDec={() => actions.decrement()}
      onThunk={() => actions.thunk('whatever')}
    />
  )
}

// ---

function Demo(props: {
  title: string
  state: unknown
  onInc(): void
  onDec(): void
  onThunk(): void
}) {
  const { title, state, onDec, onInc, onThunk } = props
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <b>{title}</b>
      <div style={{ border: '1px solid black', padding: 4 }}>
        State:
        <pre style={{ background: 'lightgray' }}>
          {JSON.stringify(state, null, 4)}
        </pre>
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button onClick={onInc}>+</button>
        <button onClick={onDec}>-</button>
        <button
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('return value from onThunk:', onThunk())
          }}
        >
          thunk
        </button>
      </div>
    </div>
  )
}
