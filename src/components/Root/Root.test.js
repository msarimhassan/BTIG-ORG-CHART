import { render, screen } from '@testing-library/react';
import Root from '.';

const obj = {
    DisplayName: 'Sarim',
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

test('Employee name  renders the text inside the Root', async () => {
    render(<Root object={obj} />);
    const element = await screen.findByTestId('testroot');
    expect(element).toHaveTextContent('HexaaSarim');
});

test('node render in the dom', async () => {
    render(<Root object={obj} />);

    const devEl = await screen.findByTestId('testroot');

    expect(devEl).toBeInTheDocument();
});
