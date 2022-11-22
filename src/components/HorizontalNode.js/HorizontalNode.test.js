import { render, screen } from '@testing-library/react';
import HorizontalNode from './index';

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

const obj2 = {
    displayName: 'Sarim',
    userPrincipalName: 'SAzriel@btig.com',
    teamName: 'AppDev',
    teamLead: false,
    directTeamMembers: [
        {
            displayName: 'Sarim',
            userPrincipalName: 'SAzriel@btig.com',
            teamName: 'AppDev',
            teamLead: false,
            directTeamMembers: [],
            dimensions: {
                left: true,
                horizontal: true,
            },
        },
    ],
    dimensions: {
        left: true,
        horizontal: true,
    },
};

const obj3 = {
    displayName: 'Sarim',
    userPrincipalName: 'SAzriel@btig.com',
    teamName: 'AppDev',
    teamLead: true,
    directTeamMembers: [
        {
            displayName: 'Sarim',
            userPrincipalName: 'SAzriel@btig.com',
            teamName: 'AppDev',
            teamLead: true,
            directTeamMembers: [],
            dimensions: {
                left: true,
                horizontal: true,
            },
        },
    ],
    dimensions: {
        left: true,
        horizontal: true,
    },
};

test('Horizontal Node render in the dom', async () => {
    render(<HorizontalNode object={obj} />);
    const devEl = await screen.findByTestId('testhorizontalnode');
    expect(devEl).toBeInTheDocument();
});

test('Horizontal Node subteam in the dom', async () => {
    render(<HorizontalNode object={obj2} />);
    const devEl = await screen.findByTestId('testTeamName');
    expect(devEl).toHaveTextContent('AppDev');
});

test('Horizontal Node teamLead in the dom', async () => {
    render(<HorizontalNode object={obj3} />);
    const devEl = await screen.findByTestId('testTeamLead');
    expect(devEl).toHaveTextContent('Sarim');
});
