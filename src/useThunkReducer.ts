import { Reducer, useCallback, useReducer, useRef } from 'react'

//#region Types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Thunk<S = any, A = any> = (
  dispatch: ThunkDispatch<S, A>,
  getState: () => S,
  // support extra arg for compatibility with the signature from redux-toolkit
  extra: unknown
) => unknown

type DispatchedThunk<A extends Thunk> = ReturnType<A>
type DispatchedAction = void

export type DispatchResult<A> = A extends Thunk
  ? DispatchedThunk<A>
  : DispatchedAction

export interface ThunkDispatch<S, A> {
  <Action extends Thunk<S, A>>(action: Action): DispatchedThunk<Action>
  (action: A): DispatchedAction
}

type UseReducerTuple<S, A> = [S, ThunkDispatch<S, A>]
//#endregion

//#region Overloads
/**
 * Overload for explicit case of using just initializer func, with no initial state.
 * Useful for redux-toolkit slices with their `getInitialState` function.
 */
function useThunkReducer<S, A>(
  reducer: Reducer<S, A>,
  initialState: undefined,
  init: () => S
): UseReducerTuple<S, A>

/**
 * Replicate signature of `useReducer` for calling `init` with an _arbitrary_ argument.
 */
function useThunkReducer<S, A, I>(
  reducer: Reducer<S, A>,
  initialArg: I,
  init: (arg: I) => S
): UseReducerTuple<S, A>
//#endregion

function useThunkReducer<S, A>(
  reducer: Reducer<S, A>,
  initialState: S,
  init?: (s: S) => S
): UseReducerTuple<S, A> {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    /* Overloaded types for `useReducer` are highly complicated and basically impossible to reuse.
     * (you can't just use `...args: Parameters<typeof useReducer>` to get it working).
     * Our types are simpler and lose some complex usecases, which are not used by anyone in practice.
     * (specifically, initializing reducer with an _arbitrary_ state, extending the reducer's state) */
    init as any // eslint-disable-line @typescript-eslint/no-explicit-any
  )

  const refState = useRef(state)
  refState.current = state
  const getState = useCallback(() => refState.current, [])

  const dispatchThunk = useCallback(
    (action: A): DispatchResult<A> => {
      if (typeof action === 'function') {
        return action(dispatchThunk, getState, {})
      } else {
        dispatch(action)
        return undefined as DispatchResult<A>
      }
    },
    [getState]
  )

  return [state, dispatchThunk]
}

export { useThunkReducer }
