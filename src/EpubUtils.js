import JSZip from 'jszip';
import SAX from 'sax'

class EpubUtil {
    constructor() {
        this.zipArchive = null;

        this.reset()
    }

    reset() {
        this.rootFiles = []

        this.version = 0
        this.author = ''
        this.title = ''
        this.cover = ''
        this.publisher = ''
        this.date = null
        this.meta = {}
        this.items = new Map()
    }

    load(file) {
        this.reset()
        const self = this;
        return new Promise((rsl, reject) => {
            JSZip.loadAsync(file).then(zip => {
                self.zipArchive = zip
                self.listRootfiles().then(rootFile => {
                    self.parseContentFile(rootFile).then(rsl)
                })
            })
        })
    }

    parseContentFile(root) {
        const self = this;

        return new Promise((rslt, fail) => {
            let currentTag = null

            self.zipArchive.file(root).async('text').then(text => {
                const parser = SAX.parser(true)
                parser.onopentag = tag => {
                    currentTag = tag.name;
                    switch (currentTag) {
                        case 'package':
                            self.version = tag.attributes.version
                            break
                        case 'meta':
                            self.meta[tag.attributes.name] = tag.attributes.content
                            break
                        case 'item':
                            self.items.set(tag.attributes.id, {
                                mimetype: tag.attributes['media-type'],
                                href: tag.attributes.href
                            })
                            break
                        default:
                            //console.log('Unhandled tag: ' + currentTag)
                            break
                    }
                }
                parser.ontext = text => {
                    if (!text.trim()) return

                    switch (currentTag) {
                        case 'dc:title':
                            self.title = text
                            break
                        case 'dc:creator':
                            self.author = text
                            break
                        case 'dc:publisher':
                            self.publisher = text
                            break
                        case 'dc:date':
                            self.date = text
                            break
                        default:
                            break
                    }
                }
                parser.onend = () => {
                    if (self.meta['cover'] && self.items.has(self.meta['cover'])) {
                        self.meta['cover'] = self.items.get(self.meta['cover']).href
                    }
                        
                    rslt()
                }
                parser.onerror = error => fail(error)
                parser.write(text).close()
            })
        })
    }

    /**
     * Parses META-INF/container.xml for root files,
     * stores them in rootFiles array
     */
    listRootfiles() {
        const self = this

        return new Promise((success, fail) => {
            const parser = SAX.parser(true)
            parser.onattribute = attr => {
                if (attr.name === 'full-path') self.rootFiles.push(attr.value)
            }
            parser.onend = () => success(self.rootFiles[0])

            if (!this.zipArchive) throw Error('EpubUtils not initialized properly')

            this.zipArchive.file('META-INF/container.xml').async('text').then(text => {
                parser.write(text).close()
            })
        })
    }
}

export default EpubUtil