# λ Lambda
A React Web boilerplate / scaffolding tool used at 111Studio

## Install

This will include the lambda command in your PATH.

```bash
npm i -g lambda-cli
```

##Available commands

### lambda component

Scaffolds a React Component: Creates the component's jsx / less / spec files.

```bash
lambda component

--or--

lambda
then type component in the cli.
```

### lambda serve

Runs a webpack dev server including the following features:

1. Hot module reloading
2. Flow type annotations.
3. ES6 / ES7 transpilation.
4. Less compilation.
5. Image file imports.
6. Font imports.
7. TODO : Crash on Flow type errors.
8. TODO : Auto import npm packages if not found in the project.
9. TODO : Global file import resolves.

```bash
lambda serve
```

##Project structure / guidelines

### Project directory tree

```
src
├── fonts
├── images
├── js
│   ├── app
│   │   ├── App
│   │   │   ├── App.jsx
│   │   │   ├── App.less
│   │   │   └── App.spec.js
│   │   ├── Footer
│   │   │   ├── Footer.jsx
│   │   │   ├── Footer.less
│   │   │   └── Footer.spec.js
│   │   ├── Header
│   │   │   ├── Header.jsx
│   │   │   ├── Header.less
│   │   │   └── Header.spec.js
│   │   └── SideBar
│   │       ├── SideBar.jsx
│   │       ├── SideBar.less
│   │       └── SideBar.spec.js
│   ├── article
│   │   ├── Article
│   │   │   ├── Article.jsx
│   │   │   ├── Article.less
│   │   │   └── Article.spec.js
│   │   └── ArticleList
│   │       ├── ArticleList.jsx
│   │       ├── ArticleList.less
│   │       └── ArticleList.spec.js
│   ├── comment
│   │   ├── Comment
│   │   │   ├── Comment.jsx
│   │   │   ├── Comment.less
│   │   │   └── Comment.spec.js
│   │   └── CommentList
│   │       ├── CommentList.jsx
│   │       ├── CommentList.less
│   │       └── CommentList.spec.js
│   ├── index.js
│   ├── redux
│   │   ├── action.js
│   │   ├── article.js
│   │   ├── comment.js
│   │   └── store.js
│   ├── routes
│   │   └── Routes.jsx
│   └── views
│       ├── ArticleListView
│       │   ├── ArticleListView.jsx
│       │   ├── ArticleListView.less
│       │   └── ArticleListView.spec.js
│       └── ArticleView
│           ├── ArticleView.jsx
│           ├── ArticleView.less
│           └── ArticleView.spec.js
└── styles
    ├── config.less
    ├── layout.less
    ├── typography.less
    └── variables.less
```

### Less guidelines
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

### Redux guidelines

All redux actions and reducers are in the .src/js/redux folder.
One file per redux entity should be created.
The file should include both reducers end action, and export them as ```reducers``` and ```actions```.

```
#Redux Config file example
const INIT_CONFIG = 'INIT_CONFIG';

export const actions = {
  initConfig: (config) => {
    return { type: INIT_CONFIG, config };
  }
}

export const reducers = {
  config: (state = {}, action) => {
    switch (action.type) {
    case INIT_CONFIG:
      return action.config;
    default:
      return state;
    }
  }
}
```

The reducers should be referenced in the ```./redux/store.js``` file.
```
```
The actions should be referenced in the ```./redux/avtions.js``` file.
```
```

##TODO

1. ~~Scaffold initial project.~~
2. ~~Scaffold Components.~~
3. ~~Serve the application for development.~~
4. ~~Bootstrap the inital redux setup.~~
5. ~~Build the application for production.~~
6. Run the test suite.
7. Improve the cli interface (better help / more granular execution of commands with args).
8. Build the doc generator.
9. Build a component telemetry page.

```
░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░███░░░░░░░░░░░░░░
░░░░░░░░░░██░░░░░░░░░░░░░
░░░░░░░░░░░██░░░░░░░░░░░░
░░░░░░░░░░████░░░░░░░░░░░
░░░░░░░░░██░░██░░░░░░░░░░
░░░░░░░░██░░░░██░░░░░░░░░
░░░░░░░██░░░░░░██░░░░░░░░
░░░░░░██░░░░░░░░███░0.5.0
░░░░░░░░░░░░░░░░░░░░░░░░░
```
