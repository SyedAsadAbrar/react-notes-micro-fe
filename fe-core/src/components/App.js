import React, { useEffect } from 'react';
import ErrorBoundary from './error-boundary';
import {
  AppBar,
  Container,
  createTheme,
  IconButton,
  Paper,
  Toolbar,
  useTheme,
  Alert,
  Typography,
  Box,
  Snackbar,
} from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { DarkMode, LightMode, StickyNote2 } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { createContext, useContext, useMemo, useState } from 'react';

import './App.css';
import { actionTypes, notesMock } from '../constants';
import NoteDTO from '../constants/NoteDTO';
import { getCurrentDateAndTime } from '../utils';
import SlideTransition from './slide-transition';

const NotesList = React.lazy(() => import('notes_list/app'));

const RemoteWrapper = ({ children }) => (
  <ErrorBoundary>{children}</ErrorBoundary>
);

const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const App = () => {
  const [notes, setNotes] = useState(notesMock);
  const [isSnackBarOpen, setSnackBarOpen] = useState(false);
  const [isNotesInputFocused, setNotesInputFocused] = useState(false);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const editNotes = (index, actionType, detailObj = false) => {
    const oldNotes = [...notes];

    console.log('editNotes called', index, actionType);

    if (actionType === actionTypes.REMOVE) {
      setNotes(oldNotes.filter((note, noteIndex) => noteIndex !== index));
    } else if (actionType === actionTypes.TOGGLE_FAVORITE) {
      setNotes(
        oldNotes.map(
          (note, noteIndex) =>
            new NoteDTO(
              note.title,
              note.date,
              noteIndex === index ? !note.isFavorited : note.isFavorited,
              note.details
            )
        )
      );
    } else if (actionType === actionTypes.SHARE) {
      setSnackBarOpen(true);
    } else {
      setNotes([
        new NoteDTO(
          detailObj.title,
          getCurrentDateAndTime(),
          false,
          detailObj.note
        ),
        ...notes,
      ]);
    }
  };

  const handleSnackbarClose = () => {
    setSnackBarOpen(false);
  };

  useEffect(() => {
    console.log('isNotesInputFocused changed', isNotesInputFocused);
  }, [isNotesInputFocused]);

  useEffect(
    () => console.log('isSnackBarOpen', isSnackBarOpen),
    [isSnackBarOpen]
  );

  return (
    <Box>
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
            <NotesList notes={notes} editNotes={editNotes} />
          </RemoteWrapper>
        </Container>
      </Paper>
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        TransitionComponent={SlideTransition}
        key={SlideTransition.name}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity='success'
          sx={{ width: '100%' }}
        >
          Note shared successfully!
        </Alert>
      </Snackbar>
    </Box>
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
