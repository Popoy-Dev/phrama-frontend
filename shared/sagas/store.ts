import { configureStore, applyMiddleware, combineReducers, getDefaultMiddleware  } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './common/root-saga'
import authSlice from '../slices/auth-slice';


const sagaMiddleware = createSagaMiddleware()
 const reducer = combineReducers({
    auth: authSlice.reducer,
});

// const store = configureStore(reducer, {}, applyMiddleware(sagaMiddleware))
const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export default store
// configureStore vs createStore
// find in the documents if i use createStore the second parameters is for reducer if im not using combineReducers need to clear this part

//  didnt get this part , even i google it :(
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
