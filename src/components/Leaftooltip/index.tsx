import { FC, useState } from 'react';
import './LeafTooltip.css';

interface Props {
    active?: boolean;
    data: any;
}

const Leaftooltip: FC<Props> = ({ active, data }) => {
    return (
        <>
            <div data-testid='testleaftooltip' className='Tooltip-Wrapper'>
                {active && (
                    <div className='Tooltip-Tip top' data-testid='testleaftooltipchild'>
                        {data.userPrincipalName}
                        <br />
                        {data.displayName}
                    </div>
                )}
            </div>
        </>
    );
};

export default Leaftooltip;
