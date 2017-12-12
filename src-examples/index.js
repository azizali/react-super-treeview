import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SuperTreeView from '../dist/main.js';
import { camelCase } from 'lodash';
import Basic from './Basic';
import ExpandCollapse from './ExpandCollapse';
import Checkbox from './Checkbox';
import Delete from './Delete';
import Async from './Async';
import CheckChildren from './CheckChildren';
import Everything from './Everything';

class Page extends Component {
    constructor (){
        super();
        this.router = this.router.bind(this);
        this.handleClick = this.handleClick.bind(this);

        let hash = document.location.hash;
        this.state = {
            hash: hash.substring(1, hash.legnth)
        }
    }

    handleClick(hash){
        this.setState({ hash }, () => {
            document.location.hash = hash;
        })
    }

    router(hash){
        switch (hash) {
            case 'everything':
                return <Everything />
            case 'basic':
                return <Basic />
                break;
            case 'expand-collapse':
                return <ExpandCollapse />
                break;
            case 'checkbox':
                return <Checkbox />
                break;
            case 'delete':
                return <Delete />
                break;
            case 'async-load':
                return <Async />
                break;
            case 'check-children':
                return <CheckChildren />
                break;
            default:
                return <Basic />
                break;
        }
    }

    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div
                            className="
                                col-xs-12
                                col-md-12
                                col-lg-offset-1 col-lg-10
                            ">
                            <div className="page-header text-center">
                                <h1>&lt;SuperTreeview /&gt; <small>Examples</small></h1>
                                <p className="lead">
                                    <u>Working examples</u> with source code of the numerous <br/>
                                    ways your can use the SuperTreeview component
                                </p>
                            </div>

                        </div>
                        <div className="
                                col-xs-12
                                col-md-3
                                col-lg-offset-1 col-lg-3">
                            <ul className="list-group">
                                <li className="list-group-item"><a onClick={()=>{ this.handleClick('basic') }}>Basic</a></li>
                                <li className="list-group-item"><a onClick={()=>{ this.handleClick('expand-collapse') }}>Expand/Collapse options</a></li>
                                <li className="list-group-item"><a onClick={()=>{ this.handleClick('checkbox') }}>Checkbox options</a></li>
                                <li className="list-group-item"><a onClick={()=>{ this.handleClick('delete') }}>Delete options</a></li>
                                <li className="list-group-item"><a onClick={()=>{ this.handleClick('async-load') }}>Asychronously load tree children</a></li>
                                <li className="list-group-item"><a onClick={()=>{ this.handleClick('check-children') }}>Check/Uncheck all children</a></li>
                            </ul>
                        </div>
                        <div className="
                                col-xs-12
                                col-md-9
                                col-lg-7">
                            {this.router(this.state.hash)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Page />, document.getElementById('page'));
