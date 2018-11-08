import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';

class TableExperiment extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let dashboard = '/api/dashboard/experiment/';
    let experiments = this.props.experiments;

    experiments = experiments.map((experiment) =>
      <Table.Row key={experiment._id}>
        <Table.Cell>{experiment.name}</Table.Cell>
        <Table.Cell>{experiment.AGroup}</Table.Cell>
        <Table.Cell>{experiment.ATraffic}</Table.Cell>
        <Table.Cell>{experiment.BGroup}</Table.Cell>
        <Table.Cell>{experiment.BTraffic}</Table.Cell>
        <Table.Cell>{experiment._id}</Table.Cell>
        <Table.Cell>
          <a
            target={'_blank'}
            href={`http://localhost:9000${dashboard}${experiment._id}/${experiment.AGroup}/${experiment.BGroup}`}
          >
            {experiment.name}
          </a>
        </Table.Cell>

        <Table.Cell>
          <ModalConfirmDelete
            headerTitle='Delete'
            buttonTriggerTitle='Delete'
            buttonColor='light red basic mini'
            experiment={experiment}
            onExperimentDeleted={this.props.onExperimentDeleted}
            server={this.props.server}
          />
        </Table.Cell>
      </Table.Row>
    );

    // Make every new experiment appear on top of the list
    experiments =  [...experiments].reverse();

    return (
      <Table ui singleline table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Experiment Name</Table.HeaderCell>
            <Table.HeaderCell>Group A</Table.HeaderCell>
            <Table.HeaderCell>Group A Traffic</Table.HeaderCell>
            <Table.HeaderCell>Group B</Table.HeaderCell>
            <Table.HeaderCell>Group B Traffic</Table.HeaderCell>
            <Table.HeaderCell>ExperimentId</Table.HeaderCell>
            <Table.HeaderCell>Analytics</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>

          </Table.Row>
        </Table.Header>
        <Table.Body>
          {experiments}
        </Table.Body>
      </Table>
    );
  }
}

export default TableExperiment;
