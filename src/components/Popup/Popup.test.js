import { render, screen, fireEvent } from '@testing-library/react';

import Popup from '.';

const data = { teamName: 'Org Chart' };

test('Modal Buttons', () => {
    render(<Popup modalIsOpen={true} data={data} />);
    fireEvent.click(screen.getByTestId('test-cancel-btn'));
    const mockEvent = { stopPropogation: jest.fn() };
    expect(mockEvent.stopPropogation).toBeCalledTimes(0);
});

test('Modal Buttons', () => {
    render(<Popup modalIsOpen={true} data={data} />);
    fireEvent.click(screen.getByTestId('update-btn'));
});
