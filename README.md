# reactor-web
A React Web boilerplate / scaffolding tool used at 111Studio


# Install / Use / Update
## Include in your existing git project
```bash
curl 'master bash script location' | bash
```

##Generated files
```
.
├──src
|  ├──app.js
|  ├──index.tpl.html
|  ├──components
|  ├──containers
|  ├──images
|  ├──fonts
|  ├──styles
|     ├──config.less
|     ├──reset.less
|     ├──typography.less
|     ├──variables.less
```

##Create component
Creates the component's js file (ES6 declaration) + the less file (with the config import)
```bash
./create component MyComponent
# Results in
├──src
|  ├──components
|     ├──MyComponent.js(X)
...
|  ├──styles
|     ├──MyComponent.less
```

##Create container
Creates the component's js file (ES6 declaration) + the less file (with the config import). During creation you may choose which components to require.
```bash
./create container MyContainer
# Results in

├──src
|  ├──components
|     ├──MyContainer.js(X)
...
|  ├──styles
|     ├──MyContainer.less
```
## Run dev server
```bash
./dev
```

## Build app
```bash
./build
```
The built app can be found in the dist directory. 

## Update the boilerplate
```
git submodule foreach git pull origin master
```

#Workflow

##Less
Styling components should follow these directives :

1. All components should have their own less file.

2. The wrapping dom element of each component should have a className equal to the component's name in kebab-case (All lowercase with - separating words.) ex: MyComponent => my-component

3. The less styles definitions for the component should be wrapped inside the component's className :
```less
.my-component {
  .some-class {
    foo: "bar"
  }
}
```
