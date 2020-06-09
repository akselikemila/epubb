import React from 'react';
import JSZip from 'jszip';

import './App.css';

import EpubUtil from './EpubUtils'
import ZipBrowser from './ZipBrowser';
import FileBrowser from './FileBrowser';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      file: null,
      zipArchive: null,
      selectedFile: null,

      title: '',
      author: '',
      publisher: '',
      meta: {},
    }

    this.parser = new EpubUtil()
    this.parseZip = this.parseZip.bind(this)
    this.closeFile = this.closeFile.bind(this)
    this.fileSelected = this.fileSelected.bind(this)
  }

  parseZip(event) {
    const self = this;
    const loadedFile = event.target.files[0];
    var parser = this.parser;

    parser.load(loadedFile).then(msg => {
      parser.getCover().then(cover => {
        console.log(cover)
        self.setState({
          title: parser.title,
          author: parser.author,
          publisher: parser.publisher,
          meta: parser.meta,
          version: parser.version
        })
      })
    })
    JSZip.loadAsync(loadedFile).then(zip => {
      this.setState({
        file: loadedFile,
        zipArchive: zip
      })
    })
  }

  closeFile(event) {
    this.setState({
      file: null,
      zipArchive: null,
      selectedFile: null
    })
  }

  fileSelected(file) {
    this.setState({
      selectedFile: file
    })
  }

  render() {
    const loadedFile = this.state.file
    const zipArchive = this.state.zipArchive
    const selectedFile = this.state.selectedFile

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
              <label>Avaa sisällysluettelo</label>
            </p>
            { selectedFile != null &&
              <FileBrowser file={selectedFile} />
            }
          </header>
          <ZipBrowser zipArchive={loadedFile.name} files={zipArchive} onFileSelect={this.fileSelected} />
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
