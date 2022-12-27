import React from 'react';
import { cx } from '@emotion/css';
import type { ReactNode } from 'react';
import { node, nodeLines, childrenContainer, mergedNodeLines } from './styles';

export interface TreeNodeProps {
    label: React.ReactNode;
    className?: string;
    children?: ReactNode;
    width: number;
    isRoot?: boolean;
    level?: number;
    nodeWithoutTeamLead?: boolean;
    isMergedNode?: boolean
}

function TreeNode({ children, label, className, width, isRoot, level, nodeWithoutTeamLead, isMergedNode }: TreeNodeProps) {
    return (
      <li
        data-testid="testtreenode"
        style={{
          width: isRoot ? "inherit" : width,
          paddingLeft: level === 3 ? 0 : 10,
          paddingRight: level === 3 ? 0 : 10,
          marginTop: isMergedNode ? 60 : 'inherit',
        }}
        className={isMergedNode ? cx(node, mergedNodeLines, className) : cx(node, nodeLines, className)}
      >
        {label}
        {React.Children.count(children) > 0 && (
          <ul className={childrenContainer}>{children}</ul>
        )}
      </li>
    );
}

export default TreeNode;
