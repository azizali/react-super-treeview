Expandable Tree Component
===
React Component that is highly customizable, which creates unlimited deep nested expandable/collapsable tree nodes.

### How to install
`npm install expandable-tree`


### Usage

Start using the component in just two steps.

#### Step 1: Import and use component in JS file

```
import ExpandableTree from 'expandable-tree';

let data = [
    {
        id: 1,
        name: 'PARENT 1'
    },
    {
        id: 2,
        name: 'PARENT 2',
        isExpanded: true,
        isChecked: true,
        children: [
            {
                id: 21,
                name: 'child 2.1'
            },
            {
                id: 22,
                name: 'child 2.2'
            },
            }
            {
                id: 23,
                name: 'child 2.3'
        ]
    }
]

<ExpandableTree data={data} />

```

#### Step 2: Import styles to project

The styles of the component are in the file `node_modules/expandable-tree/dist/style.css`

##### Using webpack

If you are using webpack, put this in your project's styles.
the tilda `~` tells webpack to pick-up the file from `node_modules` folder

```
~expandable-tree/dist/style.css
```

##### Manually importing styles

You can also manually copy the css file from `node_modules/expandable-tree/dist/style.css` and put it in your project files



### All Prop Options
Prop                       | Type      | Default Value                       | Description
---------------------------|-----------|-------------------------------------|---------------- 
data                       | Array     | required field, no default          | Data that will displayed in the tree
depth                      | Number    | `0`                                 | Data that will displayed in the tree
getStyleClassCb            | function  | `(node, depth) => { return ' '; }`  | Return class for the given node
isCheckable                | function  | `(node, depth) => { return true; }` | Returning true will show checkbox on node
isDeletable                | function  | `(node, depth) => { return true; }` | Return true will show delete button on node
isExpandable               | function  | `(node, depth) => { return true; }` | Return true will add expand/collapse icon on the node
keywordChildren            | string    | `'children'`                        | The node key that will contain the children array
keywordChildrenLoading     | string    | `'isChildrenLoading'`               | The key that will identify if the children is loading
keywordKey                 | string    | `'id'`                              | Unique identifier to track the node
keywordLabel               | string    | `'name'`                            | key for the node label
loadingElement             | element   | `null`                              | Element that shows when data is loading
noChildrenAvailableMessage | string    | `'No data found'`                   | Message that shows when the expanded node has no children
onCheckToggleCb            | function  | `(arrayOfNodes, depth) => {}`       | Function callback when checkbox gets toggled
onDeleteCb                 | function  | `(node, updatedData, depth) => {}`  | Function callback when node delete button gets clicked
onExpandToggleCb           | function  | `(node, depth) => {}`               | Function callback when node Expand/Collapse gets toggled
onUpdateCb                 | function  | `(updatedData, depth) => {}`        | Function callback when data gets updated
transitionEnterTimeout     | number    | `1200`                              | Time in milliseconds for node appear animation
transitionExitTimeout      | number    | `1200`                              | Time in milliseconds for node remove animation
