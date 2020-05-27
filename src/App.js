import React from 'react';
import logo from './logo.svg';
import './App.css';
import JSZip from 'jszip';
import ZipBrowser from './ZipBrowser';
import FileBrowser from './FileBrowser';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      file: null,
      zipArchive: null,
      selectedFile: null
    }

    this.parseZip = this.parseZip.bind(this)
    this.closeFile = this.closeFile.bind(this)
    this.fileSelected = this.fileSelected.bind(this)
  }

  parseZip(event) {
    const loadedFile = event.target.files[0];
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
      selectedFile: file.name
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
            <p>File loaded: {loadedFile.name}</p>
            <p><button onClick={this.closeFile}>Close</button></p>
            <FileBrowser fileName={selectedFile} />
          </header>
          <ZipBrowser zipArchive={loadedFile.name} files={zipArchive} onFileSelect={this.fileSelected} />
        </div>
      )
    }
    else {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Please load a zip file</p>
            <p><input type="file" id="fileInput" onChange={this.parseZip}></input></p>
          </header>
        </div>
      )
    }

  }

}

export default App;
