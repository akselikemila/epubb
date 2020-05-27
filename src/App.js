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
      selectedFile: null,
      blob: null,
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
      selectedFile: file.name
    })
    file.async("blob").then(blob => {
      this.setState({
          blob: URL.createObjectURL(blob)
      })
    })
  }

  render() {
    const loadedFile = this.state.file
    const zipArchive = this.state.zipArchive
    const selectedFile = this.state.selectedFile
    const blob = this.state.blob

    if (loadedFile) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>File loaded: {loadedFile.name}</p>
            <p><button onClick={this.closeFile}>Close</button></p>
            { selectedFile != null &&
              <FileBrowser file={zipArchive.file(selectedFile)} blob={blob} />
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
            <img src={logo} className="App-logo" alt="logo" />
            <p>Please load a zip file</p>
            <p>
              <input type="file" accept=".epub,application/epub+zip" id="fileInput" onChange={this.parseZip}></input>
              </p>
          </header>
        </div>
      )
    }

  }

}

export default App;
