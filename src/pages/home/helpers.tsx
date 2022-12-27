export const calculateDimensions = ({
    totalVerticalNode,
    totalLeftNodes,
    window,
}: any) => {
    const offset = 50; // for escaping from horizontal scroll

    let width = (window.width - offset) / (totalVerticalNode + 1);
    
    const baseGap = 20;
    const maxWidth = 200;
    let widthDiff = 0;

    widthDiff = width - maxWidth;

    if (width > maxWidth) {
        width = maxWidth;
    }

    const halfOffset = offset / 2;
    const hOffsetDiff = halfOffset + offset / (totalVerticalNode + 1);
    let leftHorizontalNodeWidth =
        (window.width / (totalVerticalNode + 1)) * totalLeftNodes;
    let fullWidthHorizontalNodeWidth = window.width - baseGap * 2;

    if (widthDiff > 0) {
        leftHorizontalNodeWidth = totalLeftNodes * maxWidth - hOffsetDiff;
        fullWidthHorizontalNodeWidth =
        (totalVerticalNode + 1) * maxWidth - hOffsetDiff;
    }

    leftHorizontalNodeWidth -= hOffsetDiff;
    fullWidthHorizontalNodeWidth -= hOffsetDiff;

    leftHorizontalNodeWidth -= baseGap;

    let leftHorizontalNodeMargin =
        widthDiff > 1
        ? (window.width - width * (totalVerticalNode + 1)) / 2 + baseGap / 2
        : baseGap / 2;

    leftHorizontalNodeMargin += Math.floor(halfOffset);
    width -= baseGap;

    return {
        width,
        leftHorizontalNodeWidth,
        leftHorizontalNodeMargin,
        fullWidthHorizontalNodeWidth,
    };
};

export const findNodeDFS = (inputId: string, data: any, result: any): any => {
    
    if (data._id === inputId) {
        result.data = {...data};
        return;
    };

    if (data && data.directTeamMembers) {
        for (let i = 0; i < data.directTeamMembers.length; i++) {
            findNodeDFS(inputId, data.directTeamMembers[i], result)
        }
    }
}