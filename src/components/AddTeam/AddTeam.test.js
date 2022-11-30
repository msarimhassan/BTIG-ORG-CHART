import { fireEvent, render, screen } from '@testing-library/react';

import AddTeam from './index';

test('Add Team Modal render in the dom', async () => {
  render(<AddTeam modalIsOpen={true} reportsInto={'sarim@btig.com'} />);
  const devEl = await screen.findByTestId('testaddteammodal');
  expect(devEl).toBeInTheDocument();
});

test('Add Team Modal click button', async () => {
  render(<AddTeam modalIsOpen={true} reportsInto={'sarim@btig.com'} />);
  fireEvent.click(screen.getByTestId('addteambtn'));
});

test('handle Change', async () => {
  render(<AddTeam modalIsOpen={true} reportsInto={'sarim@btig.com'} />);
  fireEvent.click(screen.getByTestId('left-input'), { target: { value: true } });
});

test('handle Change', async () => {
  render(<AddTeam modalIsOpen={true} reportsInto={'sarim@btig.com'} />);
  fireEvent.click(screen.getByTestId('horizontal-input'), { target: { value: true } });
});
