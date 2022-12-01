import LeafName from '.';
import { render, screen, fireEvent } from '@testing-library/react';

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

test('Leaf Name render in the dom', async () => {
  render(<LeafName data={obj} />);
  const devEl = await screen.findByTestId('testClick');
  expect(devEl).toBeInTheDocument();
});

test('Modal Buttons', () => {
  render(<LeafName data={obj} />);
  fireEvent.click(screen.getByTestId('testClick'));
  const mockEvent = { stopPropogation: jest.fn() };
  expect(mockEvent.stopPropogation).toBeCalledTimes(0);
});

test('Modal Buttons', () => {
  render(<LeafName data={obj} />);
  fireEvent.mouseLeave(screen.getByTestId('testClick'));
  const mockEvent = { stopPropogation: jest.fn() };
  expect(mockEvent.stopPropogation).toBeCalledTimes(0);
});
