import React from 'react';
import { cx } from '@emotion/css';
import type { ReactNode } from 'react';
import {
  node,
  nodeLines,
  childrenContainer,
  mergedNodeLines,
  childrenContainerWithoutLine,
} from './styles';

export interface TreeNodeProps {
  label: React.ReactNode;
  className?: string;
  children?: ReactNode;
  width: number;
  isRoot?: boolean;
  level?: number;
  nodeWithoutTeamLead?: boolean;
  isMergedNode?: boolean;
  totalVerticalNode?: number;
  lineHidden?: boolean;
  makeVisible?: boolean;
}

function TreeNode({
  children,
  label,
  className,
  width,
  isRoot,
  level,
  totalVerticalNode,
  isMergedNode,
  lineHidden,
  makeVisible,
}: TreeNodeProps) {
  const centered = totalVerticalNode === 0;

  if (makeVisible === false) return null;

  return (
    <li
      data-testid='testtreenode'
      style={{
        width: isRoot ? 'inherit' : width,
        paddingLeft: level === 3 ? 0 : 10,
        paddingRight: level === 3 ? 0 : 10,
        marginTop: isMergedNode ? 60 : 'inherit',
        marginLeft: centered ? 'auto' : undefined,
        marginRight: centered ? 'auto' : undefined,
      }}
      className={
        isMergedNode ? cx(node, mergedNodeLines, className) : cx(node, nodeLines, className)
      }
    >
      {label}
      {React.Children.count(children) > 0 && (
        <ul
          style={{ display: lineHidden ? 'none' : undefined }}
          className={lineHidden ? childrenContainerWithoutLine : childrenContainer}
        >
          {children}
        </ul>
      )}
    </li>
  );
}

export default TreeNode;
