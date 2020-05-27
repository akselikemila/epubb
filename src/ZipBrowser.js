import React from 'react';

class ZipBrowser extends React.Component {

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
                    <p>Name: {this.props.zipArchive}</p>
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