import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';

const Container = styled.main`
  max-width: 480px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  padding: 50px 0;
`;

const CoinsList = styled.ul`
  padding: 10px;
`;

const CoinList = styled.li`
  margin-bottom: 10px;
  padding: 10px 20px;
  font-size: 25px;
  color: black;
  background-color: whitesmoke;
  border-radius: 10px;
  display: flex;
  align-items: center;
  span {
    margin-right: 10px;
    font-size: 20px;
  }
  a {
    padding: 12px 0;
    display: inline-block;
    width: 100%;
  }
`;

const CoinImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Crypto Tracker</title>
      </Helmet>
      <Title>All Coins</Title>
      <CoinsList>
        {!isLoading
          ? data?.slice(0, 20).map((coin) => (
              <CoinList key={`${coin.rank}`}>
                <span>{coin.rank}</span>
                <CoinImg
                  src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                  alt={`icon of ${coin.name}`}
                />
                <Link to={`${coin.id}`} state={{ name: coin.name }}>
                  {coin.name}
                </Link>
              </CoinList>
            ))
          : 'Loading...'}
      </CoinsList>
    </Container>
  );
}
