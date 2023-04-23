import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import Root from './Root';
import Coins from './pages/Coins';
import Coin from './pages/Coin';
import Chart from './component/Chart';
import Price from './component/Price';
import theme from './theme';

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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
