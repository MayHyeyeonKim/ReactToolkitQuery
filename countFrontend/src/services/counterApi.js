import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const counterApi = createApi({
  reducerPath: "counterApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5005/" }),
  tagTypes: ["Count"], // 태그 타입 정의
  endpoints: (builder) => ({
    getCount: builder.query({
      query: () => "count",
      providesTags: ["Count"], // 이 쿼리가 제공하는 태그
    }),
    updateCount: builder.mutation({
      query: (newCount) => ({
        url: "count",
        method: "POST",
        body: { count: newCount },
      }),
      invalidatesTags: ["Count"], // 호출 시 해당 태그 무효화
    }),
    resetCount: builder.mutation({
      query: () => ({
        url: "count",
        method: "POST",
        body: { count: 0 }, // 서버 카운트를 0으로 리셋
      }),
      invalidatesTags: ["Count"], // 태그 무효화로 자동 리패치
    }),
  }),
});

export const {
  useGetCountQuery,
  useUpdateCountMutation,
  useResetCountMutation,
} = counterApi;
