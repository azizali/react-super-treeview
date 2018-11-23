import './style.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNil, isEmpty, isEqual, find, get, cloneDeep } from 'lodash';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class SuperTreeview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: cloneDeep(this.props.data),
            lastCheckToggledNodeIndex: null
        };

        this.handleUpdate = this.handleUpdate.bind(this);

        this.printNodes = this.printNodes.bind(this);
        this.printChildren = this.printChildren.bind(this);

        this.printCheckbox = this.printCheckbox.bind(this);
        this.printDeleteButton = this.printDeleteButton.bind(this);
        this.printExpandButton = this.printExpandButton.bind(this);
        this.printNoChildrenMessage = this.printNoChildrenMessage.bind(this);

        this.handleCheckToggle = this.handleCheckToggle.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleExpandToggle = this.handleExpandToggle.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.data, this.props.data)) {
            this.setState({ data: cloneDeep(nextProps.data) });
        }
    }

    handleUpdate(updatedData) {
        const { depth, onUpdateCb } = this.props;

        onUpdateCb(updatedData, depth);
    }

    handleCheckToggle(node, e) {
        const { onCheckToggleCb, depth } = this.props;
        const { lastCheckToggledNodeIndex } = this.state;
        const data = cloneDeep(this.state.data);
        const currentNode = find(data, node);
        const currentNodeIndex = data.indexOf(currentNode);
        const toggledNodes = [];
        if (e.shiftKey && !isNil(lastCheckToggledNodeIndex)) {
            const rangeStart = Math.min(
                currentNodeIndex,
                lastCheckToggledNodeIndex
            );
            const rangeEnd = Math.max(
                currentNodeIndex,
                lastCheckToggledNodeIndex
            );

            const nodeRange = data.slice(rangeStart, rangeEnd + 1);

            nodeRange.forEach((node) => {
                node.isChecked = e.target.checked;
                toggledNodes.push(node);
            });
        } else {
            currentNode.isChecked = e.target.checked;
            toggledNodes.push(currentNode);
        }

        onCheckToggleCb(toggledNodes, depth);
        this.setState({ lastCheckToggledNodeIndex: currentNodeIndex });
        this.handleUpdate(data);
    }

    handleDelete(node) {
        const { onDeleteCb, depth } = this.props;
        const data = cloneDeep(this.state.data);

        const newData = data.filter((nodeItem) => {
            return !isEqual(node, nodeItem);
        });

        onDeleteCb(node, newData, depth) && this.handleUpdate(newData);
    }

    handleExpandToggle(node) {
        const { onExpandToggleCb, depth } = this.props;
        const data = cloneDeep(this.state.data);
        const currentNode = find(data, node);

        currentNode.isExpanded = !currentNode.isExpanded;

        onExpandToggleCb(currentNode, depth);
        this.handleUpdate(data);
    }

    printCheckbox(node) {
        const { isCheckable, keywordLabel, depth } = this.props;

        if (isCheckable(node, depth)) {
            return (
                <input
                    type="checkbox"
                    name={node[keywordLabel]}
                    onClick={(e) => {
                        this.handleCheckToggle(node, e);
                    }}
                    checked={!!node.isChecked}
                    id={node.id}
                />
            );
        }
    }

    printDeleteButton(node) {
        const { isDeletable, depth, deleteElement } = this.props;

        if (isDeletable(node, depth)) {
            return (
                <div className="delete-btn"
                    onClick={() => {
                        this.handleDelete(node);
                    }}
                >
                    {deleteElement}
                </div>
            );
        }
    }

    printExpandButton(node) {
        const className = node.isExpanded
            ? 'super-treeview-triangle-btn-down'
            : 'super-treeview-triangle-btn-right';
        const { isExpandable, depth } = this.props;

        if (isExpandable(node, depth)) {
            return (
                <div
                    className={`super-treeview-triangle-btn ${className}`}
                    onClick={() => {
                        this.handleExpandToggle(node);
                    }}
                />
            );
        }
    }

    printNoChildrenMessage() {
        const {
            transitionExitTimeout,
            noChildrenAvailableMessage
        } = this.props;
        const noChildrenTransitionProps = {
            classNames: 'super-treeview-no-children-transition',
            key: 'super-treeview-no-children',
            style: {
                transitionDuration: `${transitionExitTimeout}ms`,
                transitionDelay: `${transitionExitTimeout}ms`
            },
            timeout: {
                enter: transitionExitTimeout
            },
            exit: false
        };

        return (
            <CSSTransition {...noChildrenTransitionProps}>
                <div className="super-treeview-no-children">
                    <div className="super-treeview-no-children-content">
                        {noChildrenAvailableMessage}
                    </div>
                </div>
            </CSSTransition>
        );
    }

    printNodes(nodeArray) {
        const {
            keywordLabel,
            depth,
            transitionEnterTimeout,
            transitionExitTimeout,
            getStyleClassCb,
            isExpandable
        } = this.props;
        const {
            printExpandButton,
            printCheckbox,
            printDeleteButton,
            printChildren
        } = this;

        const nodeTransitionProps = {
            classNames: 'super-treeview-node-transition',
            style: {
                transitionDuration: `${transitionEnterTimeout}ms`
            },
            timeout: {
                enter: transitionEnterTimeout,
                exit: transitionExitTimeout
            }
        };

        return (
            <TransitionGroup>
                {isEmpty(nodeArray) && isExpandable(nodeArray, depth)
                    ? this.printNoChildrenMessage()
                    : nodeArray.map((node, index) => {
                        const nodeText = get(node, keywordLabel, '');

                        return (
                            <CSSTransition
                                {...nodeTransitionProps}
                                key={node.id || index}
                            >
                                <div
                                    className={
                                        'super-treeview-node' +
                                        getStyleClassCb(node)
                                    }
                                >
                                    <div className="super-treeview-node-content">
                                        {printExpandButton(node, depth)}
                                        {printCheckbox(node, depth)}
                                        <label
                                            htmlFor={node.id}
                                            title={nodeText}
                                            className="super-treeview-text"
                                        >
                                            {nodeText}
                                        </label>
                                        {printDeleteButton(node, depth)}
                                    </div>
                                    {printChildren(node)}
                                </div>
                            </CSSTransition>
                        );
                    })}
            </TransitionGroup>
        );
    }

    printChildren(node) {
        if (!node.isExpanded) {
            return null;
        }

        const { keywordChildren, keywordChildrenLoading, depth } = this.props;
        const isChildrenLoading = get(node, keywordChildrenLoading, false);
        let childrenElement;

        if (isChildrenLoading) {
            childrenElement = get(this.props, 'loadingElement');
        } else {
            childrenElement = (
                <SuperTreeview
                    {...this.props}
                    data={node[keywordChildren] || []}
                    depth={depth + 1}
                    onUpdateCb={onChildrenUpdateCb.bind(this)}
                />
            );
        }

        return (
            <div className="super-treeview-children-container">
                {childrenElement}
            </div>
        );

        function onChildrenUpdateCb(updatedData) {
            const data = cloneDeep(this.state.data);
            const currentNode = find(data, node);

            currentNode[keywordChildren] = updatedData;
            this.handleUpdate(data);
        }
    }

    render() {
        return (
            <div className="super-treeview">
                {this.printNodes(this.state.data)}
            </div>
        );
    }
}

