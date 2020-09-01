const fs = require('fs')
const inquirer = require('inquirer')
const util = require('util')

const allMarkdowns = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'italic', 'strong', 'striketrough', 'blockquote', 'link', 'table of content', 'ul', 'images', 'code block', 'tasks list']
const leftMdArr = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'ul', 'code block', 'tasks list']
const leftRightMdArr = ['italic', 'strong', 'striketrough']
const linksArr = ['link', 'table of content']
const imgArr = ['images']

const appendAsyncFile = util.promisify(fs.appendFile)

// Starts the application
start()

// convert user choice into markdown
function convertToMarkdown(markdown) {
    switch (markdown) {
        case 'p':
            markdown = ''
            break;
        case 'h1':
            markdown = '#'
            break;
        case 'h2':
            markdown = '##'
            break;
        case 'h3':
            markdown = '###'
            break;
        case 'h4':
            markdown = '####'
            break;
        case 'h5':
            markdown = '#####'
            break;
        case 'h6':
            markdown = '######'
            break;
        case 'italic':
            markdown = '_'
            break;
        case 'strong':
            markdown = '__'
            break;
        case 'striketrough':
            markdown = '~~'
            break;
        case 'blockquote':
            markdown = '>'
            break;
        case 'ul':
            markdown = '*'
            break;
        case 'tasks list':
            markdown = '* [x]'
            break;
        case 'blockquote':
            markdown = '__'
            break;
        case 'link':
            break;
    }

    return markdown
}

// User choses or not to create an element
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


// User choses markdown to use
function choseMarkdown() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'element',
            message: 'What element do you want to create',
            choices: allMarkdowns
        },
    ])
}


// User writes its content if called
function userInput() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Write your content',
            name: 'content'
        },
    ])
}

// User writes its link content if called
function userInputLink() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Write placeholder',
            name: 'placeholder'
        },
        {
            type: 'input',
            message: 'Enter url or anchor',
            name: 'url'
        },
    ])
}

// Starts the game if user choses Yes
async function start() {
    try {
        const confirm = await confirmMarkdown()

        if (confirm.confirm === 'yes') {
            console.log("Create an element")
            filterMarkdown()
        } else if (confirm.confirm === 'no') {
            console.log("your project is done")
        }
    }

    catch (err) {
        console.log(err)
    }
}


async function filterMarkdown() {
    console.log('Write header or paragraph')
    try {
        const markdownRes = await choseMarkdown()
        let markdown = markdownRes.element
        // console.log(markdown)

        const leftMd = leftMdArr.filter(item => item === markdown)
        const leftRightMd = leftRightMdArr.filter(item => item === markdown)
        const links = linksArr.filter(item => item === markdown)
        const image = imgArr.filter(item => item === markdown)


        // console.log('the filtered value is')
        // console.log(filtered)
        // console.log(leftMd.length)
        // console.log(leftRightMd.length)

        if (leftMd.length === 1) {
            writeMarkLeft(markdown)
            // convertToMarkdown(markdown)
        } else if (leftRightMd.length === 1) {
            writeMarkLeftAndRight(markdown)
        } else if (links.length === 1) {
            writeLinks(markdown)
        } else if (image.length === 1) {
            writeImages(markdown)
        }
    }

    catch (err) {
        console.log(err)
    }
}

async function writeMarkLeft(element) {
    try {

        let userRes = await userInput()
        // console.log(userRes)

        let userContent = userRes.content
        // console.log(userContent)

        let toConvert = element
        // console.log(element)

        let filteredMarkdown = await convertToMarkdown(toConvert)
        console.log(filteredMarkdown)

        appendAsyncFile('readme.md', filteredMarkdown + ' ' + userContent + "\n")
        console.log('succesfully written to readme')

        start()
    }

    catch (err) {
        console.log(err)
    }
}

async function writeMarkLeftAndRight(element) {
    try {

        let userRes = await userInput()
        // console.log(userRes)

        let userContent = userRes.content
        // console.log(userContent)

        let toConvert = element
        // console.log(element)

        let filteredMarkdown = await convertToMarkdown(toConvert)
        // console.log(filteredMarkdown)

        appendAsyncFile('readme.md', filteredMarkdown + userContent + filteredMarkdown + "\n")
        console.log('succesfully written to readme')

        start()
    }

    catch (err) {
        console.log(err)
    }
}

