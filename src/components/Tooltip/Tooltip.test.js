import { render, screen, fireEvent } from '@testing-library/react';
import Tooltip from '.';

test('edit Click modal in the UI', async () => {
    render(<Tooltip active={true} />);
    fireEvent.click(screen.getByTestId('testEdit'));
    const mockEvent = { stopPropogation: jest.fn() };
    expect(mockEvent.stopPropogation).toBeCalledTimes(0);
});

test('Add Click modal', async () => {
    render(<Tooltip active={true} flag={false} />);
    fireEvent.click(screen.getByTestId('testAdd'));
    const mockEvent = { stopPropogation: jest.fn() };
    expect(mockEvent.stopPropogation).toBeCalledTimes(0);
});
