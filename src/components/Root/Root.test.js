import { render, screen, fireEvent } from '@testing-library/react';
import Root from '.';

const obj = {
  displayName: 'Sarim',
  userPrincipalName: 'SAzriel@btig.com',
  teamName: 'AppDev',
  teamLead: false,
  directTeamMembers: [],
  dimensions: {
    left: true,
    horizontal: false,
  },
};

test('Employee name  renders the text inside the Root', async () => {
  render(<Root object={obj} />);
  const element = await screen.findByTestId('testroot');
  expect(element).toHaveTextContent('Sarim');
});

test('Root render in the dom', async () => {
  render(<Root object={obj} />);

  const devEl = await screen.findByTestId('testroot');

  expect(devEl).toBeInTheDocument();
});

test('Root Click', () => {
  render(<Root object={obj} />);
  fireEvent.click(screen.getByTestId('testroot'));
});

test('Root Click', () => {
  render(<Root object={obj} />);
  fireEvent.mouseEnter(screen.getByTestId('testroot'));
});
