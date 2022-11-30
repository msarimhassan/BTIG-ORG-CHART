import BackButton from '.';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const obj = [
  {
    displayName: 'Sarim',
    userPrincipalName: 'SAzriel@btig.com',
    teamName: 'Hexaa',
    teamLead: true,
    directTeamMembers: [],
    dimensions: {
      Left: true,
      horizontal: false,
    },
  },
];
test('back button render in the dom', async () => {
  render(<BackButton previousData={obj} />);
});

test('Button Click', () => {
  render(<BackButton previousData={obj} />);
  fireEvent.click(screen.getByTestId('testbackbtn'));
});