SuperTreeview.propTypes = {
    data: PropTypes.array.isRequired,
    depth: PropTypes.number,

    deleteElement: PropTypes.element,

    getStyleClassCb: PropTypes.func,

    isCheckable: PropTypes.func,
    isDeletable: PropTypes.func,
    isExpandable: PropTypes.func,

    keywordChildren: PropTypes.string,
    keywordChildrenLoading: PropTypes.string,
    keywordKey: PropTypes.string,
    keywordLabel: PropTypes.string,

    loadingElement: PropTypes.element,
    noChildrenAvailableMessage: PropTypes.string,

    onCheckToggleCb: PropTypes.func,
    onDeleteCb: PropTypes.func,
    onExpandToggleCb: PropTypes.func,
    onUpdateCb: PropTypes.func,

    transitionEnterTimeout: PropTypes.number,
    transitionExitTimeout: PropTypes.number
};

SuperTreeview.defaultProps = {
    depth: 0,

    deleteElement: <div>(X)</div>,

    getStyleClassCb: (/* node, depth */) => {
        return '';
    },
    isCheckable: (/* node, depth */) => {
        return true;
    },
    isDeletable: (/* node, depth */) => {
        return true;
    },
    isExpandable: (/* node, depth */) => {
        return true;
    },

    keywordChildren: 'children',
    keywordChildrenLoading: 'isChildrenLoading',
    keywordLabel: 'name',
    keywordKey: 'id',

    loadingElement: <div>loading...</div>,

    noChildrenAvailableMessage: 'No data found',

    onCheckToggleCb: (/* Array of nodes, depth */) => { },
    onDeleteCb: (/* node, updatedData, depth */) => { return true },
    onExpandToggleCb: (/* node, depth */) => { },
    onUpdateCb: (/* updatedData, depth */) => { },

    transitionEnterTimeout: 1200,
    transitionExitTimeout: 1200
};

export default SuperTreeview;
