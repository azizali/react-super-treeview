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
                            name: 'Child 1',
                            isExpanded: true,
                            children: [
                                {
                                    id: 5,
                                    name: "Grand Child",
                                    isExpanded: true
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
                    name: 'Child 1',
                    isExpanded: true,
                    children: [
                        {
                            id: 5,
                            name: "Grand Child",
                            isExpanded: true
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
/>`;
        return (
            <div>
                <h2>Basic</h2>
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
