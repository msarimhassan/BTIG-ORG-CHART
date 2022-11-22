import { render, screen } from '@testing-library/react';
import { BackButton } from '../components';

test('Back Button', async () => {
    const { getByTestId } = render(<BackButton previousData={[1]} />);
    const btn = getByTestId('testbackbtn');
    expect(btn).toBeInTheDocument();
});

test('TreeNode has Lead', () => {});
