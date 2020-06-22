import React from 'react';

import './App.css';

import EpubUtil from './EpubUtils'
import ItemBrowser from './ZipBrowser';
import FileBrowser from './FileBrowser';
import Sisällysluettelo from './Sisällysluettelo';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      fileName: null,
      title: '',
      author: '',
      publisher: '',
      meta: {},
      items: [],
      tocOpen: false,
      toc: null
    }

    this.parser = new EpubUtil()
    this.parseZip = this.parseZip.bind(this)
    this.closeFile = this.closeFile.bind(this)
    this.fileSelected = this.fileSelected.bind(this)
    this.avaaSisällys = this.avaaSisällys.bind(this)
  }

  /**
   * 
   * @param {Event} event 
   */
  parseZip(event) {
    const self = this;
    const loadedFile = event.target.files[0];
    const parser = this.parser;

    parser.load(loadedFile).then(() => {
      self.setState({
        fileName: loadedFile.name,
        title: parser.title,
        author: parser.author,
        publisher: parser.publisher,
        meta: parser.meta,
        items: parser.items,
        version: parser.version,
        cover: parser.cover,
        tocOpen: false,
        toc: null
      })
      parser.openResource(parser.cover).then(data => {
        self.setState({
          selectedFile: data
        })
      }, msg => console.log('Failed: ', msg))
    })
  }

  closeFile(event) {
    this.setState({
      fileName: null,
      title: '',
      author: '',
      publisher: '',
      meta: ''
    })
  }

  avaaSisällys(event) {
    const self = this
    this.parser.parseToc().then(sisällys => {
      self.setState({
        tocOpen: true,
        toc: sisällys
      })
    })
  }

  fileSelected(file) {
    const self = this
    this.parser.openResource(file).then(data => {
      self.setState({
        selectedFile: data
      })
    }, msg => alert('Failed: ' + msg))
    //this.setState({selectedFile: file})
  }

  render() {
    const loadedFile = this.state.fileName != null
    const selectedFile = this.state.selectedFile
    const tocOpen = this.state.tocOpen
    const sisällys = this.state.toc

    if (loadedFile) {
      return (
        <div className="App">
          <header className="App-header">
            <img className="App-coverImage" />
            <dl>
              <dt>Teos:</dt>
              <dd>{this.state.title}</dd>
              <dt>Kirjoittaja:</dt>
              <dd>{this.state.author}</dd>
              <dt>Julkaisija:</dt>
              <dd>{this.state.publisher}</dd>
              <dt>Versio:</dt>
              <dd>{this.state.version}</dd>
            </dl>
            <p>
              <label onClick={this.closeFile}>Sulje tiedosto</label>
              <label onClick={this.avaaSisällys}>Avaa sisällysluettelo</label>
            </p>
            {selectedFile != null && !tocOpen &&
              <FileBrowser file={selectedFile} />
            }
            {tocOpen &&
              <Sisällysluettelo sisällys={sisällys} />
            }
          </header>
          <ItemBrowser zipArchive={this.state.fileName} files={this.state.items} onFileSelect={this.fileSelected} />
        </div>
      )
    }
    else {
      return (
        <div className="App">
          <header className="App-header">
            <p>
              <label htmlFor="fileInput">Avaa paikallinen tiedosto</label>
              <input type="file" accept="application/epub+zip" id="fileInput" onChange={this.parseZip}></input>
            </p>
            <p></p>
            <p></p>
          </header>
        </div>
      )
    }

  }

}

export default App;
