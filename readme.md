React Super Treeview
===

:clap: Finally, a React Treeview component which is customizable on every level.
- Add checkboxes
- Custom delete button
- and even lazy-load data asynchronously

Have a unique data model? No worries, SuperTreeview can adapt to the way you have your data structured. 

## :star2: [SEE DEMO](https://azizali.github.io/react-super-treeview/examples/)

## Full Features
- Expand/Collapse
- Checkbox
- Delete button
- Provide custom delete button
- Asynchronously load data
- Provide custom loading indicator
- Delete animation
- Unlimited nesting
- Granular control over when to show expand, checkbox or delete options
- Multi-select/unselect checkbox (shift + Check) like Gmail
- Control the node adding/delete animation speed

## How to install
`npm install react-super-treeview --save`

## Basic Usage

Start using the component in just 2 steps.

### Step 1: Import and use component in React:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import SuperTreeview from 'react-super-treeview';

class Example extends React.Component {
    constructor(){
        super();
        // SET YOUR DATA
        this.state.data = [
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
                        id: 1,
                        name: 'Child 1'
                    },
                    {
                        id: 2,
                        name: 'Child 2'
                    },
                    {
                        id: 3,
                        name: 'Child 3'
                    }
                ]
            }
        ];
    }

    render(){
        return (
            // RENDER THE COMPONENT
            <SuperTreeview
                data={ this.state.data }
                onUpdateCb={(updatedData) => {
                    this.setState({data: updatedData})
                }}
            />
        );
    }
}

ReactDOM.render(<Example/>, document.getElementById('app'););
```

### Step 2: Import styles to project

Import SuperTreeview styles with `css` or `scss` file.

The styles are in `node_modules/react-super-treeview/dist/style.css or style.scss`

Note: When you use the `scss` file, you can modify the style variables for quick styling.

#### Using webpack

If you are using webpack, put this in your project's styles.

```
~react-super-treeview/dist/style.css 
```
or `scss` 
```
~react-super-treeview/dist/style.scss
```

the tilda `~` tells webpack to pick-up the file from `node_modules` folder

#### Manually importing styles

You can also manually copy the `css`/`scss` file from `node_modules/react-super-treeview/dist/style.(s)css` and put it in your project files

## Mulit-select feature built in

`shift + click`

![alt text](./multi-select.gif "Logo Title Text 1")

## Run Examples locally

[See all the examples in action](https://azizali.github.io/react-super-treeview/examples/)

or run them locally by doing this:
1. Clone this repo
2. Run `npm install` and then `npm run examples`
3. Open `./examples/index.html` in browser to see the interactive demo

## All Props

### `PropType.array.isRequired`* data
**Default:** none

Data that will be displayed in the tree. Here is the format to use:
```javascript
[
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
                id: 1,
                name: 'Child 1'
            },
            {
                id: 2,
                name: 'Child 2'
            },
            {
                id: 3,
                name: 'Child 3'
            }
        ]
    }
]
```

### `PropType.function.isRequired`* onUpdateCb
**Default:** none

Function callback when data gets changed (deleted, expanded/collapsed, checked/unchecked).

The callback provides the modified data (`updatedData`), and the `depth`.

The `depth` property on this callback is mainly for internal tracking. It may have no use to you.



### `PropType.Number` depth
**Default:** 0

Value that tracks the depth of the node tree. The root/highest depth is 0. Children nodes are depth+1 upto infinity.


### `PropType.function` getStyleClassCb
**Default:** `(node, depth) => { return ' '; }`  

Return the class name string you want to add on the node.

This function runs on every node while rendering. This allows you to add custom class(es) on any given node(s).

#### Add class to all nodes
```js
<SuperTreeview 
    data={data}
    getStyleClassCb={ ()=>{ return 'class-name-to-add'; } }
/>
```

#### Add class to all childrens which are two level deep
```js
<SuperTreeview 
    data={data}
    getStyleClassCb={ (node, depth)=>{ 
        return (depth === 1)? 'class-name-to-add' : '';
    } }
