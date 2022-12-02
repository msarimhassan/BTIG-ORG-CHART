import { render, screen } from '@testing-library/react';
import Loader from './index';

test('Loader render in the dom', async () => {
  render(<Loader loading={true} />);

  const devEl = await screen.findByTestId('testloader');

  expect(devEl).toBeInTheDocument();
});

test('Loader render in the dom', async () => {
  render(<Loader loading={false} />);
});
