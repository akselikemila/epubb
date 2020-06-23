import React from 'react';

import './App.css';

import EpubUtil from './EpubUtils'
import ItemBrowser from './ZipBrowser';
import FileBrowser from './FileBrowser';
import Sisällysluettelo from './Sisällysluettelo';
import Virhe from './Virhe';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      fileName: null,
      title: '',
      author: '',
      publisher: '',
      items: [],
    }

    this.parser = new EpubUtil()
    this.avaaTiedosto = this.avaaTiedosto.bind(this)
    this.closeFile = this.closeFile.bind(this)
    this.fileSelected = this.fileSelected.bind(this)
    this.avaaSisällys = this.avaaSisällys.bind(this)
  }

  /**
   * 
   * @param {Event} event 
   */
  avaaTiedosto(event) {
    const self = this;
    const loadedFile = event.target.files[0];
    const parser = this.parser;

    parser.load(loadedFile).then(() => {
      self.setState({
        fileName: loadedFile.name,
        title: parser.title,
        author: parser.author,
        publisher: parser.publisher,
        items: parser.items,
        version: parser.version,
        alikomponentti: null
      })
      parser.openResource(parser.cover).then(data => {
        self.setState({
          alikomponentti: <FileBrowser file={data} />
        })
      }, msg => {
        self.setState({
          alikomponentti: <Virhe viesti={msg} />
        })
      })
    })
  }

  closeFile(event) {
    this.setState({
      fileName: null,
      title: '',
      author: '',
      publisher: '',
      alikomponentti: null
    })
  }

  avaaSisällys(event) {
    const self = this
    this.parser.parseToc().then(sisällys => {
      self.setState({
        alikomponentti: <Sisällysluettelo sisällys={sisällys} />
      })
    })
  }

  fileSelected(file) {
    const self = this
    this.parser.openResource(file).then(data => {
      self.setState({
        alikomponentti: <FileBrowser file={data} />
      })
    },msg => {
      self.setState({
        alikomponentti: <Virhe viesti={msg} />
      })
    })
  }

  render() {
    const loadedFile = this.state.fileName != null
    const alikomponentti = this.state.alikomponentti

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
            {alikomponentti !== null && alikomponentti}
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
              <input type="file" accept="application/epub+zip" id="fileInput" onChange={this.avaaTiedosto}></input>
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
