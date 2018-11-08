import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';

import FormExperiment from '../FormExperiment/FormExperiment';

class ModalExperiment extends Component {

  render() {

    return (
      <Modal
        trigger={<Button color={this.props.buttonColor}>{this.props.buttonTriggerTitle}</Button>}
        dimmer='inverted'
        size='tiny'
        closeIcon='close'
      >
        <Modal.Header>{this.props.headerTitle}</Modal.Header>
        <Modal.Content>
          <FormExperiment
            buttonSubmitTitle={this.props.buttonSubmitTitle}
            buttonColor={this.props.buttonColor}
            experimentID={this.props.experimentID}
            onExperimentAdded={this.props.onExperimentAdded}
            server={this.props.server}
            socket={this.props.socket}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalExperiment;
