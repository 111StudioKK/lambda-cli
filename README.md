# λ Lambda
A React Web boilerplate / scaffolding tool used at 111Studio


# Install / Use / Update
## Include in your existing git project
```bash
npm i -g lambda
```

##Example project scaffold
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

##Scaffold component
Creates the component's jsx / less / spec files
```bash
lambda component

--or--

lambda
then type component in the cli.
```

## Run dev server
```bash
lambda serve
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
#TODO

1. ~~Scaffold initial project.~~
2. ~~Scaffold Components.~~
3. ~~Serve the application for development.~~
4. Build the application for production.
5. Run the test suite.
6. Improve the cli interface (better help / more granular execution of commands with args).
7. Build the doc generator.
8. Build a component telemetry page.