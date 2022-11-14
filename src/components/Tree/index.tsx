import { FC } from 'react';

import TreeNode, { TreeNodeProps } from '../TreeNode';
import { styles } from './Styles';

export interface TreeProps {
    label: TreeNodeProps['label'];
    lineHeight?: string;
    lineWidth?: string;
    lineColor?: string;
    lineBorderRadius?: string;
    nodePadding?: string;
    children: TreeNodeProps['children'];
}

const Tree: FC<TreeProps> = ({
    children,
    label,
    lineHeight = '10px',
    lineWidth = '2px',
    lineColor = '#147CAB',
    nodePadding = '0px',
    lineBorderRadius = '5px',
}) => {
    return (
        <ul
            data-testid='testtree'
            className={styles({ lineHeight, lineWidth, lineColor, nodePadding, lineBorderRadius })}
        >
            <TreeNode label={label}>{children}</TreeNode>
        </ul>
    );
};

export default Tree;
