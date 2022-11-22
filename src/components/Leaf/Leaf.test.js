import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Leaf from '.';
import LeafName from '../LeafName';

const flag = { flag: 0 };

const obj = {
    displayName: 'Sarim',
    userPrincipalName: 'SAzriel@btig.com',
    teamName: 'Hexaa',
    teamLead: true,
    directTeamMembers: [],
    dimensions: {
        Left: true,
        horizontal: false,
    },
};

test('node render in the dom', async () => {
    render(<Leaf object={obj} />);
});

test('node render in the dom', async () => {
    render(<Leaf object={obj} totalNodes={1} handleNode={() => {}} />);
    const devEl = await screen.findByTestId('testleaf');
    expect(devEl).toBeInTheDocument();
});

test('Renders Name of the flat team when mouse hovers', async () => {
    render(<LeafName data={obj} flag={true} />);
    fireEvent.mouseOver(screen.getByTestId('testClick'));
    await waitFor(() => screen.getByTestId('testleaftooltip'));

    expect(screen.getByTestId('testleaftooltipchild')).toBeInTheDocument();
});

test('Show the name of the employee in the leaf', async () => {
    render(<LeafName data={obj} flag={false} />);
    const element = await screen.findByTestId('testClick');
    expect(element).toHaveTextContent('Sarim');
});

test('Null renders when there is no team lead', async () => {
    render(<Leaf object={{ ...obj, TeamLead: false }} />);

    const element = await screen.findByTestId('testleaf');

    expect(element).toHaveTextContent('');
});
