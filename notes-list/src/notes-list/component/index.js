import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  ClickAwayListener,
  Collapse,
  Container,
  Grid,
  InputAdornment,
  List,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { loremIpsum } from 'lorem-ipsum';
import { SentimentDissatisfied } from '@mui/icons-material';

import NoteDTO from '../constants/note/NoteDTO';
import { getCurrentDateAndTime, getRandomNum } from '../../common/utils';
import { actionTypes } from '../constants';
import Note from './note';

const notesMock = [
  new NoteDTO(
    'First Note',
    getCurrentDateAndTime(),
    true,
    loremIpsum({ count: getRandomNum(1, 5) })
  ),
  new NoteDTO(
    'Second Note',
    getCurrentDateAndTime(),
    false,
    loremIpsum({ count: getRandomNum(1, 5) })
  ),
  new NoteDTO(
    'Third Note',
    getCurrentDateAndTime(),
    false,
    loremIpsum({ count: getRandomNum(1, 5) })
  ),
  new NoteDTO(
    'Fourth Note',
    getCurrentDateAndTime(),
    false,
    loremIpsum({ count: getRandomNum(1, 5) })
  ),
];

const SlideTransition = (props) => <Slide {...props} direction='up' />;

const NotesList = () => {
  const [notes, setNotes] = useState(notesMock);
  const [isSnackBarOpen, setSnackBarOpen] = useState(false);
  const [isNotesInputFocused, setNotesInputFocused] = useState(false);

  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNote, setNewNote] = useState('');

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
      clickAwayHandler();
    }
  };

  const handleSnackbarClose = () => {
    setSnackBarOpen(false);
  };

  useEffect(() => {
    console.log('isNotesInputFocused changed', isNotesInputFocused);
  }, [isNotesInputFocused]);

  const clickAwayHandler = () => {
    setNewNoteTitle('');
    setNewNote('');
    setNotesInputFocused(false);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <ClickAwayListener onClickAway={clickAwayHandler}>
        <Box>
          {isNotesInputFocused && (
            <TransitionGroup>
              <Collapse key={'newNoteTitleCollapse'}>
                <TextField
                  fullWidth
                  label='Title'
                  id='noteTitle'
                  variant={'filled'}
                  value={newNoteTitle}
                  onChange={({ target: { value } }) => setNewNoteTitle(value)}
                  autoComplete={'off'}
                />
              </Collapse>
            </TransitionGroup>
          )}
          <TextField
            fullWidth
            label='Take a note...'
            id='noteDetails'
            variant={'filled'}
            onFocus={() => setNotesInputFocused(true)}
            onChange={({ target: { value } }) => setNewNote(value)}
            value={newNote}
            autoComplete={'off'}
            InputProps={{
              endAdornment: isNotesInputFocused ? (
                <InputAdornment position='end'>
                  <Button
                    variant='text'
                    color='primary'
                    onClick={() =>
                      editNotes(null, actionTypes.ADD, {
                        title: newNoteTitle,
                        note: newNote,
                      })
                    }
                  >
                    Save
                  </Button>
                  <Button
                    variant='text'
                    color='warning'
                    onClick={clickAwayHandler}
                  >
                    Discard
                  </Button>
                </InputAdornment>
              ) : null,
            }}
          />
        </Box>
      </ClickAwayListener>
      <List>
        <TransitionGroup>
          {notes.map((note, index) => (
            <Collapse key={note.title}>
              <Grid item xs={6}>
                <Note
                  title={note.title}
                  date={note.date}
                  isFavorited={note.isFavorited}
                  details={note.details}
                  changeNoteFunc={(actionType) => editNotes(index, actionType)}
                />
              </Grid>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
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
      {!notes.length && (
        <Container sx={{ textAlign: 'center' }}>
          <SentimentDissatisfied fontSize={'large'} color={'disabled'} />
          <Typography variant='subtitle2' sx={{ color: 'text.disabled' }}>
            It's a bit empty in here... Why not add a new note?
          </Typography>
        </Container>
      )}
    </Box>
  );
};

export default NotesList;
