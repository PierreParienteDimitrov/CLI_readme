const fs = require('fs')
const inquirer = require('inquirer')
const util = require('util')

const markdowns = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'italic', 'strong', 'striketrough', 'blockquote', 'link', 'ul', 'ol', 'code block']

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
            choices: markdowns
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

        if (confirm.confirm === 'yes') {
            console.log("Create an element")
            init()
        } else if (confirm.confirm === 'no') {
            console.log("your project is done")
        }
    }

    catch (err) {
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
        let content = responses.description

        switch (markdown) {
            case 'h1':
                markdown = '#'
                writeHeaders(markdown, content)
                break;
            case 'h2':
                markdown = '##'
                writeHeaders(markdown, content)
                break;
            case 'h3':
                markdown = '###'
                writeHeaders(markdown, content)
                break;
            case 'h4':
                markdown = '####'
                writeHeaders(markdown, content)
                break;
            case 'h5':
                markdown = '#####'
                writeHeaders(markdown, content)
                break;
            case 'h6':
                markdown = '######'
                writeHeaders(markdown, content)
                break;
            case 'italic':
                markdown = '_'
                writeItalic(markdown, content)
                break;
            case 'strong':
                markdown = '__'
                writeStrong(markdown, content)
                break;
            case 'blockquote':
                markdown = '__'
                writeBlockquote(markdown, content)
                break;
            case 'link':
                writeLink(content)
                break;
        }
    }

    catch (err) {
        console.log(err)
    }
}


async function writeHeaders(markdown, content) {
    console.log('Write a header')
    try {
        appendAsyncFile('readme.md', markdown + ' ' + content + "\n")
        console.log('succesfully written to readme')

        start()
    }

    catch (err) {
        console.log(err)
    }
}

async function writeItalic(markdown, content) {
    console.log('Write italic paragraph')
    try {
        appendAsyncFile('readme.md', markdown + content + markdown + "\n")
        console.log('succesfully written to readme')

        start()
    }

    catch (err) {
        console.log(err)
    }
}

async function writeStrong(markdown, content) {
    console.log('Write strong paragraph')
    try {
        appendAsyncFile('readme.md', markdown + content + markdown + "\n")
        console.log('succesfully written to readme')

        start()
    }

    catch (err) {
        console.log(err)
    }
}

async function writeBlockquote(markdown, content) {
    console.log('Write strong paragraph')
    try {
        appendAsyncFile('readme.md', markdown + content + "\n")
        console.log('succesfully written to readme')

        start()
    }

    catch (err) {
        console.log(err)
    }
}

async function writeLink(content) {
    console.log('Write strong paragraph')
    try {
        const linkInfo = await inquirer.prompt([
            {
                message: 'chose a placholder for your link',
                name: 'placeholder',
            },
            {
                message: 'enter the link',
                name: 'link',
            },

        ])

        console.log(linkInfo)

        // appendAsyncFile('readme.md', '[' + content + ']' + '(' + content + ')' + "\n")
        // console.log('succesfully written to readme')

        // start()
    }

    catch (err) {
        console.log(err)
    }
}


