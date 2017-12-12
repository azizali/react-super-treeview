import React, { Component } from 'react';
import SuperTreeView from '../dist/main.js';
import { cloneDeep, find } from 'lodash';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai as style } from 'react-syntax-highlighter/dist/styles';
import '../dist/style.css';

export default class extends Component {
    constructor (){
        super();

        this.state = {
            data: [
                {
                    id: 1,
                    name: 'Node without children'
                },
                {
                    id: 2,
                    name: 'Node with children',
                    children: [
                        {
                            id: 1,
                            name: 'Child A',
                            children: [
                                {
                                    id: 1,
                                    name: 'Grand Child x',
                                    children: [
                                        {
                                            id: 1,
                                            name: 'Grand Grand Child x1',
                                        },
                                        {
                                            id: 2,
                                            name: 'Grand Grand Child x2',
                                        },
                                    ]
                                },
                                {
                                    id: 2,
                                    name: 'Grand Child y',
                                    children: [
                                        {
                                            id: 1,
                                            name: 'Grand Grand Child y1',
                                        },
                                        {
                                            id: 2,
                                            name: 'Grand Grand Child y2',
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            id: 2,
                            name: 'Child B'
                        },
                        {
                            id: 3,
                            name: 'Child C'
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Node Asynchronously loading children'
                },
                {
                    id: 4,
                    name: 'Check/uncheck me only',
                    children: [
                        {
                            id: 1,
                            name: 'Child x',
                            isExpanded: true,
                            children: [
                                {
                                    id: 1,
                                    name: 'Grand Child x1',
                                },
                                {
                                    id: 2,
                                    name: 'Grand Child x2',
                                },
                            ]
                        }
                    ]
                },
                {
                    id: 5,
                    name: 'Check/uncheck me & all children',
                    children: [
                        {
                            id: 1,
                            name: 'Child x',
                            isExpanded: true,
                            children: [
                                {
                                    id: 1,
                                    name: 'Grand Child x1',
                                },
                                {
                                    id: 2,
                                    name: 'Grand Child x2',
                                },
                            ]
                        }
                    ]
                },
                {
                    id: 6,
                    name: 'Node with delete button',
                    children: [
                        {
                            id: 1,
                            name: 'Child x',
                            isExpanded: true,
                            children: [
                                {
                                    id: 1,
                                    name: 'Grand Child x1',
                                },
                                {
                                    id: 2,
                                    name: 'Grand Child x2',
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    }

    render(){
        const { state, setState } = this;
        const codeString = ``
        return (
            <div>
                <h2>Every Feature</h2>
                <hr/>
                <div className="row">
                    <div className="col-xs-12 col-lg-8 col-md-8">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <SuperTreeView
                                    data={ this.state.data }
                                    onUpdateCb={(updatedData)=>{
                                        this.setState({data: updatedData});
                                    }}
                                    isCheckable={()=>(true)}
                                    isDeletable={(node)=>( (node.id===6)? true: false )}
                                    isExpandable={(node, depth)=> (true)}
                                    onExpandToggleCb={(node, depth)=>{

                                        const asyncNodeId = 3;
                                        if(node.id === asyncNodeId && node.isExpanded === true){
                                            // This will show the loading sign
                                            node.isChildrenLoading = true;

                                            setTimeout(()=>{
                                                const updatedData = cloneDeep(state.data);

                                                // Remove loading sign
                                                updatedData[asyncNodeId-1].isChildrenLoading = false;

                                                // Make sure node is expanded
                                                updatedData[asyncNodeId-1].isExpanded = true;

                                                // Set Children data that you potentially
                                                // got from an API response
                                                updatedData[asyncNodeId-1].children = [
                                                    {
                                                        id: 22,
                                                        name: 'Child 1'
                                                    },
                                                    {
                                                        id: 23,
                                                        name: 'Child 2'
                                                    }
                                                ];

                                                // Update state
                                                this.setState({data: updatedData})

                                            }, 1700);
                                        }
                                    }}
                                    onCheckToggleCb={(nodes)=>{
                                        const checkedNode = nodes[0];

                                        if(checkedNode.id === 5){
                                            const checkState = nodes[0].isChecked;

                                            applyCheckStateTo(nodes);

                                            function applyCheckStateTo(nodes){
                                                nodes.forEach((node)=>{
                                                    node.isChecked = checkState
                                                    if(node.children){
                                                        applyCheckStateTo(node.children);
                                                    }
                                                })
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <h5>Source code:</h5>
                <SyntaxHighlighter language='javascript' style={style}>
                    {codeString}
                </SyntaxHighlighter> */}
            </div>
        )
    }
}
