import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from '../../app/store'

// create file for status
import {
  resetActionStatus,
  initActionStatus,
  successActionStatus,
  failedActionStatus,
} from "../constant/status-constant";
// Define a type for the slice state
interface SampleState {
  login: [];
  signup: [];
  signout: [];
}

// Define the initial state using that type
const initialState: SampleState = {
  login: [],
  signup: [],
  signout: [],
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    verifyLogin: (state :any) => ({
      ...state,
      status: {
        initActionStatus,
      },
      type: "verifyLogin",
    }),
    verifyLoginSuccess: (state : any, { payload }: PayloadAction<[]>) => ({
      ...state,

      login: payload,
      status: {
        successActionStatus,
      },
      type: "verifyLogin",
    }),
    // Use the PayloadAction type to declare the contents of `action.payload`
    verifyLoginFailed: (state :any, { payload }: PayloadAction<any>) => ({
      ...state,
      status: {
        failedActionStatus,
      },
      type: "verifyLogin",
    }),

    verifySignup: (state :any) => ({
      ...state,
      status: {
        initActionStatus,
      },
      type: "verifySignup",
    }),
    verifySignupSuccess: (state : any, { payload }: PayloadAction<[]>) => ({
      ...state,

      signup: payload,
      status: {
        successActionStatus,
      },
      type: "verifySignup",
    }),
    // Use the PayloadAction type to declare the contents of `action.payload`
    verifySignupFailed: (state :any, { payload }: PayloadAction<any>) => ({
      ...state,
      status: {
        failedActionStatus,
      },
      type: "verifySignup",
    }),

    verifySignout: (state :any) => ({
      ...state,
      status: {
        initActionStatus,
      },
      type: "verifySignout",
    }),
    verifySignoutSuccess: (state : any, { payload }: PayloadAction<[]>) => ({
      ...state,

      signout: payload,
      status: {
        successActionStatus,
      },
      type: "verifySignout",
    }),
    // Use the PayloadAction type to declare the contents of `action.payload`
    verifySignoutFailed: (state :any, { payload }: PayloadAction<any>) => ({
      ...state,
      signout: payload,
      status: {
        failedActionStatus,
      },
      type: "verifySignout",
    }),
  },
});

// can access this part inside components using by importing
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default authSlice;
