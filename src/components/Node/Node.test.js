import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Node from '.';

const obj = {
    DisplayName: 'Azriel, Mohammed',
    UserPrincipalName: 'SAzriel@btig.com',
    Team: 'Hexaa',
    TeamLead: false,
    DirectTeamMembers: [],
    Dimensions: {
        Left: true,
        Horizontal: false,
    },
    ReportsIntoUpn: null,
    FlatTeam: [],
};

test('node render in the dom', async () => {
    render(<Node object={obj} />);

    const devEl = await screen.findByTestId('testteamNode');

    expect(devEl).toBeInTheDocument();
});

test('Employee name  renders the text inside the node', async () => {
    render(<Node object={obj} />);
    const element = await screen.findByTestId('testTeamName');
    expect(element).toHaveTextContent('Hexaa');
});

test('Renders tooltip when mouse hovers', async () => {
    render(<Node object={obj} />);
    fireEvent.mouseOver(screen.getByTestId('testteamNode'));
    await waitFor(() => screen.getByTestId('testTooltip'));

    expect(screen.getByTestId('testToolTipchild')).toBeInTheDocument();
});