/>
```


### `PropType.function` isCheckable
**Default:** `(node, depth) => { return true; }` 

Return `true/false` to show/hide checkbox on node.

This function runs on every node while rendering. This allows you to show/hide checkbox on any given node(s).


### `PropType.function` isDeletable
**Default:** `(node, depth) => { return true; }` 

Return `true/false` to show/hide delete button on node.

This function runs on every node while rendering. This allows you to show/hide delete button on any given node(s).


### `PropType.function` isExpandable
**Default:** `(node, depth) => { return true; }` 

Return `true/false` to show/hide expand/collapse button (►) on node.

This function runs on every node while rendering. This allows you to show/hide expand/collapse buttoon on any given node(s).


### `PropType.string` keywordChildren
**Default:** `'children'`

Set the `key` where the component should look for the children elements.

Example: if you have all the children data in the key `group`
```javascript
[
    {
        id: 'a',
        name: 'Name of node',
        group: [
            {
                id: 1,
                name: 'Child node'
            }
        ]
    }
]
```

set it like such
```js
<SuperTreeview 
    data={data}
    keywordChildren='group' // << Like such
/>
```



### `PropType.string` keywordChildrenLoading
**Default:** `'isChildrenLoading'`

Set the `key` that indicates if the children nodes are loading or now.
If `true` then the `loadingElement` is shown.

Example:
```javascript
[
    {
        id: 'a',
        name: 'Name of node',
        isExpanded: true,
        isChildrenLoading: true
    }
]
```

If you want a key other than `isChildrenLoading` key to identify the loading state, you can modify it like such:
```js
<SuperTreeview 
    data={data}
    keywordChildrenLoading='yourCustomKeyForLoading' // << Like such
/>
```

NOTE: Make sure that the node is expanded (`isExpanded: true`) for the `loadingElement`.



### `PropType.string` keywordKey
**Default:** `'id'`

This is the value that is set as the `key` attribute on the node (`<div key={keywordKey}> node name </div>`).
It defaults to the `id` key.

This must be a unique key, if not provided or is not unique, will break the animation feature.


### `PropType.string` keywordLabel
**Default:** `'name'`

The node text is printed from the `name` key. If you want some other key value to be printed, provide the key here.

Example:
```javascript
[
    {
        id: 'a',
        text: 'Name of node', // << Notice this key is `text`
    }
]
```

If you want a key other than `name` key, modify it like such:
```js
<SuperTreeview 
    data={data}
    keywordLabel='text' // << Like such
/>
```

### `PropType.element` loadingElement
**Default:** `<div>loading...</div>`

Element that shows when data is being loading.

Provide your custom loading element with this prop.



### `PropType.string` noChildrenAvailableMessage
**Default:** `'no data found'`

Message that shows when the expanded node has no children.



### `PropType.function` onCheckToggleCb
**Default:** `(arrayOfNodes, depth) => {}`

Function callback when checkbox gets toggled.

The callback provides an array of nodes (`arrayOfNodes`) that got checked/unchecked.
Since `<SuperTreeview />`  has a multi-select feature, hence its an array here.
All nodes will have the same `isChecked` state, either `true` or `false`.

The callback also provides the `depth` of the node that got checked/unchecked.



### `PropType.function` onDeleteCb
**Default:** `(node, updatedData, depth) => { return true; }`  

Function callback when node delete button gets clicked.

The callback provides the `node` being deleted, its `depth`, and the updated data (`updatedData`) with the deleted node removed.

Return `true` if you want to proceed with the deletion, and `false` if you do not want to delete the node.

Returning `true` will trigger the `onUpdateCb()` prop, discussed below.



### `PropType.function` onExpandToggleCb
**Default:** `(node, depth) => {}`

Function callback when node Expands/Collapses.

The callback function provides the `node` that got toggled, and its `depth`.



### `PropType.number` transitionEnterTimeout
**Default:** `1200`

Time in milliseconds for node appear animation.

### `PropType.number` transitionExitTimeout
**Default:** `1200`

Time in milliseconds for node remove animation.


## Test
```
npm test
```

## Shoutout
Shoutout to [Andrew Onyshchuk](https://github.com/oandrew) for suggesting a clean API exposing strategy.

Thank you [TJ Hubert](https://github.com/tjhubert) and [Prashanth Naika](https://github.com/prashanth0926) for your contribution to the animation feature and the bug fixes.


### TODO:

- [ ] Bug: `keywordKey` prop is not being applied
- [ ] Feature: Make user friendly prop names for `keywordKey`, `keywordChildren` etc
- [ ] Performance: Remove the need for lodash
- [ ] Feature: Stretch goal: Add ability to add custom decorator/element per node
- [ ] Feature: Add css class on nodes based on its state i.e `<div class="expanded">Text</div>`
- [X] Feature: Provide .scss file with configurable variables
- [ ] Workflow: Provide auto-launch browser feature when examples are run with `npm run examples` 

### License

SuperTreeview is [MIT licensed](./LICENSE).
