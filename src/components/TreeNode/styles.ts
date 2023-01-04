import { css } from "@emotion/css";

const verticalLine = css`
    content: '';
    position: absolute;
    top: 0;
    height: var(--tree-line-height);
    box-sizing: border-box;
`;

const childrenContainer = css`
    display: flex;
    padding-inline-start: 0;
    margin: 0;
    padding-top: var(--tree-line-height);
    position: relative;
    ::before {
        ${verticalLine};
        left: 50%;
        width: 0;
        border-left: var(--tree-line-width) solid var(--tree-line-color);
    }
`;

const childrenContainerWithoutLine = css`
    display: flex;
    padding-inline-start: 0;
    margin: 0;
    padding-top: var(--tree-line-height);
    position: relative;
`;

const node = css`
    /* flex: auto; */
    text-align: center;
    list-style-type: none;
    position: relative;
    /* margin-left: auto;
    margin-right: auto; */
    padding: 0 var(--tree-node-padding) 0 var(--tree-node-padding);
`;

const nodeLines = css`
    ::before,
    ::after {
        ${verticalLine};
        right: 50%;
        width: 50%;
        border-top: var(--tree-line-width) solid var(--tree-line-color);
    }
    ::after {
        left: 50%;
        border-left: var(--tree-line-width) solid var(--tree-line-color);
    }
    :only-of-type {
        padding: 0;
        ::after,
        :before {
            display: none;
        }
    }
    :first-of-type {
        ::before {
            border: 0 none;
        }
        ::after {
            border-radius: var(--tree-line-border-radius) 0 0 0;
        }
    }
    :last-of-type {
        ::before {
            border-right: var(--tree-line-width) solid var(--tree-line-color);
            border-radius: 0 var(--tree-line-border-radius) 0 0;
            /* margin-top: -60px;
            height: 70px; */
        }
        ::after {
            border: 0 none;
        }
    }
`;

const mergedNodeLines = css`
    ::before,
    ::after {
        ${verticalLine};
        right: 50%;
        width: 50%;
        border-top: var(--tree-line-width) solid var(--tree-line-color);
    }
    ::after {
        left: 50%;
        border-left: var(--tree-line-width) solid var(--tree-line-color);
    }
    :only-of-type {
        padding: 0;
        ::after,
        :before {
            display: none;
        }
    }
    :first-of-type {
        ::before {
            border: 0 none;
        }
        ::after {
            border-radius: var(--tree-line-border-radius) 0 0 0;
        }
    }
    :last-of-type {
        ::before {
            border-right: var(--tree-line-width) solid var(--tree-line-color);
            border-radius: 0 var(--tree-line-border-radius) 0 0;
            margin-top: -60px;
            height: 70px;
        }
        ::after {
            border: 0 none;
        }
    }
`;


export {verticalLine,childrenContainer,node,nodeLines, mergedNodeLines, childrenContainerWithoutLine}