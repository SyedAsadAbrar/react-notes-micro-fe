import { loremIpsum } from 'lorem-ipsum';

import { getCurrentDateAndTime, getRandomNum } from '../utils';
import NoteDTO from './NoteDTO';

export const notesMock = [
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

export const actionTypes = {
  REMOVE: 1,
  TOGGLE_FAVORITE: 2,
  SHARE: 3,
  ADD: 4,
};