async function writeLinks(element) {
    try {

        let userRes = await userInputLink()
        // console.log(userRes)

        let placeholder = userRes.placeholder
        let url = userRes.url
        // console.log(placeholder)

        let toConvert = element
        // console.log(element)

        let filteredMarkdown = await convertToMarkdown(toConvert)
        // console.log(filteredMarkdown)

        appendAsyncFile('readme.md', "[" + placeholder + "]" + "(" + url + ")" + "\n")
        console.log('succesfully written to readme')

        start()
    }

    catch (err) {
        console.log(err)
    }
}

async function writeImages(element) {
    try {

        let userRes = await userInputLink()
        // console.log(userRes)

        let placeholder = userRes.placeholder
        let url = userRes.url
        // console.log(placeholder)

        let toConvert = element
        // console.log(element)

        let filteredMarkdown = await convertToMarkdown(toConvert)
        // console.log(filteredMarkdown)

        appendAsyncFile('readme.md', "![" + placeholder + "]" + "(" + url + ")" + "\n")
        console.log('succesfully written to readme')

        start()
    }

    catch (err) {
        console.log(err)
    }
}


// collects choseMarkdowns() and userInput(content) and assign it to the relevant function to write file
// async function init() {
//     console.log('Welcome to the readme generator')
//     try {
//         const mardownRes = await choseMarkdown()
//         const userRes = await userInput()
//         // console.log(responses)
//         // console.log(responses.element)

//         let markdown = mardownRes.element
//         let content = userRes.content

//         console.log(markdown)
//         console.log(content)

//         switch (markdown) {
//             case 'h1':
//                 markdown = '#'
//                 userInput()
//                 await writeHeaders(markdown, content)
//                 break;
//             case 'h2':
//                 markdown = '##'
//                 userInput(content)
//                 await writeHeaders(markdown, content)
//                 break;
//             case 'h3':
//                 markdown = '###'
//                 writeHeaders(markdown, content)
//                 break;
//             case 'h4':
//                 markdown = '####'
//                 writeHeaders(markdown, content)
//                 break;
//             case 'h5':
//                 markdown = '#####'
//                 writeHeaders(markdown, content)
//                 break;
//             case 'h6':
//                 markdown = '######'
//                 writeHeaders(markdown, content)
//                 break;
//             case 'italic':
//                 markdown = '_'
//                 writeItalic(markdown, content)
//                 break;
//             case 'strong':
//                 markdown = '__'
//                 writeStrong(markdown, content)
//                 break;
//             case 'blockquote':
//                 markdown = '__'
//                 writeBlockquote(markdown, content)
//                 break;
//             case 'link':
//                 writeLink(content)
//                 break;
//         }
//     }

//     catch (err) {
//         console.log(err)
//     }
// }




// async function writeItalic(markdown, content) {
//     console.log('Write italic paragraph')
//     try {
//         appendAsyncFile('readme.md', markdown + content + markdown + "\n")
//         console.log('succesfully written to readme')

//         start()
//     }

//     catch (err) {
//         console.log(err)
//     }
// }

// async function writeStrong(markdown, content) {
//     console.log('Write strong paragraph')
//     try {
//         appendAsyncFile('readme.md', markdown + content + markdown + "\n")
//         console.log('succesfully written to readme')

//         start()
//     }

//     catch (err) {
//         console.log(err)
//     }
// }

// async function writeBlockquote(markdown, content) {
//     console.log('Write strong paragraph')
//     try {
//         appendAsyncFile('readme.md', markdown + content + "\n")
//         console.log('succesfully written to readme')

//         start()
//     }

//     catch (err) {
//         console.log(err)
//     }
// }

// async function writeLink(content) {
//     console.log('Write strong paragraph')
//     try {
//         const linkInfo = await inquirer.prompt([
//             {
//                 message: 'chose a placholder for your link',
//                 name: 'placeholder',
//             },
//             {
//                 message: 'enter the link',
//                 name: 'link',
//             },

//         ])

//         console.log(linkInfo)

//         // appendAsyncFile('readme.md', '[' + content + ']' + '(' + content + ')' + "\n")
//         // console.log('succesfully written to readme')

//         // start()
//     }

//     catch (err) {
//         console.log(err)
//     }
// }


