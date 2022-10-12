import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {MainProcess} from '../../types/state';

const initialState: MainProcess = {
  current: 'test',
};

export const mainProcess = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {

  }
});

// export const {changeCity, changeSorting} = mainProcess.actions;
