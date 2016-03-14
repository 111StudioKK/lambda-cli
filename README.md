# reactor-web
A React Web boilerplate used at 111Studio

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
|     ├──config.lesss
|     ├──reset.less
|     ├──typography.less
|     ├──variables.less
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
