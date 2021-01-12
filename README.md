# web-bundler-from-zero

### Do you want to know how a web-bundlers like webpack, rollup, parcel works under the hood?, check out this repo!


## How this works?
We have all of our source code inside the lib folder, this folder exposes 3 key functions to create our bundle:


this function will allow us to specify an entry point in order for our bundle to generate the graph with the AST
```javascript
 generateDependencyGraph(entryPoint: string): Array<dependencies>
```



this function will be in charge to transform our ES6 modules to common-js modules updating the AST
```javascript
 transform(dependencyGraph: Array<dependencies>): string
```



this function will take our output folder and create the bundled code inside
```javascript
 emitBundle(output: string, bundleCode: string): void
```


Then, in the ```bundler.config.js``` file, we will specify our entrypoint and output folder(the ```generateDependencyGraph``` function, will map the 'src' folder as base folder by default), as we can see in the example, we have our example code in the src folder.


To compile our code and create the bundle, simply run ```npm run compile```.


If we execute the file inside our 'dist' folder, we can see our code working just fine:
![code-img](https://i.ibb.co/DY4zsvh/Screenshot-from-2021-01-12-07-27-45.png)



### External tools
for the AST([abstract-syntax-tree](https://www.npmjs.com/package/abstract-syntax-tree)) we are using an external library to deal with that due to the fact that this is extremely complicated to create from zero.



### what are we missing here?
* Code spliting
* A complete plugin ecosystem(as you can see in the example, we made a little 'plugin' to transform our ES6 modules to common-js modules)
* Handle assets(styles, images, etc.)
* Dev server
* Source maps and much more!


this example is for demonstrative purposes only.

