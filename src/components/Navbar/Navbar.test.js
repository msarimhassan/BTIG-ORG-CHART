import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './index';

test('Navbar render in the dom', async () => {
  render(<Navbar />);

  const devEl = await screen.findByTestId('testnavbar');

  expect(devEl).toBeInTheDocument();
});
