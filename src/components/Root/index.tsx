import React from 'react';

import './Root.css';
interface Props {
    object: any;
}
const Root: React.FC<Props> = ({ object }: Props) => {
    return (
        <div className='root' data-testid='testroot'>
            {object?.displayName}
        </div>
    );
};

export default Root;
