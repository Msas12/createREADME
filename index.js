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
- [Mock Up](#mock-up)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Mock-Up

The following animation demonstrates the application functionality:

![GIF Of Functionality](./INSERT GIF HERE)

## Description
${answers.description}

## Installation
For link to Web App click [here](${answers.installation})

## Usage 
${answers.usage}

## License
${generateLicense(answers)}
- [License File](./LICENSE.txt)

## Contributing
${answers.contribute}

## Tests
${answers.tests}

## Questions?
- ${answers.username}: https://github.com/Msas12
- ${answers.email}

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

    if (answers.license == 'MIT') {
        let license = await readFileAsync('./LicenseFolder/MIT.txt', 'utf8')
        await writeFileAsync('LICENSE.txt', license)
    }else if (answers.license == 'AGPL') {
        let license = await readFileAsync('./LicenseFolder/AGPL.txt', 'utf8')
        await writeFileAsync('LICENSE.txt', license)
    } else {
        let license = await readFileAsync('./LicenseFolder/GPL.txt', 'utf8')
        await writeFileAsync('LICENSE.txt', license)
    }

    console.log('Successfully wrote to README.md');
  } catch (err) {
    console.log(err);
  }
};

init();
