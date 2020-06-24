/**
 * @file Sisällysluettelon jäsentäjä
 * @author Akseli Kemilä
 */

import SAX from 'sax'

/**
 * Sisällysluettelon jäsentäjä, luo XML:n pohjalta hierarkisen
 * js-objektin sisällysluettelosta
 */
class TocParser {
    constructor() {
        this.parser = SAX.parser(true)

        this.parser.onend = this.handleEnd.bind(this)
        this.parser.onopentag = this.handleTag.bind(this)
        this.parser.onclosetag = this.handleTagClose.bind(this)
        this.parser.ontext = this.handleText.bind(this)

        this.tagStack = []

        this.resolve = null
        this.reject = null

        this.toc = []
        this.lukuPino = [this.toc]
        this.viimeisinLuku = null
    }

    /**
     * 
     * @param {string} text
     * @returns {Promise<Array>} 
     */
    parse(text) {
        const self = this
        return new Promise((resolve, reject) => {
            self.resolve = resolve
            self.reject = reject

            self.parser.write(text).close()
        })
    }

    handleEnd() {
        this.resolve(this.toc)
    }

    handleTag(tag) {
        switch (tag.name) {
            case 'navPoint':
                let luku = {
                    id: tag.attributes.id,
                    label: '',
                    href: '',
                    children: []
                }
                this.lukuPino[this.lukuPino.length - 1].push(luku)
                this.lukuPino.push(luku.children)
                this.viimeisinLuku = luku
                // eslint-disable-next-line
            case 'navLabel':
                this.tagStack.push(tag.name)
                break
            case 'content':
                this.viimeisinLuku.href = tag.attributes.src
                break
            default:
                break
        }
    }
    
    handleTagClose(tagName) {
        switch (tagName) {
            case 'navPoint':
                this.lukuPino.pop()
                // eslint-disable-next-line
            case 'navLabel':
                this.tagStack.pop()
                break
            default:
                break
        }
    }

    handleText(text) {
        if (text.trim() && this.tagStack[this.tagStack.length - 1] === 'navLabel') {
            this.viimeisinLuku.label = text
        }
    }
}

export default TocParser