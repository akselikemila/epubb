import JSZip from 'jszip';
import SAX from 'sax'

class EpubUtil {
    constructor() {
        this.zipArchive = null;
        this.rootFiles = []
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
        this.zipArchive.file(root).async('text').then(text => {
            console.log(text)
        })
    }

    /**
     * Parses META-INF/container.xml for root files,
     * stores them in rootFiles array
     */
    listRootfiles(done) {
        const parser = SAX.parser(true)
        parser.onattribute = attr => {
            if (attr.name === 'full-path') this.rootFiles.push(attr.value)
        }

        console.log('listRootfiles called')

        if (!this.zipArchive) throw Error('EpubUtils not initialized properly')

        this.zipArchive.file('META-INF/container.xml')
        .async('text')
        .then(text => {
            console.log(text);
            parser.write(text)
            done('Hullo')
        })
    }
}

export default EpubUtil