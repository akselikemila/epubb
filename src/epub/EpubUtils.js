/**
 * @file Epub-dokumentteja käsittelevä luokka
 * @author Akseli Kemilä
 */

import JSZip from 'jszip';
import SAX from 'sax'
import TocParser from './TocParser';

/**
 * Sitoo MIME-tyypit JSZip tyyppeihin
 * @readonly
 * @enum {string}
 */
const mimetypeMap = {
    'text/html': 'text',
    'application/xhtml+xml': 'text',
    'image/jpeg': 'blob',
    'image/png': 'blob',
    'application/x-dtbncx+xml': 'text'
}

/**
 * Epub-dokumentteja käsittelevä luokka
 */
class EpubUtil {
    constructor() {
        this.zipArchive = null;

        window.EpubUtil = this

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
        this.base = ''
        this.spine = []
        this.toc = ''
        this.parsedToc = null
    }

    /**
     * Loads an OCF file
     * @param {File} file 
     * @returns {Promise} 
     */
    load(file) {
        this.reset()
        const self = this;
        return new Promise((rsl, reject) => {
            JSZip.loadAsync(file).then(zip => {
                self.zipArchive = zip
                self.listRootfiles().then(rootFile => {
                    self.parsePackageDocument(rootFile).then(rsl)
                })
            })
        })
    }

    /**
     * Parses metadata from package document
     * @param {string} root Path to file
     */
    parsePackageDocument(root) {
        const self = this;

        const parts = root.split('/')
        if (parts.length > 1) {
            this.base = parts[0]
        }

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
                        case 'itemref':
                            self.spine.push(tag.attributes.idref)
                            break
                        case 'spine':
                            self.toc = tag.attributes.toc
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
                    self.cover = self.meta['cover']
                        
                    rslt()
                }
                parser.onerror = error => fail(error)
                parser.write(text).close()
            })
        })
    }

    /**
     * 
     * @param {string} path 
     * @param {string} mimeType 
     * @returns {Promise<Blob>}
     */
    openResourceByPath(path, mimeType) {
        const self = this
        return new Promise((resolve, reject) => {
            const fileType = mimetypeMap[mimeType]
            if (!fileType) {
                reject('Unknown mimetype ' + mimeType)
                return
            }
            const absolutePath = self.base ? self.base + '/' + path : path
            const file = self.zipArchive.file(absolutePath)
            if (file === null) {
                reject('File not found: ' + absolutePath)
                return
            }
            file.async(fileType).then(data => {
                resolve(new Blob([data], {type:mimeType}))
            })
        })
    }

    /**
     * 
     * @param {string} id 
     * @returns {Promise<Blob>} 
     */
    openResourceById(id) {
        const self = this;
        return new Promise((success, fail) => {
            const target = self.items.get(id)
            if (!target) {
                fail('Resource not found in manifest: ' + id)
                return
            }
            self.openResourceByPath(target.href, target.mimetype).then(success, fail)
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

    parseToc() {
        const parser = new TocParser()
        const self = this
        const target = self.items.get(self.toc)
        const absolutePath = self.base ? self.base + '/' + target.href : target.href
        return new Promise((resolve, reject) => {
            self.zipArchive.file(absolutePath).async('text')
            .then(text => {
                return parser.parse(text)
            })
            .then(toc => {
                self.parsedToc = toc
                resolve(toc)
            })
        })
    }
}

export default EpubUtil