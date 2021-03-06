React based file and media manager developed for [Quix Page Builder](https://www.themexpert.com/quix-pagebuilder) and open sourced by [ThemeXpert](https://www.themexpert.com) team.

## Dependency
We've written a PHP library to handle all server side things. You need to include this to your project using composer. More information https://github.com/themexpert/react-filemanager-server

## Usage

`yarn add @themexpert/react-filemanager`

`npm -i @themexpert/react-filemanager`

Webpack rules
```JS

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    // exclude: /node_modules/, //do not exclude or you'll run into errors, if you have a fix, contact us
                    loader: 'babel-loader',
                    query: {
                        "presets": ["react", "env", "stage-0"],
                        "plugins": ["transform-decorators-legacy"]
                    }
                }
            ]
        }
 ```

```JS
import initFM from 'react-filemanager'

const openFileManager = initFM('server_endpoint');
```

The returned callback `openFileManager` accepts a `callback` as a parameter to show the file manager modal

```html
<button onclick="openFileManager(fileSelectCallback)">Open File Manager</button> 
```
```JS
function fileSelectCallback(selected_list) {
    console.log(selected_list);
    //do whatever
    
    //path => the relative path to the root path set in `app/FM/config.php`
    //selected_list => selected files and folders
    
    //return true to close the modal
    //return string to show info/error after validation
    
    //let's say we want user to select only one file
    if(selected_list.length !== 1) {
        return 'Only one file has to be selected';
    }
    //let's say the user selected a folder which is not good for us
    if(selected_list[0].is_dir) {
        return 'Only file can be selected';
    }
    
    //we got one file selected her
    // //do whatever
    
    return true; //close the modal
}
```


It's a good idea to make a wrapper to instantiate the file manager and the using it elsewhere

File: `wrapper.js`

Content: 
```JS
import initFM from 'react-filemanager-client'

export default initFM('server-endpoint');
```

Use the wrapper in any React component

```JS
import React, {Component} from 'react'
import openFileManager from './wrapper' //wherever it is

export default class FilePicker extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            filename: null
        };
    }
    
    onFileSelect = (files) => {
        //we want the user to select at least one file
        if(!files.length)
            return 'Please select a file';
        
        //we want the user to select less or equal to one file
        if(files.length > 1) {
            return 'Only one file can be selected';
        }
        
        //which implies user selected one file by this line of code
        
        //relative path to the root of file manager set in the server side config
        console.log(files);
        
        return true; //closes the file manager modal
    };
    
    render = () => {
        return (
            <button onClick={openFileManager(this.onFileSelect)}>Pick File</button>
        );
    };
}
```
