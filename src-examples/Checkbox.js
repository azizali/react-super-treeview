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
                    id: 1,
                    name: 'Parent A',
                    isExpanded: true,
                    children: [
                        {
                            id: 21,
                            name: 'Child 1'
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
                        },
                        {
                            id: 25,
                            name: 'Child 5'
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Parent B',
                    isExpanded: true,
                    children: [
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
            id: 1,
            name: 'Parent A',
            isExpanded: true,
            children: [
                {
                    id: 21,
                    name: 'Child 1'
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
                },
                {
                    id: 25,
                    name: 'Child 5'
                }
            ]
        },
        {
            id: 2,
            name: 'Parent B',
            isExpanded: true,
            children: [
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
        isCheckable={(node, depth)=>{
            // hide checkbox for all nodes of depth 1
            // or for node with the id of \`1\`
            // NOTE: The highest depth is 0, node children are depth+1
            if(depth === 0){
                return false;
            }else{
                return true;
            }
        }}
        onCheckToggleCb={(arrayOfNodes, depth)=>{
            const nodeCount = arrayOfNodes.length;
            const status = (arrayOfNodes[0].isChecked)? 'checked': 'unchecked'
            alert(\`\${nodeCount} node(s) will be \${status} \`);
        }}
    />`
        return (
            <div>
                <h2>Checkbox options</h2>
                <p>These are the options:</p>
                <ol>
                    <li><code>isCheckable</code> Show/hide checkbox. Default returns <code>true</code></li>
                    <li><code>onCheckToggleCb</code> Callback function runs when checkbox toggles</li>
                </ol>

                <hr/>
                <div className="row">
                    <div className="col-xs-12 col-lg-8 col-md-8">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <SuperTreeView
                                    data={ this.state.data }
                                    onUpdateCb={(updatedData)=>{
                                        this.setState({data: updatedData})
                                    }}
                                    isCheckable={(node, depth)=>{
                                        // hide checkbox for all nodes of depth 1
                                        // or for node with the id of `1`
                                        // NOTE: The highest depth is 0, node children are depth+1
                                        if(depth === 0){
                                            return false;
                                        }else{
                                            return true;
                                        }
                                    }}
                                    onCheckToggleCb={(arrayOfNodes, depth)=>{
                                        const nodeCount = arrayOfNodes.length;
                                        const status = (arrayOfNodes[0].isChecked)? 'checked': 'unchecked'
                                        alert(`${nodeCount} node(s) will be ${status} `);
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
