import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Coins from './pages/Coins';
import Coin from './pages/Coin';
import Chart from './component/Chart';
import Price from './component/Price';

const router = createBrowserRouter([
  {
    path: '/reactjs-crypto-tracker/',
    element: <Root />,
    children: [
      { path: '', element: <Coins /> },
      {
        path: ':coinId',
        element: <Coin />,
        children: [
          { path: 'chart', element: <Chart /> },
          { path: 'price', element: <Price /> },
        ],
      },
    ],
  },
]);

export default router;
