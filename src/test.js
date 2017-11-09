import React from 'react';
import { shallow } from 'enzyme';
import ExpandableTree from './';

const standardProps = {
    data: [
        {
            id: 1,
            name: 'PARENT 1'
        },
        {
            id: 2,
            name: 'PARENT 2',
            isExpanded: true,
            children: [
                {
                    id: 21,
                    name: 'child 2.1'
                },
                {
                    id: 22,
                    name: 'child 2.2'
                },
                {
                    id: 23,
                    name: 'child 2.3'
                }
            ]
        },
        {
            id: 3,
            name: 'PARENT 3'
        },
        {
            id: 4,
            name: 'PARENT 4'
        }
    ]
};

function componentPrinter(type, props = standardProps) {
    if (type === 'shallow') {
        return shallow(<ExpandableTree {...props} />);
    }
}

describe('<ExpandableTree />', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('componentWillMount()', () => {
        let component = componentPrinter('shallow');
        let componentWrapElement = component.find('.expandable-tree');
        let transitionGroupElement = componentWrapElement.find(
            'TransitionGroup'
        );

        it('should print node wrapper', () => {
            expect(component.find('.expandable-tree')).to.have.length(1);
        });

        it('should print all nodes', () => {
            const numberOfNodes = standardProps.data.length;

            expect(componentWrapElement.find('CSSTransition')).to.have.length(
                numberOfNodes
            );
        });

        it('should print node children', () => {
            const numberOfChildren = standardProps.data[1].children.length;

            const secondChildComponent = component
                .find('ExpandableTree')
                .dive();
            const expandableClass = secondChildComponent.find(
                '.expandable-tree'
            );

            expect(expandableClass.find('CSSTransition')).to.have.length(
                numberOfChildren
            );
        });

        it('should print node label', () => {
            const firstLabel = standardProps.data[0].name;
            const secondLabel = standardProps.data[1].name;
            const thirdLabel = standardProps.data[2].name;

            expect(
                componentWrapElement
                    .find('TransitionGroup')
                    .childAt(0)
                    .find('CSSTransition > div')
                    .text()
            ).to.equal(firstLabel);
            expect(
                componentWrapElement
                    .find('TransitionGroup')
                    .childAt(1)
                    .find('CSSTransition > div')
                    .text()
            ).to.equal(`${secondLabel}<ExpandableTree />`);
            expect(
                componentWrapElement
                    .find('TransitionGroup')
                    .childAt(2)
                    .find('CSSTransition > div')
                    .text()
            ).to.equal(thirdLabel);
        });

        it('should show checkbox', () => {
            const checkboxSelector = 'input[type="checkbox"]';

            expect(
                transitionGroupElement.childAt(0).find(checkboxSelector)
            ).to.have.length(1);
            expect(
                transitionGroupElement.childAt(1).find(checkboxSelector)
            ).to.have.length(1);
            expect(
                transitionGroupElement.childAt(2).find(checkboxSelector)
            ).to.have.length(1);
        });

        it('should show delete button', () => {
            const deleteBtnSelector = 'span.glyphicon-trash';

            expect(
                transitionGroupElement.childAt(0).find(deleteBtnSelector)
            ).to.have.length(1);
            expect(
                transitionGroupElement.childAt(1).find(deleteBtnSelector)
            ).to.have.length(1);
            expect(
                transitionGroupElement.childAt(2).find(deleteBtnSelector)
            ).to.have.length(1);
        });

        it('should show toggle button', () => {
            const toggleBtnSelector = '.expandable-tree-triangle-btn';
            expect(
                transitionGroupElement.childAt(0).find(toggleBtnSelector)
            ).to.have.length(1);
            expect(
                transitionGroupElement.childAt(1).find(toggleBtnSelector)
            ).to.have.length(1);
            expect(
                transitionGroupElement.childAt(2).find(toggleBtnSelector)
            ).to.have.length(1);
        });

        it('should NOT show checkbox', () => {
            var component = componentPrinter('shallow', {
                isCheckable: () => {
                    return false;
                },
                ...standardProps
            });
            var componentWrapElement = component.find('.expandable-tree');

            const checkboxSelector = 'input[type="checkbox"]';

            expect(
                componentWrapElement.childAt(0).find(checkboxSelector)
            ).to.have.length(0);
            expect(
                componentWrapElement.childAt(1).find(checkboxSelector)
            ).to.have.length(0);
            expect(
                componentWrapElement.childAt(2).find(checkboxSelector)
            ).to.have.length(0);
        });

        it('should NOT show delete button', () => {
            var component = componentPrinter('shallow', {
                isDeletable: () => {
                    return false;
                },
                ...standardProps
            });
            var componentWrapElement = component.find('.expandable-tree');

            const deleteBtnSelector = 'span.glyphicon-trash';

            expect(
                componentWrapElement.childAt(0).find(deleteBtnSelector)
            ).to.have.length(0);
            expect(
                componentWrapElement.childAt(1).find(deleteBtnSelector)
            ).to.have.length(0);
            expect(
                componentWrapElement.childAt(2).find(deleteBtnSelector)
            ).to.have.length(0);
        });

        it('should NOT show toggle button', () => {
            var component = componentPrinter('shallow', {
                isExpandable: () => {
                    return false;
                },
                ...standardProps
            });
            var componentWrapElement = component.find('.expandable-tree');

            const toggleBtnSelector = 'expandable-tree-triangle-btn';

            expect(
                componentWrapElement.childAt(0).find(toggleBtnSelector)
            ).to.have.length(0);
            expect(
                componentWrapElement.childAt(1).find(toggleBtnSelector)
            ).to.have.length(0);
            expect(
                componentWrapElement.childAt(2).find(toggleBtnSelector)
            ).to.have.length(0);
        });
    });

    describe('componentWillReceiveProps()', () => {
        const newData = [
            {
                id: 1,
                name: 'Parent 1'
            }
        ];

        let component, sandbox;

        beforeEach(() => {
            component = componentPrinter('shallow');
            sandbox = sinon.sandbox.create();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should update props', () => {
            let setStateSpy = sandbox.spy(ExpandableTree.prototype, 'setState');

            component.setProps({ data: newData });
            expect(setStateSpy).to.have.been.calledOnce;
        });
    });

    describe('handleUpdate()', () => {
        let component, onUpdateCbStub;

        beforeEach(() => {
            onUpdateCbStub = sandbox.stub();

            component = componentPrinter('shallow', {
                onUpdateCb: onUpdateCbStub,
                ...standardProps
            });
        });

        it('should call onUpdateCb()', () => {
            component.instance().handleUpdate();
            expect(onUpdateCbStub).to.have.been.calledOnce;
        });
    });

    describe('handleCheckToggle()', () => {
        const checkboxSelector = 'input[type="checkbox"]';

        let sandbox,
            component,
            componentInstance,
            onCheckToggleCbStub,
            handleCheckToggleSpy,
            handleUpdateStub,
            checkbox;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            onCheckToggleCbStub = sandbox.stub();

            component = componentPrinter('shallow', {
                onCheckToggleCb: onCheckToggleCbStub,
                ...standardProps
            });

            componentInstance = component.instance();
            handleCheckToggleSpy = sandbox.spy(
                componentInstance,
                'handleCheckToggle'
            );
            handleUpdateStub = sandbox.spy(componentInstance, 'handleUpdate');

            checkbox = component
                .find('.expandable-tree')
                .find('TransitionGroup')
                .childAt(0)
                .find(checkboxSelector);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should set lastCheckToggledNodeIndex to currentNode', () => {
            let setStateSpy = sandbox.spy(ExpandableTree.prototype, 'setState');

            checkbox.simulate('click', { target: { checked: false } });

            expect(setStateSpy).to.have.been.calledOnce;
        });

        it('should update data', () => {
            checkbox.simulate('click', { target: { checked: false } });
            expect(handleUpdateStub).to.have.been.calledOnce;
        });

        describe('When 1 node is check toggled', () => {
            it('should check checkbox', () => {
                let event = { target: { checked: true } };
                let node = standardProps.data[0];

                checkbox.simulate('click', event);

                expect(handleCheckToggleSpy).to.have.been.calledWith(
                    node,
                    event
                );
            });

            it('should uncheck checkbox', () => {
                let event = { target: { checked: false } };
                let node = standardProps.data[0];

                checkbox.simulate('click', event);

                expect(handleCheckToggleSpy).to.have.been.calledWith(
                    node,
                    event
                );
            });

            it('should call onCheckToggleCb() once with array of updated node', () => {
                let { depth } = componentInstance.props;
                let event = { target: { checked: false } };
                let node = standardProps.data[0];
                node.isChecked = event.target.checked;

                checkbox.simulate('click', event);

                expect(onCheckToggleCbStub).to.have.been.calledWith(
                    [node],
                    depth
                );
            });
        });

        describe('When shift-key is pressed', () => {
            let event = {
                shiftKey: true,
                target: {
                    checked: true
                }
            };

            it('should have "lastCheckToggledNodeIndex" as "null" on very 1st toggle', () => {
                expect(componentInstance.state.lastCheckToggledNodeIndex).to.be
                    .null;
            });

            it('should have "lastCheckToggledNodeIndex" as "number" on subsequent toggles', () => {
                checkbox.simulate('click', event);

                expect(
                    componentInstance.state.lastCheckToggledNodeIndex
                ).to.equal(0);
            });

            describe('When 4th checkbox is shift-checked, after 2nd Checkbox was previously toggled', () => {
                let checkbox4;

                beforeEach(() => {
                    // When second checkbox was previously checked
                    component.setState({ lastCheckToggledNodeIndex: 1 });

                    checkbox4 = component
                        .find('.expandable-tree')
                        .find('TransitionGroup')
                        .childAt(3)
                        .find(checkboxSelector);
                    checkbox4.simulate('click', event);
                });

                it('should call "onCheckToggleCbStub" once', () => {
                    // expect(onCheckToggleCbStub).to.have.been.calledWith(node, depth);
                    expect(onCheckToggleCbStub).to.have.been.callOnce;
                });

                it('should set "lastCheckToggledNodeIndex" to index of 4th checkbox', () => {
                    expect(
                        componentInstance.state.lastCheckToggledNodeIndex
                    ).to.equal(3);
                });

                it('should set "isChecked" to true for 2nd, 3rd and 4th checkbox', () => {
                    let { depth } = componentInstance.props,
                        node2 = standardProps.data[1],
                        node3 = standardProps.data[2],
                        node4 = standardProps.data[3];

                    node2.isChecked = true;
                    node3.isChecked = true;
                    node4.isChecked = true;

                    expect(onCheckToggleCbStub).to.have.been.calledWith(
                        [node2, node3, node4],
                        depth
                    );
                });
            });

            describe('When 3rd checkbox is shift-unChecked, after 1st Checkbox was previously toggled', () => {
                let eventUncheck = {
                    shiftKey: true,
                    target: {
                        checked: false
                    }
                };

                let checkbox3;
                let componentWrapElement;
                let transitionGroupElement;

                beforeEach(() => {
                    // When 1st checkbox was previously toggled
                    component.setState({ lastCheckToggledNodeIndex: 0 });
                    componentWrapElement = component.find('.expandable-tree');
                    transitionGroupElement = componentWrapElement.find(
                        'TransitionGroup'
                    );

                    checkbox3 = transitionGroupElement
                        .childAt(2)
                        .find(checkboxSelector);
                    checkbox3.simulate('click', eventUncheck);
                });

                it('should call "onCheckToggleCbStub" once', () => {
                    expect(onCheckToggleCbStub).to.have.been.callOnce;
                });

                it('should set "lastCheckToggledNodeIndex" to index of 3rd checkbox', () => {
                    expect(
                        componentInstance.state.lastCheckToggledNodeIndex
                    ).to.equal(2);
                });

                it('should set "isChecked" to false for 1st, 2nd and 3rd checkbox', () => {
                    let { depth } = componentInstance.props,
                        node1 = standardProps.data[0],
                        node2 = standardProps.data[1],
                        node3 = standardProps.data[2];

                    node1.isChecked = false;
                    node2.isChecked = false;
                    node3.isChecked = false;

                    expect(onCheckToggleCbStub).to.have.been.calledWith(
                        [node1, node2, node3],
                        depth
                    );
                });
            });
        });
    });

    describe('printNodes()', () => {
        it('should call printNoChildrenMessage when nodeArray is empty', () => {
            const noChildrenAvailableMessage = 'Test This No children Message';
            const printNoChildrenMessage = sandbox.spy(
                ExpandableTree.prototype,
                'printNoChildrenMessage'
            );
            const component = componentPrinter('shallow', {
                ...standardProps,
                noChildrenAvailableMessage
            });
            component.instance().printNodes([]);
            expect(printNoChildrenMessage).to.be.calledOnce;
        });
        it('should return nodes when nodeArray is not empty', () => {
            const nodeArray = [{}, {}, {}];
            const component = componentPrinter('shallow', {
                ...standardProps
            });
            const nodes = component.instance().printNodes(nodeArray);
            const nodesElement = shallow(nodes);
            expect(nodesElement.find('.expandable-tree-node')).to.have.length(
                nodeArray.length
            );
        });
    });

    describe('printChildren()', () => {
        let component, componentInstance;

        it('should return null when isExpanded is false', () => {
            component = componentPrinter('shallow', {
                ...standardProps
            });
            componentInstance = component.instance();
            const node = { isExpanded: false };
            expect(componentInstance.printChildren(node)).to.be.equal(null);
        });

        describe('isExpanded is true', () => {
            it('should return loadingElement when isChildrenLoading is true', () => {
                const loadingId = 'this-is-a-spinner';
                const loadingElement = <div id={loadingId} />;
                component = componentPrinter('shallow', {
                    ...standardProps,
                    loadingElement
                });
                componentInstance = component.instance();
                const node = { isExpanded: true, isChildrenLoading: true };
                const children = shallow(componentInstance.printChildren(node));
                expect(children.find(`#${loadingId}`)).to.have.length(1);
            });

            it('should return ExpandableTree when isChildrenLoading is false', () => {
                component = componentPrinter('shallow', {
                    ...standardProps
                });
                componentInstance = component.instance();
                const node = {
                    isExpanded: true,
                    isChildrenLoading: false,
                    children: [{}, {}, {}]
                };
                const children = shallow(componentInstance.printChildren(node));
                expect(children.find('ExpandableTree')).to.have.length(1);
            });
        });
    });

    describe('handleDelete()', () => {
        let component,
            componentInstance,
            handleUpdateSpy,
            onDeleteCbStub,
            deleteBtn;

        beforeEach(() => {
            onDeleteCbStub = sandbox.stub();

            component = componentPrinter('shallow', {
                onDeleteCb: onDeleteCbStub,
                ...standardProps
            });

            componentInstance = component.instance();

            handleUpdateSpy = sandbox.spy(componentInstance, 'handleUpdate');

            const deleteBtnSelector = 'span.glyphicon-trash';
            deleteBtn = component
                .find('.expandable-tree')
                .find('TransitionGroup')
                .childAt(0)
                .find(deleteBtnSelector);
        });

        it('should delete on delete button click', () => {
            const handleDeleteSpy = sandbox.spy(
                componentInstance,
                'handleDelete'
            );

            deleteBtn.simulate('click');

            expect(handleDeleteSpy).have.been.calledOnce;
            expect(onDeleteCbStub).have.been.calledOnce;
        });

        it('should update data on successful deleteCb', () => {
            onDeleteCbStub.returns(true);

            deleteBtn.simulate('click');

            expect(handleUpdateSpy).have.been.calledOnce;
        });

        it('should NOT update data on unsuccessful deleteCb', () => {
            onDeleteCbStub.returns(false);

            deleteBtn.simulate('click');

            expect(handleUpdateSpy).not.have.been.called;
        });

        it('should delete child node', () => {
            onDeleteCbStub.returns(true);

            let deleteBtnSelector = 'span.glyphicon-trash';

            let childExpandableTree = component
                .find('.expandable-tree')
                .find('TransitionGroup')
                .childAt(1)
                .find('ExpandableTree')
                .dive();

            let childDeleteBtn = childExpandableTree
                .find('.expandable-tree')
                .find('TransitionGroup')
                .childAt(0)
                .find(deleteBtnSelector);

            childDeleteBtn.simulate('click');

            expect(handleUpdateSpy).have.been.called;
        });
    });

    describe('handleExpandToggle()', () => {
        let component,
            onExpandToggleCbStub,
            expandToggleBtn,
            handleExpandToggleSpy;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();

            onExpandToggleCbStub = sandbox.stub();

            handleExpandToggleSpy = sandbox.spy(
                ExpandableTree.prototype,
                'handleExpandToggle'
            );

            component = componentPrinter('shallow', {
                onExpandToggleCb: onExpandToggleCbStub,
                ...standardProps
            });

            const expandToggleBtnSelector = '.expandable-tree-triangle-btn';
            expandToggleBtn = component
                .find('.expandable-tree')
                .find('TransitionGroup')
                .childAt(0)
                .find(expandToggleBtnSelector);
        });

        it('should toggle tree on expand', () => {
            expandToggleBtn.simulate('click');

            expect(handleExpandToggleSpy).have.been.calledOnce;
            expect(onExpandToggleCbStub).have.been.calledOnce;
        });
    });
});
