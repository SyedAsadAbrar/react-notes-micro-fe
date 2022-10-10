import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ClickAwayListener,
  Collapse,
  Container,
  Grid,
  InputAdornment,
  List,
  TextField,
  Typography,
} from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { SentimentDissatisfied } from '@mui/icons-material';

import { actionTypes } from '../constants';
import Note from './note';

const NotesList = ({ notes, editNotes }) => {
  const [isNotesInputFocused, setNotesInputFocused] = useState(false);

  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNote, setNewNote] = useState('');

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
