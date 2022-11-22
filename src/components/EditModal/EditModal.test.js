import { fireEvent, render, screen } from '@testing-library/react';
import EditModal from './index';

const obj = {
    displayName: 'Sarim',
    userPrincipalName: 'SAzriel@btig.com',
    teamName: 'AppDev',
    teamLead: false,
    directTeamMembers: [],
    dimensions: {
        left: true,
        horizontal: true,
    },
};

test('Edit Team Modal render in the dom', async () => {
    render(<EditModal data={obj} modalIsOpen={true} />);
    const devEl = await screen.findByTestId('editteammembers');
    expect(devEl).toBeInTheDocument();
});

test('Edit Team Modal click button', async () => {
    render(<EditModal data={obj} modalIsOpen={true} />);
    fireEvent.click(screen.getByTestId('testeditteammodal'));
});