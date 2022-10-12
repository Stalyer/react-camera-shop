import {store} from '../store/index';

export type MainProcess = {
  current: string;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
