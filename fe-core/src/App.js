import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import {
  AppBar,
  Container,
  createTheme,
  IconButton,
  Paper,
  Toolbar,
  useTheme,
} from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';
import { DarkMode, LightMode, StickyNote2 } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useMemo, useState } from 'react';

const NotesContainer = React.lazy(() => import('notes_container/App'));

const RemoteWrapper = ({ children }) => (
  <div
    style={{
      border: '1px solid red',
      background: 'white',
    }}
  >
    <ErrorBoundary>{children}</ErrorBoundary>
  </div>
);

const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const App = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Paper sx={{ minHeight: '100vh' }}>
      <Container maxWidth='sm' sx={{ minHeight: 'inherit' }}>
        <AppBar position='static'>
          <Toolbar>
            <StickyNote2 sx={{ mr: 1 }} />
            <Typography variant='h5' color='inherit' component='div'>
              Notes
            </Typography>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ ml: 'auto', mr: '-8px' }}
              onClick={colorMode.toggleColorMode}
            >
              {theme.palette.mode !== 'dark' ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <RemoteWrapper>
          <NotesContainer />
        </RemoteWrapper>
      </Container>
    </Paper>
  );
};

export default function ToggleColorMode() {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
