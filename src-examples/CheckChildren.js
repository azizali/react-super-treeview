import React, { Component } from 'react';
import SuperTreeView from '../dist/main.js';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai as style } from 'react-syntax-highlighter/dist/styles';
import '../dist/style.css';

export default class extends Component {
    constructor (){
        super();

        this.state = {
            data: [
                {
                    id: 2,
                    name: 'Check/uncheck all children',
                    isExpanded: true,
                    children: [
                        {
                            id: 21,
                            name: 'Child 1',
                            isExpanded: true,
                            children: [
                                {
                                    id: 5,
                                    name: "Grand Child 1",
                                    isExpanded: false,
                                },
                                {
                                    id: 6,
                                    name: "Grand Child 2",
                                    isExpanded: false,
                                },
                                {
                                    id: 7,
                                    name: "Grand Child 3",
                                    isExpanded: false,
                                },
                                {
                                    id: 8,
                                    name: "Grand Child 4",
                                    isExpanded: false,
                                }
                            ]
                        },
                        {
                            id: 22,
                            name: 'Child 2'
                        },
                        {
                            id: 23,
                            name: 'Child 3'
                        },
                        {
                            id: 24,
                            name: 'Child 4'
                        }
                    ]
                }
            ]
        }
    }

    render(){
        const codeString = `this.state = {
    data: [
        {
            id: 2,
            name: 'Check/uncheck all children',
            isExpanded: true,
            children: [
                {
                    id: 21,
                    name: 'Child 1',
                    isExpanded: true,
                    children: [
                        {
                            id: 5,
                            name: "Grand Child 1",
                            isExpanded: false,
                        },
                        {
                            id: 6,
                            name: "Grand Child 2",
                            isExpanded: false,
                        },
                        {
                            id: 7,
                            name: "Grand Child 3",
                            isExpanded: false,
                        },
                        {
                            id: 8,
                            name: "Grand Child 4",
                            isExpanded: false,
                        }
                    ]
                },
                {
                    id: 22,
                    name: 'Child 2'
                },
                {
                    id: 23,
                    name: 'Child 3'
                },
                {
                    id: 24,
                    name: 'Child 4'
                }
            ]
        }
    ]
}

<SuperTreeView
    data={ this.state.data }
    onUpdateCb={(updatedData)=>{
        this.setState({data: updatedData})
    }}
    onCheckToggleCb={(nodes)=>{
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
    }}
/>`;
        return (
            <div>
                <h2>Check/Uncheck all children</h2>
                <hr/>
                <div className="row">
                    <div className="col-xs-12 col-lg-8 col-md-8">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <SuperTreeView
                                    data={ this.state.data }
                                    onCheckToggleCb={(nodes)=>{
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
                                    }}
                                    onUpdateCb={(updatedData)=>{
                                        this.setState({data: updatedData})
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <h5>Source code:</h5>

                <SyntaxHighlighter language='javascript' style={style}>
                    {codeString}
                </SyntaxHighlighter>
            </div>
        )
    }
}
