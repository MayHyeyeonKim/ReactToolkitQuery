import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetCountQuery,
  useUpdateCountMutation,
  useResetCountMutation,
} from "../services/counterApi";

import {
  incrementLocal,
  decrementLocal,
  resetLocal,
} from "../features/counterSlice";

const Count = () => {
  const { data, error, isLoading } = useGetCountQuery();
  const [updateCount] = useUpdateCountMutation();
  const [resetCount] = useResetCountMutation();

  const localCount = useSelector((state) => state.counter.localCount);
  const dispatch = useDispatch();

  const increment = async () => {
    dispatch(incrementLocal()); // 로컬 상태 증가
    const newCount = (data?.count || 0) + 1;
    await updateCount(newCount); // 서버 상태 업데이트
  };

  const decrement = async () => {
    dispatch(decrementLocal()); // 로컬 상태 감소
    const newCount = (data?.count || 0) - 1;
    await updateCount(newCount); // 서버 상태 업데이트
  };

  const resetServer = async () => {
    await resetCount(); // 서버 카운트 리셋
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching count.</p>;

  return (
    <div className="container">
      {/* <h1>Redux Query Count App</h1> */}

      <section>
        <h2>Server Count: {data?.count}</h2>
        <button onClick={increment}>+ (Server & Local)</button>
        <button onClick={decrement}>- (Server & Local)</button>
        <button className="reset" onClick={resetServer}>
          Reset (Server)
        </button>
      </section>

      <section>
        <h2>Local Count: {localCount}</h2>
        <button onClick={() => dispatch(incrementLocal())}>
          + (Local Only)
        </button>
        <button onClick={() => dispatch(decrementLocal())}>
          - (Local Only)
        </button>
        <button className="reset" onClick={() => dispatch(resetLocal())}>
          Reset (Local Only)
        </button>
      </section>
    </div>
  );
};

export default Count;
