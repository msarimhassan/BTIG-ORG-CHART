import { css } from '@emotion/css';

 interface Params {
    lineHeight?: string;
    lineWidth?: string;
    lineColor?: string;
    lineBorderRadius?: string;
    nodePadding?: string;
}

export const styles = ({ lineHeight, lineWidth, lineColor, lineBorderRadius, nodePadding }:Params) => {
    return css`
                padding-inline-start: 0;
                margin: 0;
                display: flex;
                justify-content: center;
                --line-height: ${lineHeight};
                --line-width: ${lineWidth};
                --line-color: ${lineColor};
                --line-border-radius: ${lineBorderRadius};
                --node-padding: ${nodePadding};
                --tree-line-height: var(--line-height, 20px);
                --tree-line-width: var(--line-width, 1px);
                --tree-line-color: var(--line-color, black);
                --tree-line-border-radius: var(--line-border-radius, 2px);
                --tree-node-padding: var(--node-padding, 2px);
            `
}
