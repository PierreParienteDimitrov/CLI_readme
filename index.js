const fs = require('fs')
const inquirer = require('inquirer')
const util = require('util')

const html = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const markdown = ['#', '##', '###', '####', '#####', '######' ]

// const writeAsyncFile = util.promisify(fs.writeFile)
const appendAsyncFile = util.promisify(fs.appendFile)

// calling functions
start()


// function
function confirmMarkdown() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'confirm',
            message: 'Do you want to create an element?',
            choices: ['yes', 'no']
        },
    ])
}

function choseMarkdown() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'element',
            message: 'What element do you want to create',
            choices: html
        },
        {
            type: 'input',
            message: 'Write something',
            name: 'description'
        },
    ])
}

async function start() {
    try {
        const confirm = await confirmMarkdown()

        if(confirm.confirm === 'yes') {
            console.log("Create an element")
            init()
        } else if(confirm.confirm === 'no') {
            console.log("your project is done")
        }
    }

    catch(err) {
        console.log(err)
    }
}



async function init() {
    console.log('Welcome to the readme generator')
    try {
        const responses = await choseMarkdown()
        // console.log(responses)
        // console.log(responses.element)

        let markdown = responses.element

        if(markdown === 'h1') {
            markdown = '#'
        } else if(markdown === 'h2') {
            markdown = '##'
        } else if(markdown === 'h3') {
            markdown = '###'
        }


        const content = responses.description

        appendAsyncFile('readme.md', markdown + ' ' + content + "\n")
        console.log('succesfully written to readme') 
        
        start()
    }

    catch(err) {
        console.log(err)
    }
}



