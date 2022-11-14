import React from 'react';
import { cx } from '@emotion/css';
import type { ReactNode } from 'react';
import { node, nodeLines, childrenContainer } from './styles';

export interface TreeNodeProps {
    label: React.ReactNode;
    className?: string;
    children?: ReactNode;
}

function TreeNode({ children, label, className }: TreeNodeProps) {
    return (
        <li data-testid='testtreenode' className={cx(node, nodeLines, className)}>
            {label}
            {React.Children.count(children) > 0 && (
                <ul className={childrenContainer}>{children}</ul>
            )}
        </li>
    );
}

export default TreeNode;
