# 2MuchWaste - Backend

First run: 
- `npm install`
- create a mongodb connection with the name `2muchwaste`

## Scripts
- `npm run build`: compile *.ts in *.js in dist folder
- `npm run start`: start the node server
- `npm run dev`: compile *.ts in *.js, start the node saver in dev mode with nodemon (reload on changes)
- `npm run format`: format the code with eslint and prettier

It is suggested to use `npm run dev` to test and develop.


## Use Prettier Plugin

### Jetbrains WebStorm or IntelliJ

Install Prettier plugin and enable `On 'Reformat Code' action` and `On save` options under `Settings > Languages & Frameworks > JavaScript > Prettier`.  

### Visual Studio Code

Install Prettier plugin, open the command palette `Ctrl + Shift + P` search for `Preferences: Open Settings (JSON)` and change the default editor formatter and add another config:

`{`  
`"editor.defaultFormatter": "esbenp.prettier-vscode",`    
`"editor.formatOnSave": true,`  
`...`  
`}`
