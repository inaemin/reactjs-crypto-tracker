import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import ApexChart from 'react-apexcharts';
import { fetchCoinHistory } from '../api';
import formatNum from '../utils/formatNum';

interface IHistorial {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface OutletContext {
  coinId: string;
}

export default function Chart() {
  const { coinId } = useOutletContext<OutletContext>();
  const { isLoading, data } = useQuery<IHistorial[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId),
  );

  return !isLoading ? (
    <div>
      <ApexChart
        type="candlestick"
        series={[
          {
            data:
              data?.map((d) => [
                Number(d.time_close),
                Number(d.open),
                Number(d.high),
                Number(d.low),
                Number(d.close),
              ]) ?? [],
          },
        ]}
        options={{
          theme: { mode: 'dark' },
          chart: {
            type: 'candlestick',
            width: 500,
            height: 500,
            toolbar: { show: false },
            background: 'transparent',
          },
          title: { text: 'CandleStick Chart', align: 'left' },
          xaxis: {
            type: 'datetime',
            labels: {
              datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
              },
            },
          },
          yaxis: {
            tooltip: {
              enabled: true,
            },
          },
          grid: {
            borderColor: 'rgba(113,128,147,0.7)',
          },
        }}
      />
      <ApexChart
        type="line"
        series={[
          {
            name: `${coinId} price`,
            data: data?.map((d) => Number(d.close)) ?? [],
          },
        ]}
        options={{
          theme: { mode: 'dark' },
          chart: {
            height: 500,
            width: 500,
            toolbar: { show: false },
            background: 'transparent',
          },
          stroke: {
            curve: 'smooth',
            width: 4,
          },
          grid: { show: false },
          yaxis: { show: false },
          xaxis: {
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false },
            type: 'datetime',
            categories: data?.map((d) => Number(d.time_close)) ?? [],
          },
          fill: {
            type: 'gradient',
            gradient: { gradientToColors: ['#00a8ff'], stops: [0, 100] },
          },
          colors: ['#4cd137'],
          tooltip: {
            y: {
              formatter: (value) => `$${formatNum(Math.floor(value))}`,
            },
          },
          title: { text: 'Smooth Line Chart', align: 'left' },
        }}
      />
    </div>
  ) : (
    <div>Loading...</div>
  );
}
