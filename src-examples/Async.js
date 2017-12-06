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
                    name: 'Parent A'
                }
            ]
        }
    }

    render(){
        const { state, setState } = this;
        const codeString = `this.state = {
    data: [
        {
            id: 1,
            name: 'Parent A'
        }
    ]
}

<SuperTreeView
    data={ this.state.data }
    onUpdateCb={(updatedData)=>{
        this.setState({data: updatedData});
    }}
    isCheckable={()=>(false)}
    isDeletable={()=>(false)}
    isExpandable={(node, depth)=>{ return (depth===0)? true : false; }}
    onExpandToggleCb={(node, depth)=>{
        if(node.isExpanded === true){
            // This will show the loading sign
            node.isChildrenLoading = true;

            setTimeout(()=>{
                const updatedData = cloneDeep(state.data);

                // Remove loading sign
                updatedData[0].isChildrenLoading = false;

                // Make sure node is expanded
                updatedData[0].isExpanded = true;

                // Set Children data that you potentially
                // got from an API response
                updatedData[0].children = [
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
/>`
        return (
            <div>
                <h2>Load Data Asynchronously</h2>
                <p>You can incrementally and asynchronously load data for child nodes.</p>
                <p>You can trigger an API call on any event (expand, check, delete), and update the <code>data</code> prop when your API resolves.</p>
                <p>To show the loading sign, set the <code>isChildrenLoading</code> value to <code>true</code> of the parent node whose chilren are being loaded</p>

                <p>These are the options:</p>
                <ol>
                    <li><code>loadingElement</code> Provide your own loading indicator. Default <code>&lt;div&gt;loading...&lt;/div&gt;</code></li>
                </ol>

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
                                    isCheckable={()=>(false)}
                                    isDeletable={()=>(false)}
                                    isExpandable={(node, depth)=>{ return (depth===0)? true : false; }}
                                    onExpandToggleCb={(node, depth)=>{

                                        if(node.isExpanded === true){
                                            // This will show the loading sign
                                            node.isChildrenLoading = true;

                                            setTimeout(()=>{
                                                const updatedData = cloneDeep(state.data);

                                                // Remove loading sign
                                                updatedData[0].isChildrenLoading = false;

                                                // Make sure node is expanded
                                                updatedData[0].isExpanded = true;

                                                // Set Children data that you potentially
                                                // got from an API response
                                                updatedData[0].children = [
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
