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
        name: 'toc',
        message: 'Table of Contents:',
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
        message: 'contributing:',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Tests:',
    },
    {
        type: 'input',
        name: 'questions',
        message: 'Questions:',
    },
  ]);
};

const generateReadme = (answers) =>
(`# ${answers.title}

## Description
${answers.description}

## Table of Contents (Optional)
${answers.toc}

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
${answers.questions}`)


async function generateLicense(answers) {

    if (answers.license == 'MIT') {
        let license = await readFileAsync('./LicenseFolder/MIT.txt', 'utf8')
        await writeFileAsync('LICENSE.txt', license)
        return '[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)'
    }else if (answers.license == 'AGPL') {
        let license = await readFileAsync('./LicenseFolder/AGPL.txt', 'utf8')
        await writeFileAsync('LICENSE.txt', license)
        return '[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)'
    } else {
        let license = await readFileAsync('./LicenseFolder/GPL.txt', 'utf8')
        await writeFileAsync('LICENSE.txt', license)
        return '[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)'
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
