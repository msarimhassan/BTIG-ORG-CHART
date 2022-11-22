import { render, screen, fireEvent } from '@testing-library/react';
import OptionalModal from './index';

const obj = {
    displayName: 'Sarim',
    userPrincipalName: 'SAzriel@btig.com',
    teamName: 'AppDev',
    teamLead: false,
    directTeamMembers: [],
    dimensions: {
        left: true,
        horizontal: false,
    },
};

test('Optinal Modal render in the dom', async () => {
    render(<OptionalModal data={obj} modalIsOpen={true} />);
    const devEl = await screen.findByTestId('options-modal');
    expect(devEl).toBeInTheDocument();
});

test('Delete Click', () => {
    render(<OptionalModal data={obj} modalIsOpen={true} />);
    fireEvent.click(screen.getByTestId('delete-member'));
});
