Expandable Tree Component
===
React Component that is highly customizable, which creates unlimited deep nested expandable/collapsable tree nodes.

### Features
- Expand/Collapse
- Checkbox
- Delete button
- Provide custom delete button
- Asynchronously load data
- Provide custom loading indicator
- Delete animation
- Unlimited nesting
- Granular control over when to show expand, checkbox or delete options
- Multi-(un)select checkbox (shift + Check) like Gmail

### :star2: [LIVE DEMO](https://ilovecodingorg.github.io/expandable-tree/examples/)

### How to install
`npm install expandable-tree --save`


### Basic Usage

Start using the component in just two steps.

#### Step 1: Import and use component in JS file

```
import ExpandableTree from 'expandable-tree';


// CODE IN REACT COMPONENT

constructor() { 
    super();
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
    ]
}


// CODE IN RENDER FUNCTION

<ExpandableTree
    data={ data }
    onUpdateCb={(updatedData) => {
        this.setState({data: updatedData})
    }}
/>

```

#### Step 2: Import styles to project

Import Expandable Tree styles with `css` or `scss` file.

The styles of the component are in the file `node_modules/expandable-tree/dist/style.css or style.scss`

Note: When you use the `scss` file, you can modify the style variables for quick styling.

##### Using webpack

If you are using webpack, put this in your project's styles.

```
~expandable-tree/dist/style.css 
```
or `scss` if your project has the ability to process it
```
~expandable-tree/dist/style.scss
```

the tilda `~` tells webpack to pick-up the file from `node_modules` folder

##### Manually importing styles

You can also manually copy the `css/scss` file from `node_modules/expandable-tree/dist/style.(s)css` and put it in your project files

### Examples

[See all the examples in action](https://ilovecodingorg.github.io/expandable-tree/examples/)

or run them locally by doing this:
1. Clone this repo
2. Run `npm install` and then `npm run examples`


3. Open `./examples/index.html` in browser to see the interactive demo

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
onDeleteCb                 | function  | `(node, updatedData, depth) => { return true; }`  | Function callback when node delete button gets clicked
onExpandToggleCb           | function  | `(node, depth) => {}`               | Function callback when node Expand/Collapse gets toggled
onUpdateCb                 | function  | `(updatedData, depth) => {}`        | Function callback when data gets updated
transitionEnterTimeout     | number    | `1200`                              | Time in milliseconds for node appear animation
transitionExitTimeout      | number    | `1200`                              | Time in milliseconds for node remove animation


### Test
```
npm test
```

### Shoutout
Shoutout to [Andrew Onyshchuk](https://github.com/oandrew) for suggesting a clean API exposing strategy.

Thank you [TJ Hubert](https://github.com/tjhubert) and [Prashanth Naika](https://github.com/prashanth0926) for your contribution to the animation feature and the bug fixes.


### TODO:

- [ ] Feature: Add click event for text
- [ ] Feature: Add css class on nodes based on its state i.e `<div class="expanded">Text</div>`
- [ ] Feature: Stretch goal: Add ability to add custom decorator/element per node
- [X] Feature: Provide .scss file with configurable variables
- [ ] Workflow: Provide auto-launch browser feature when examples are run with `npm run examples` 
- [ ] Performance: Remove the need for lodash

### License

Expandable Tree is [MIT licensed](./LICENSE).
