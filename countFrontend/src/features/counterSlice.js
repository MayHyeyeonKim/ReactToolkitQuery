import { createSlice } from "@reduxjs/toolkit";

// 초기 상태 정의
const initialState = { localCount: 0 };

const counterSlice = createSlice({
  name: "counter", // slice 이름
  initialState,
  reducers: {
    incrementLocal: (state) => {
      state.localCount += 1;
    },
    decrementLocal: (state) => {
      state.localCount -= 1;
    },
    resetLocal: (state) => {
      state.localCount = 0;
    },
  },
});

export const { incrementLocal, decrementLocal, resetLocal } =
  counterSlice.actions;
export default counterSlice.reducer;
