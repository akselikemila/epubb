import React from 'react';

class FileBrowser extends React.Component {

    render() {
        return (
            <div className="App-fileBrowser">
                <p>{this.props.fileName}</p>
            </div>
        )
    }

}

export default FileBrowser;