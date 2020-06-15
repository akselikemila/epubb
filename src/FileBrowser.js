import React from 'react';

import './FileBrowser.css';

class FileBrowser extends React.Component {

    constructor(props) {
        super(props)

        this.fileReader = new FileReader()
        this.state = {
            blob: ''
        }
    }

    componentDidMount() {
        this.setState({
            blob: URL.createObjectURL(this.props.file)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.file === prevProps.file) return

        if (this.state.blob) URL.revokeObjectURL(this.state.blob)

        this.setState({
            blob: URL.createObjectURL(this.props.file)
        })
    }

    componentWillUnmount() {
        if (this.state.blob) URL.revokeObjectURL(this.state.blob)
    }

    render() {
        if (this.props.file.type === 'image/jpg' || this.props.file.type === 'image/png' || this.props.file.type === 'image/jpeg') {
            return (
                <div className="App-fileBrowser">
                    <p>{this.props.file.type}</p>
                    <img id="fileBrowser-preview" alt={this.props.file.name} src={this.state.blob} />
                </div>
            )
        }
        else {
            return (
                <div className="App-fileBrowser">
                    <p>{this.props.file.type}</p>
                    <iframe src={this.state.blob} title={this.props.file.name}></iframe>
                </div>
            )
        }
    }

}

export default FileBrowser;