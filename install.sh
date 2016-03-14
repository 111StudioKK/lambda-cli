#!/bin/bash
# Install script for Reactor Web
command -v git >/dev/null 2>&1 || { echo >&2 "git is required to run the install script. Aborting."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo >&2 "npm is required to run the install script. Aborting."; exit 1; }

#Create the git submodule
git submodule add git@github.com:111StudioKK/reactor-web.git .reactor-web

#Create the projects directory structure
mkdir -p src/components
mkdir -p src/containers
mkdir -p src/images
mkdir -p src/fonts
mkdir -p src/styles

#Copy the file templates
cp ./.reactor-web/templates/app.js ./src/
cp ./.reactor-web/templates/index.tpl.html ./src/

#Install npm dependencies
cd .reactor-web
npm i