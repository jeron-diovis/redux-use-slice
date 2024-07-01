import { Slice } from '@reduxjs/toolkit'
import { useMemo } from 'react'

import { DispatchResult, ThunkDispatch } from './useThunkReducer'

//#region Types
type ActionCreators = Slice['actions']

export type BoundActionCreator<AC extends ActionCreators[string]> = (
  ...args: Parameters<AC>
) => DispatchResult<ReturnType<AC>>

export type BoundActionCreators<ACS extends ActionCreators> = {
  [K in keyof ACS]: BoundActionCreator<ACS[K]>
}

// ---

type AnyDispatch = ThunkDispatch<unknown, any> // eslint-disable-line @typescript-eslint/no-explicit-any

//#endregion

export function bindActions<T extends ActionCreators>(
  creators: T,
  dispatch: AnyDispatch
) {
  return Object.entries(creators).reduce(
    (acc, [name, actionCreator]) => ({
      ...acc,
      [name]: payload => dispatch(actionCreator(payload)),
    }),
    {} as BoundActionCreators<T>
  )
}

export function useBindActions<T extends ActionCreators>(
  actions: T,
  dispatch: AnyDispatch
): BoundActionCreators<T> {
  return useMemo(() => bindActions(actions, dispatch), [actions, dispatch])
}

/**
 * Shorthand capable to inference action types from entire slice.
 * Mostly used internally, for other hooks accepting slice as param.
 */
export function useSliceActions<T extends Slice>(
  slice: T,
  dispatch: AnyDispatch
): BoundActionCreators<T['actions']> {
  return useBindActions(slice.actions, dispatch)
}
