import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import commaEveryThreeDigit from '../utils/commaEveryThreeDigit';
import FixedButton from '../component/FixedButton';

const Container = styled.main`
  max-width: 480px;
  margin: 0 auto;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  margin: 50px 0;
`;

const Overview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin: 20px 0;
    line-height: 120%;
  }
`;

const OverviewItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => props.theme.ovBgColor};
  padding: 10px;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    white-space: nowrap;
    width: 100%;
    > span:last-child {
      font-size: 20px;
      margin-top: 7px;
      font-weight: 600;
    }
  }
`;

const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 40px 0px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  a {
    padding: 10px 90px;
    background-color: ${(props) => props.theme.ovBgColor};
    border-radius: 10px;
    color: ${(props) => (props.isActive ? props.theme.accentColor : 'inherit')};
  }
`;

interface InfoProps {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  description: string;
  open_source: boolean;
  started_at: string;
  proof_type: string;
}

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

export default function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation();
  const chartMatch = useMatch(`/reactjs-crypto-tracker/:coinId/chart`);
  const priceMatch = useMatch(`/reactjs-crypto-tracker/:coinId/price`);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoProps>(
    ['info', `${coinId}`],
    () => fetchCoinInfo(coinId),
  );
  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<TickersProps>(
      ['tickers', `${coinId}`],
      () => fetchCoinTickers(coinId),
      {
        refetchInterval: 5000,
      },
    );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : !loading ? infoData?.name : ''}
        </title>
      </Helmet>
      <Title>{state?.name ? state.name : !loading ? infoData?.name : ''}</Title>
      {!loading ? (
        <Overview>
          <OverviewItem>
            <div>
              <span>RANK</span>
              <span>{infoData?.rank}</span>
            </div>
            <div>
              <span>SYMBOL</span>
              <span>{infoData?.symbol}</span>
            </div>
            <div>
              <span>PRICE</span>
              <span>
                {commaEveryThreeDigit(tickersData?.quotes.USD.price || 0)}
              </span>
            </div>
          </OverviewItem>
          <p>{infoData?.description}</p>
          <OverviewItem>
            <div>
              <span>MAX SUPPLY</span>
              <span>{commaEveryThreeDigit(tickersData?.max_supply || 0)}</span>
            </div>
            <div>
              <span>CIRCULATING SUPPLY</span>
              <span>
                {commaEveryThreeDigit(tickersData?.circulating_supply || 0)}
              </span>
            </div>
          </OverviewItem>
        </Overview>
      ) : (
        'Loading...'
      )}
      <TabWrapper>
        <Tab isActive={chartMatch !== null}>
          <Link to="chart">CHART</Link>
        </Tab>
        <Tab isActive={priceMatch !== null}>
          <Link to="price">PRICE</Link>
        </Tab>
      </TabWrapper>
      <Outlet context={{ coinId }} />
      <FixedButton />
    </Container>
  );
}
