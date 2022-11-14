import { render, screen } from '@testing-library/react';
import TreeNode from '.';

test('TreeNode render in the dom', async () => {
    render(<TreeNode />);

    const devEl = await screen.findByTestId('testtreenode');

    expect(devEl).toBeInTheDocument();
});

test('label render in the Tree Node', async () => {
    render(<TreeNode label={'hexaa'} />);
    const devEl = await screen.findByTestId('testtreenode');
    expect(devEl).toHaveTextContent('hexaa');
});
