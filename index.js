const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

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
        choices: ['MIT', 'BSD', 'GPL'],
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
[Weather App Link](${answers.installation})

## Usage 
${answers.usage}

## License
${answers.license}

## Contributing
${answers.contribute}

## Tests
${answers.tests}

## Questions?
${answers.questions}`)


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
