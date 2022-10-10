import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  ClickAwayListener,
  Collapse,
  InputAdornment,
  TextField,
} from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

const NoteInput = ({ addNoteHandler }) => {
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
                    onClick={() => {
                      addNoteHandler(newNoteTitle, newNote);
                      clickAwayHandler();
                    }}
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
    </Box>
  );
};

export default NoteInput;
