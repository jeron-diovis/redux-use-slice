import { Slice } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  UseDispatch,
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux'

import { useSliceActions } from './useBindActions'

export function createUseStoreSlice<State extends Record<string, unknown>>(
  useSelector: TypedUseSelectorHook<State>,
  useDispatch: UseDispatch
) {
  return function useStoreSlice<S extends Slice>(slice: S) {
    const state = useSelector(slice.selectSlice)
    const dispatch = useDispatch()
    const actions = useSliceActions(slice, dispatch)
    return [state, actions, dispatch] as const
  }
}

export const useStoreSlice = createUseStoreSlice(
  useSelectorBase,
  useDispatchBase
)
