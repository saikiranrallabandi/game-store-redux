import React from "react";
import PropTypes from "prop-types";
import {
  ControlLabel,
  FormControl,
  Button,
  Image,
  Label
} from "react-bootstrap";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as fileActions from "../../actions/fileActions";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: "",
      file: null
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //console.log('ImageUpload.componentWillReceiveProps');
    this.props.onImageChange(nextProps.image); // can't set parent's props in child component, it's read-only. Instead, have to call the parent's method to update the image.
  }

  handleFileChange(event) {
    const file = event.target.files[0];
    this.setState({ filename: file.name });
    this.setState({ file: file });
  }

  handleFileUpload(event) {
    this.props.fileActions.uploadFile(this.state.file, this.props.product);
  }

  render() {
    //console.log('ImageUpload.render');
    return (
      <div>
        <Image src={this.props.image} thumbnail width="80" height="80" />
        <ControlLabel
          className="btn btn-success"
          htmlFor="fileSelector"
          style={{ marginLeft: "5px" }}
        >
          <FormControl
            id="fileSelector"
            type="file"
            style={{ display: "none" }}
            onChange={this.handleFileChange}
          />Choose Image
        </ControlLabel>
        <Label bsStyle="info" style={{ marginLeft: "5px" }}>
          {this.state.filename}
        </Label>
        <Button
          bsStyle="primary"
          type="button"
          onClick={this.handleFileUpload}
          style={{ marginLeft: "5px" }}
        >
          Upload
        </Button>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  image: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  onImageChange: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  fileActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  //console.log('ImageUpload.mapStateToProps');
  //console.log(state);
  //console.log(ownProps);
  let image = ownProps.image;
  if (state.file.message) {
    image = state.file.message;
  }

  return {
    image: image
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fileActions: bindActionCreators(fileActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
