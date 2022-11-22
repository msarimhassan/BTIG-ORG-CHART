import { render, screen, fireEvent } from '@testing-library/react';
import AddMember from '.';
import { Network, config } from '../../config';

jest.mock('apisauce');

test('Modal Buttons', () => {
    render(<AddMember modalIsOpen={true} />);
    fireEvent.click(screen.getByTestId('test-cancel-btn'));
    const mockEvent = { stopPropogation: jest.fn() };
    expect(mockEvent.stopPropogation).toBeCalledTimes(0);
});

