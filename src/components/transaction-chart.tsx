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
import { useEffect } from "react";

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
  const { data, refetch, isError, error } = useGetKlinesForSymbolQuery(symbol);

  useEffect(() => {
    const intervalId = setInterval(refetch, 1000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  if (isError && error) {
    // @ts-expect-error error does exist...
    return <div>{error.error ?? ""} </div>;
  }

  return (
    <div style={{ width: "900px", height: "500px" }}>
      <ReactEChartsCore
        echarts={echarts}
        option={{
          title: {
            text: `Binance ${symbol}`,
          },
          xAxis: {
            show: false,
            type: "category",
            data: data?.map((candleData) => candleData[0]),
          },
          yAxis: {
            scale: true,
          },
          tooltip: {
            trigger: "item",
          },
          series: [
            {
              type: "candlestick",
              itemStyle: {
                color: "#43E06C",
                color0: "#E12722",
                borderColor: "#43E06C",
                borderColor0: "#E12722",
              },
              data:
                data &&
                data.map((candleData) => {
                  const values = candleData
                    .slice(1, 5)
                    .map((text) => parseFloat(text + ""));
                  return [values[0], values[3], values[2], values[1]];
                }),
            },
          ],
        }}
        showLoading={!data}
      />
    </div>
  );
};

export default TransactionChart;
