import JSZip from 'jszip';
import SAX from 'sax'

class EpubUtil {
    constructor() {
        this.zipArchive = null;
        this.rootFiles = []

        this.version = 0
        this.author = ''
        this.title = ''
        this.cover = ''
        this.publisher = ''
        this.date = null
        this.meta = {}
    }

    load(file) {
        const self = this;
        return new Promise((rsl, reject) => {
            JSZip.loadAsync(file).then(zip => {
                self.zipArchive = zip
                self.listRootfiles(rsl)
            })
        })
    }

    getCover() {
        const root = this.rootFiles[0]
        const self = this;
        return new Promise((rslt, fail) => {
            var currentTag = null

            self.zipArchive.file(root).async('text').then(text => {
                var parser = SAX.parser(true)
                parser.onopentag = tag => {
                    currentTag = tag.name;
                    switch (currentTag) {
                        case 'package':
                            self.version = tag.attributes.version
                            break
                        case 'meta':
                            self.meta[tag.attributes.name] = tag.attributes.content
                            break
                        default:
                            //console.log('Unhandled tag: ' + currentTag)
                            break
                    }
                }
                parser.ontext = text => {
                    if (!text.trim()) return
                    console.log(currentTag, text)
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
                parser.onend = function() {
                    console.log(self)
                    rslt(self.cover)
                }
                parser.onerror = error => {
                    console.log(error)
                    fail('fail')
                }
                parser.write(text).close()
            })
        })
    }

    /**
     * Parses META-INF/container.xml for root files,
     * stores them in rootFiles array
     */
    listRootfiles(done) {
        const parser = SAX.parser(true)
        const self = this
        parser.onattribute = attr => {
            if (attr.name === 'full-path') self.rootFiles.push(attr.value)
        }

        console.log('listRootfiles called')

        if (!this.zipArchive) throw Error('EpubUtils not initialized properly')

        this.zipArchive.file('META-INF/container.xml')
        .async('text')
        .then(text => {
            parser.write(text).close()
            done(self.rootFiles)
        })
    }
}

export default EpubUtil