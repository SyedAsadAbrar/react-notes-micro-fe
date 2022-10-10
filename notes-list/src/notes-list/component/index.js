import * as React from 'react';
import {
  Box,
  Collapse,
  Container,
  Grid,
  List,
  Typography,
} from '@mui/material';
import { TransitionGroup } from 'react-transition-group';
import { SentimentDissatisfied } from '@mui/icons-material';

import Note from './note';

const NotesList = ({ notes, editNotes }) => {
  return (
    <Box>
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
