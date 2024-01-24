const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const credentialsFile = 'cypress.env.json';

function promptForCredentials() {
    rl.question('Enter your RealWorld Example App username: ', (username) => {
        rl.question('Enter your RealWorld Example App password: ', (password) => {
            const credentials = { username, password };
            fs.writeFileSync('cypress.env.json', JSON.stringify(credentials));
            console.log('Credentials saved successfully!');
            rl.close();
        });
    });
}

function confirmOverwrite() {
    rl.question('A file with credentials already exists. Do you want to overwrite it? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            promptForCredentials();
        } else {
            console.log('Keeping existing credentials.');
            rl.close();
        }
    });
}

function checkFileAndPrompt() {
    if (fs.existsSync(credentialsFile)) {
        confirmOverwrite();
    } else {
        console.log('Looked for cypress.env.json, but no exisitng credentials found.')
        promptForCredentials();
    }
}

checkFileAndPrompt();
