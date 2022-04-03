import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  listData: {
    name: '',
    temp: null,
    humidity: null,
    weather: {
      description: '',
      icon: '',
    },
  },
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    pushData: (state, action) => {
      state.listData = {
        name: action.payload.name,
        temp: action.payload.main.temp,
        humidity: action.payload.main.humidity,
        weather: action.payload.weather[0],
      };
    },
  },
});

export const {pushData} = counterSlice.actions;

export default counterSlice.reducer;
