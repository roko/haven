import React from 'react';
import Journal from '../../client/src/components/Home/MediaTypes/Journal/Journal';
import JournalEntry from '../../client/src/components/Home/MediaTypes/Journal/JournalEntry';

import renderer from 'react-test-renderer';

it('renders the Journal view with no issues', () => {
  const rendered = renderer.create(<Journal />).toJSON();
  expect(rendered).toBeTruthy();
});

//test if user taps on an entry from the list the entry file data is rendered
// it('shows the body text of an entry that the user has selected', () => {
//     const rendered = renderer.create(<JournalEntry />).toJSON();
//     expect(rendered).toBeTruthy();
//   });

//test if making a new entry works
// it('saves a new entry to the database', () => {
// })