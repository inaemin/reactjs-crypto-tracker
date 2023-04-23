import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinTickers } from '../api';

const TickerTable = styled.table`
  margin: 0 auto;
  border-collapse: separate;
  border-spacing: 5px 1rem;
  tr {
    background-color: rgba(113, 128, 147, 0.1);
  }
  td {
    padding: 10px 25px;
    white-space: nowrap;
    text-align: center;
    :last-child {
      text-align: left;
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
`;
interface TickersProps {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: Quotes;
}

interface Quotes {
  USD: {
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_15m: number;
    percent_change_30m: number;
    percent_change_1h: number;
    percent_change_6h: number;
    percent_change_12h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_1y: number;
    ath_price: number;
    ath_date: string;
    percent_from_price_ath: number;
  };
}

interface OutletContext {
  coinId: string;
}

export default function Price() {
  const { coinId } = useOutletContext<OutletContext>();
  const { isLoading, data } = useQuery<TickersProps>(['tickers', coinId], () =>
    fetchCoinTickers(coinId),
  );

  return !isLoading ? (
    <div>
      <TickerTable>
        <tbody>
          <tr>
            <td>24h 총 거래량</td>
            <td>{data?.quotes.USD.volume_24h}</td>
          </tr>
          <tr>
            <td>시가총액</td>
            <td>{data?.quotes.USD.market_cap}</td>
          </tr>
          <tr>
            <td>가격변화(15분)</td>
            <td>{data?.quotes.USD.percent_change_15m}</td>
          </tr>
          <tr>
            <td>가격변화(1시간)</td>
            <td>{data?.quotes.USD.percent_change_1h}</td>
          </tr>
          <tr>
            <td>가격변화(12시간)</td>
            <td>{data?.quotes.USD.percent_change_12h}</td>
          </tr>
          <tr>
            <td>가격변화(24시간)</td>
            <td>{data?.quotes.USD.percent_change_24h}</td>
          </tr>
          <tr>
            <td>가격변화(7일)</td>
            <td>{data?.quotes.USD.percent_change_7d}</td>
          </tr>
          <tr>
            <td>가격변화(30일)</td>
            <td>{data?.quotes.USD.percent_change_30d}</td>
          </tr>
          <tr>
            <td>가격변화(1년)</td>
            <td>{data?.quotes.USD.percent_change_1y}</td>
          </tr>
          <tr>
            <td>최고가격</td>
            <td>{data?.quotes.USD.ath_price}</td>
          </tr>
          <tr>
            <td>최고가격 대비 현재가격</td>
            <td>{data?.quotes.USD.percent_from_price_ath}</td>
          </tr>
        </tbody>
      </TickerTable>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
