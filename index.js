const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile)

const promptUser = () => {
  return inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'Title:',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Brief description of project:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Installation/Link:',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Usage:',
    },
    {
        type: 'checkbox',
        message: 'What license?',
        name: 'license',
        choices: ['MIT', 'AGPL', 'GPLv3'],
    },
    {
        type: 'input',
        name: 'contribute',
        message: 'Contributing:',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Tests:',
    },
    {
        type: 'input',
        name: 'username',
        message: 'GitHub UserName:', 
    },
    {
        type: 'input',
        name: 'email',
        message: 'Email:',
    },
  ]);
};

const generateReadme = (answers) =>
(`# ${answers.title} 

${generateLicense(answers)}

## Table of Contents
- [Description](#description)
- [Installation](#instalation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Description
${answers.description}

## Installation
Link to website:
[Web App Link](${answers.installation})

## Usage 
${answers.usage}

## License
${generateLicense(answers)}

## Contributing
${answers.contribute}

## Tests
${answers.tests}

## Questions?
${answers.username} https://github.com/Msas12
${answers.email}

`)


function generateLicense(answers) {
    
    if (answers.license == 'MIT') {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
    }else if (answers.license == 'AGPL') {
        return "[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)"
    } else {
        return "[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)"
    }
}



// Uses Async to initiate prompts and then create a readme based on answers
const init = async () => {
  console.log('Hi! Ready to create a README?');
  try {
    const answers = await promptUser();

    const readme = generateReadme(answers);

    await writeFileAsync('README.md', readme);

    console.log('Successfully wrote to README.md');
  } catch (err) {
    console.log(err);
  }
};

init();
