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
    width: number;
}

const Tree: FC<TreeProps> = ({
    children,
    label,
    lineHeight = '10px',
    lineWidth = '2px',
    lineColor = 'rgb(191, 191, 191)',
    nodePadding = '0px',
    lineBorderRadius = '2px',
    width,
}) => {
    return (
        <ul
            data-testid='testtree'
            className={styles({ lineHeight, lineWidth, lineColor, nodePadding, lineBorderRadius })}
        >
            <TreeNode level={1} isRoot width={width}  label={label}>{children}</TreeNode>
        </ul>
    );
};

export default Tree;
