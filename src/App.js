import React from 'react';
import JSZip from 'jszip';

import logo from './logo.svg';
import './App.css';

import ZipBrowser from './ZipBrowser';
import FileBrowser from './FileBrowser';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      file: null,
      zipArchive: null,
      selectedFile: null,
    }

    this.parseZip = this.parseZip.bind(this)
    this.closeFile = this.closeFile.bind(this)
    this.fileSelected = this.fileSelected.bind(this)
  }

  parseZip(event) {
    const loadedFile = event.target.files[0];
    console.log(loadedFile)
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
    console.log(file)
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
            <img src={logo} className="App-logo" alt="logo" />
            <dl>
              <dt>Tiedosto:</dt>
              <dd>{loadedFile.name}</dd>
              <dt>Muokattu:</dt>
              <dd>{new Date(loadedFile.lastModified).toLocaleDateString()}</dd>
              <dt>Koko:</dt>
              <dd>{loadedFile.size / 1000000} mt</dd>
            </dl>
            <p>
              <label htmlFor="closeFile">Sulje tiedosto</label>
              <button onClick={this.closeFile} id="closeFile"></button>
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
              <input type="file" accept=".epub,application/epub+zip" id="fileInput" onChange={this.parseZip}></input>
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
