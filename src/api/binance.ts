import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const binanceAPI = createApi({
  reducerPath: "binanceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.binance.com/api/v3" }),
  endpoints: (builder) => ({
    getKlinesForSymbol: builder.query<(string | number)[][], string>({
      query: (symbol) => `/klines?symbol=${symbol}&interval=1w`,
    }),
  }),
});

export const { useGetKlinesForSymbolQuery } = binanceAPI;
