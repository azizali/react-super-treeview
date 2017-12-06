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
                    name: 'Parent A'
                },
                {
                    id: 2,
                    name: 'Parent B',
                    isExpanded: true,
                    isChecked: true,
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
            name: 'Parent A'
        },
        {
            id: 2,
            name: 'Parent B',
            isExpanded: true,
            isChecked: true,
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
    isExpandable={(node, depth)=>{

        // Disallow expansion for all nodes of depth 1
        // or for node with the id of '1'
        // NOTE: The highest depth is 0, node children are depth+1

        if(depth === 1 || node.id === 1){
            return false;
        }else{
            return true;
        }
    }}
    onExpandToggleCb={(node, depth)=>{
        const status = (node.isExpanded)? 'open' : 'close';
        alert(\'\${node.name} will \${status}\');
    }}
/>`
        return (
            <div>
                <h2>Expand/Collapse options</h2>
                <p>These are the options:</p>
                <ol>
                    <li><code>isExpandable</code> Show/hide Expand Toggle button (<span className="caret"></span>). Default returns <code>true</code> </li>
                    <li><code>onExpandToggleCb</code> Callback function runs when Expand Toggle button is clicked</li>
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
                                    isExpandable={(node, depth)=>{
                                        // Disallow expansion for all nodes of depth 1
                                        // or for node with the id of `1`
                                        // NOTE: The highest depth is 0, node children are depth+1
                                        if(depth === 1 || node.id === 1){
                                            return false;
                                        }else{
                                            return true;
                                        }
                                    }}
                                    onExpandToggleCb={(node, depth)=>{
                                        const status = (node.isExpanded)? 'open' : 'close';
                                        alert(`${node.name} will ${status} `);
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
