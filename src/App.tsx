import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import router from './Router';
import isDarkAtom from './atoms';
import { darkTheme, lightTheme } from './theme';

export default function App() {
  const queryClient = new QueryClient();
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
