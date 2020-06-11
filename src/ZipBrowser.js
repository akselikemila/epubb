import React from 'react';
import './ZipBrowser.css'

class ItemBrowser extends React.Component {

    render() {
        const archiveLoaded = this.props.zipArchive != null

        if (archiveLoaded) {
            const elements = []
            for (let [key, data] of this.props.files) {
                elements.push(
                    <li key={key} onClick={this.props.onFileSelect.bind(this, key)}>
                        {data.href}
                    </li>
                )
            }
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

export default ItemBrowser;