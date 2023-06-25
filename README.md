# Main

This repository will be used to simply not have to waste time on setting up a new Express project.
It has the essentials packages (at least essential for me) with a few folder setups that I usually like to have.

# How to use it

Well, forking is the best option, fork it and change the name and such things.
You can also use it as a template

1. Fork
2. Change project name, readme file...
3. Use `npm i` in the terminal to install the pockages
4. Upload your own GIT repoistory on whatever platform you want

# Run the project

First things first, go to the project and add a config.env file in the config folder. This will also need to be filled with necessary data. The reason behind this is that config file is different for machines. For the current situation, all you need is to add a port like 3000 or 7777 or whatver.

Two scripts are already added to run in the terminal:

- `npm run start` which runs the project using `node index`
- `npm run dev` which runs the project using `nodemon index`

# Branch
This branch uses express as an API that serves HTML and such via a template engine (express-handlebars).

# Future additions

It's a starter project so probably won't add anything to be honest.
