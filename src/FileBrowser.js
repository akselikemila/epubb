import React from 'react';

class FileBrowser extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            blob: ''
        }
    }

    render() {
        return (
            <div className="App-fileBrowser">
                <p>{this.props.file.name}</p>
                <img id="fileBrowser-preview" alt={this.props.file.name} src={this.props.blob} />
            </div>
        )
    }

}

export default FileBrowser;