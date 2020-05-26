import React from 'react';
import logo from './logo.svg';
import './App.css';
import JSZip from 'jszip';
import ZipBrowser from './ZipBrowser';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      file: null,
      zipArchive: null,
    }

    this.parseZip = this.parseZip.bind(this)
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

  render() {
    const loadedFile = this.state.file
    const zipArchive = this.state.zipArchive

    if (loadedFile) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>File loaded: {loadedFile.name}</p>
            <p><input type="file" id="fileInput" onChange={this.parseZip}></input></p>
          </header>
          <ZipBrowser zipArchive={loadedFile.name} files={zipArchive} />
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
