import React from 'react';

import './FileBrowser.css';

class FileBrowser extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            blob: ''
        }
    }

    componentDidMount() {
        let file = this.props.file;
        file.async("blob").then(blob => {
            this.setState({
                blob: URL.createObjectURL(blob)
            })
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.file.name === prevProps.file.name) return

        if (this.state.blob) URL.revokeObjectURL(this.state.blob)

        this.props.file.async("blob").then(blob => {
            this.setState({
                blob: URL.createObjectURL(blob)
            })
        })
    }

    componentWillUnmount() {
        if (this.state.blob) URL.revokeObjectURL(this.state.blob)
    }

    render() {
        return (
            <div className="App-fileBrowser">
                <p>{this.props.file.name}</p>
                <img id="fileBrowser-preview" alt={this.props.file.name} src={this.state.blob} />
            </div>
        )
    }

}

export default FileBrowser;