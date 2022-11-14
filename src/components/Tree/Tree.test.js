import { render, screen } from '@testing-library/react';
import  Tree from '.';

test('Tree render in the dom', async () => {
    render(<Tree />);

    const devEl = await screen.findByTestId('testtree');

    expect(devEl).toBeInTheDocument();
});
