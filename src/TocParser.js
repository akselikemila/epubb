import SAX from 'sax'

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
    }

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
                this.toc.push({
                    id: tag.attributes.id,
                    label: '',
                    href: ''
                })
            case 'navLabel':
                this.tagStack.push(tag.name)
                break
            case 'content':
                this.toc[this.toc.length - 1].href = tag.attributes.src
                break
            default:
                break
        }
    }
    
    handleTagClose(tag) {
        switch (tag.name) {
            case 'navPoint':
            case 'navLabel':
                this.tagStack.pop()
                break
            default:
                break
        }
    }

    handleText(text) {
        if (text.trim() && this.tagStack[this.tagStack.length - 1] === 'navLabel') {
            this.toc[this.toc.length - 1].label = text
        }
    }
}

export default TocParser