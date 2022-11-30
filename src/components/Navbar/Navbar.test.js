import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './index';

// test('Navbar login Button', () => {
//   render(<Navbar />);
//   fireEvent.click(screen.getByTestId('testloginbtn'));
//   const mockEvent = { stopPropogation: jest.fn() };
//   expect(mockEvent.stopPropogation).toBeCalledTimes(0);
// });

test('Navbar render in the dom', async () => {
  render(<Navbar />);

  const devEl = await screen.findByTestId('testnavbar');

  expect(devEl).toBeInTheDocument();
});
