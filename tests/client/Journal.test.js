import React from 'react';
import Journal from '../../client/src/components/Home/MediaTypes/Journal/Journal';
import AddAnEntry from '../../client/src/components/Home/MediaTypes/Journal/AddAnEntry';

import renderer from 'react-test-renderer';

it('renders the Journal view with no issues', () => {
  const rendered = renderer.create(<Journal />);

  expect(rendered.length).toBeTruthy();
});

it('should toggle to AddJournalEntry view when button is clicked', () => {
  const rendered = renderer.create(<Journal />);
  const renderInstance = rendered.root;

  const createButton = renderInstance.find('button').at(0);

  createButton.simulate('press');
  expect(renderInstance.find(AddAnEntry).length).toBeTruthy();
});

//test if user taps on an entry from the list the entry file data is rendered
// it('shows the body text of an entry that the user has selected', () => {
//     const rendered = renderer.create(<JournalEntry />).toJSON();
//     expect(rendered).toBeTruthy();
//   });

//test if making a new entry works
// it('saves a new entry to the database', () => {
// })