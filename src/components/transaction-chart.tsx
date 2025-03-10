import ReactEChartsCore from "echarts-for-react/lib/core";
import { CanvasRenderer } from "echarts/renderers";
import * as echarts from "echarts/core";

import { useGetKlinesForSymbolQuery } from "../api/binance";
import { BarChart, CandlestickChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
// Register the required components

interface TransactionChartProps {
  symbol: string;
}

const TransactionChart = ({ symbol }: TransactionChartProps) => {
  echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    BarChart,
    CandlestickChart,
    CanvasRenderer,
  ]);
  const { data, isError, isFetching, error } =
    useGetKlinesForSymbolQuery(symbol);

  if (isError && error) {
    // @ts-expect-error error does exist...
    return <div>{error.error ?? ""} </div>;
  }

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "900px", height: "500px" }}>
      <ReactEChartsCore
        echarts={echarts}
        option={{
          title: {
            text: "Accumulated Waterfall Chart",
          },
          xAxis: {
            type: "category",
            silent: true,
            data: data?.map((_: unknown, idx: number) => idx),
          },
          yAxis: {},
          series: [
            {
              name: "Placeholder",
              type: "candlestick",
              data:
                data &&
                data.map((candleData) => {
                  return candleData
                    .slice(1, 5)
                    .map((text) => parseFloat(text + ""));
                }),
            },
          ],
        }}
        notMerge={true}
        lazyUpdate={true}
        onChartReady={console.log}
      />
    </div>
  );
};

export default TransactionChart;
