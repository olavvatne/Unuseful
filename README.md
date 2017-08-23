# Unuseful

## Run locally
* Clone repository
* `Gulp watch`

## New tool
* Create a folder under `app/tools`
* Inside folder, create `data.json` file. Data can be used by *Nunjucks* template, and usually contains:

```json
{
  "pageTitle": "Tool Page Title",
  "toolTitle": "Tool title",
  "toolDescription": "Text about tool",
  "toolMetaDescription": "Metadata about tool",
  "toolPath": "<folder-name>",
  "toolContainerClass": "container-class",
  "toolImage": "<image>.svg"
}
```

* Create a `entry.js` file, that imports React, custom component and mount it. Typically something like this:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import CustomTool from './customTool';

ReactDOM.render(<CustomTool />, document.getElementById('tool-root-mount') );
```
* Then, create the custom JavaScript file for your custom component, `customTool.js` In that file add a React component called CustomTool.
* Next, add a `index.html` to the folder. Should contain, which basically extends a finished *Nunjucks* template:
```
{% extends "tool.nunjucks" %}
```
* Optionally, you can add a `style.scss` sass stylesheet to this folder.
