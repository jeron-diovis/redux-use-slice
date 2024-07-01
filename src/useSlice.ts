import { Slice } from '@reduxjs/toolkit'

import { useSliceActions } from './useBindActions'
import { useThunkReducer } from './useThunkReducer'

//#region Types
export type SliceState<S extends Slice> = ReturnType<S['getInitialState']>

export type SliceActions<S extends Slice> = _Values<{
  [K in keyof S['actions']]: ReturnType<S['actions'][K]>
}>
type _Values<T> = T[keyof T]

export type SliceStateInitializer<S> = Partial<S> | ((base: S) => Partial<S>)
//#endregion

function resolveInitialState<S>(
  slice: Slice<S>,
  init: SliceStateInitializer<S>
): S {
  const base = slice.getInitialState()
  const override = typeof init === 'function' ? init(base) : init
  return { ...base, ...override }
}

export function useSlice<S extends Slice>(
  slice: S,
  init?: SliceStateInitializer<SliceState<S>>
) {
  const [state, dispatch] = useThunkReducer<SliceState<S>, SliceActions<S>>(
    slice.reducer,
    undefined,
    !init ? slice.getInitialState : () => resolveInitialState(slice, init)
  )

  const actions = useSliceActions(slice, dispatch)

  return [state, actions, dispatch] as const
}
