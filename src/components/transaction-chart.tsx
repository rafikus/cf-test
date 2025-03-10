import { useGetKlinesForSymbolQuery } from "../api/binance";
// Register the required components

const TransactionChart = () => {
  const { data } = useGetKlinesForSymbolQuery("BTSUSDT");

  return <div>something</div>;
};

export default TransactionChart;
