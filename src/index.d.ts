import * as React from "react";

export type TreeNode = {
    id: number,
    name: string
    children?: Array<TreeNode>
    isExpanded?: boolean
    isChecked?: boolean
    isChildrenLoading?: boolean
}

export type TreeViewProps = {
    data: Array<TreeNode>
    onUpdateCb?: (updatedData: Array<TreeNode>) => void
    isCheckable?: (node: TreeNode, depth: number) => boolean
    isDeletable?: (node: TreeNode, depth: number) => boolean
    isExpandable?: (node: TreeNode, depth: number) => boolean
    getStyleClassCb?: (node: TreeNode, depth: number) => string
    deleteElement?: any;
    depth?: number
    keywordChildrenLoading?: string
    keywordKey?: string
    keywordLabel?: string
    loadingElement?: any;
    noChildrenAvailableMessage?: string
    onCheckToggleCb?: (nodes: Array<TreeNode>, dept: number) => void
    onDeleteCb?: (node: TreeNode, updatedData: Array<TreeNode>, depth: number) => void
    onExpandToggleCb?: (node: TreeNode, depth: number) => void
    transitionEnterTimeout?: number
    transitionExitTimeout?: number
}

declare class SuperTreeView extends React.Component<TreeViewProps> {}

export default SuperTreeView
