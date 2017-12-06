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
    isDeletable={(node, depth)=>{
        // Only show Delete button on root level
        // which is depth = 0
        // NOTE: The highest/root depth is 0, node children are depth+1
        if(depth === 0){
            return true;
        }else{
            return false;
        }
    }}
    onDeleteCb={(node, updatedData, depth)=>{
        alert(\`\${node.name} will be deleted\`);
        return true;
    }}
/>`
        return (
            <div>
                <h2>Delete options</h2>
                <p>These are the options:</p>
                <ol>
                    <li><code>isDeletable</code> Show/hide delete button. Default returns <code>true</code></li>
                    <li><code>onDeleteCb</code> Callback when Delete button is clicked</li>
                    <li><code>deleteElement</code> Pass in your custom delete button. Default <code>&lt;div&gt;(X)&lt;/div&gt;</code></li>
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
                                    isDeletable={(node, depth)=>{
                                        // Only show Delete button on root level
                                        // which is depth = 0
                                        // NOTE: The highest/root depth is 0, node children are depth+1
                                        if(depth === 0){
                                            return true;
                                        }else{
                                            return false;
                                        }
                                    }}
                                    onDeleteCb={(node, updatedData, depth)=>{
                                        alert(`${node.name} will be deleted`);
                                        return true;
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
