# Main

This repository will be used to simply not have to waste time on setting up a new Express project.
It has the essentials packages (at least essential for me) with a few folder setups that I usually like to have.

# How to use it

Well, forking is the best option, fork it and change the name and such things.
You can also use it as a template.

1. Fork
2. Change project name, readme file...
3. Use `npm run install-modules` in the terminal to install the packages for server and client
4. Upload your own GIT repoistory on whatever platform you want

# Run the project

First things first, go to the project and !!ADD!! a config.env file in the config folder. This will also need to be filled with necessary data. The reason behind this is that config file is different for machines. For the current situation, check the configSample.env file.

Two scripts are already added to run in the terminal:

- `npm run dev` which runs the botht the client and the server
- `npm run dev-client` which runs the ReactJS part only
- `npm run dev-server` which runs the ExpressJS part only

# Branch
This branch is simply using Express as intended alongside React as intended...
If you need a template the works with  a template engine (express-handlebars), there's a branch for that in this project.
If you need to only use it as an API, there's a branch for that too!

# Future additions

It's a starter project so probably won't add anything to be honest.