import React from 'react';
import './ZipBrowser.css'

class ZipBrowser extends React.Component {

    constructor(props) {
        super(props)

        if (props.files) {
            console.log(props.files)
        }
    }

    render() {
        const archiveLoaded = this.props.zipArchive != null
        
        if (archiveLoaded) {
            const elements = []
            this.props.files.forEach((relativePath, zipObject) => 
                elements.push(
                    <li key={relativePath} onClick={this.props.onFileSelect.bind(this, zipObject)}>
                        {relativePath}
                    </li>
                )
            )
            return (
                <div className="App-sidebar">
                    <h4>Tiedoston sisältö:</h4>
                    <ul>{elements}</ul>
                </div>
            )
        }
        else {
            return (
                <div className="App-sidebar">
                    <p>Please load an archive</p>
                </div>
            )
        }
    }

}

export default ZipBrowser;