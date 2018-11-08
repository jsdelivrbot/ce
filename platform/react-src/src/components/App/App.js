import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';

import TableExperiment from '../TableExperiment/TableExperiment';
import ModalExperiment from '../ModalExperiment/ModalExperiment';

import logo from '../../experiment.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || 'http://localhost:3000';

    this.state = {
      experiments: [],
    };

    this.fetchExperiments = this.fetchExperiments.bind(this);
    this.handleExperimentAdded = this.handleExperimentAdded.bind(this);
    this.handleExperimentUpdated = this.handleExperimentUpdated.bind(this);
    this.handleExperimentDeleted = this.handleExperimentDeleted.bind(this);
  }

  // Place socket.io code inside here
  componentDidMount() {
    this.fetchExperiments();
  }

  // Fetch data from the back-end
  fetchExperiments() {

    axios.get(`${this.server}/api/experiment`)
    .then((response) => {
      this.setState({ experiments: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleExperimentAdded(experiment) {
    //todo: why did I slice here again instead of just pushing?
    let experiments = this.state.experiments.slice();
    experiments.push(experiment);
    this.setState({ experiments: experiments });
  }

  handleExperimentUpdated(experiment) {
    let experiments = this.state.experiments.slice();
    for (let i = 0, n = experiments.length; i < n; i++) {
      //todo: update this ridiculous
      if (experiments[i]._id === experiment._id) {
        experiments[i].name = experiment.name;
        experiments[i].AGroup = experiment.AGroup;
        experiments[i].ATraffic = experiment.ATraffic;
        experiments[i].BGroup = experiment.BGroup;
        experiments[i].BTraffic = experiment.BTraffic;
        break;
      }
    }
    this.setState({ experiments: experiments });
  }

  handleExperimentDeleted(experiment) {
    let experiments = this.state.experiments.slice();
    experiments = experiments.filter(u => { return u._id !== experiment._id; });
    this.setState({ experiments: experiments });
  }

  render() {

    return (

      <div>
        <div className='App'>
          <div className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-intro'>Conscious Experiment Company</h1>
            <h2>Configuration Panel</h2>
          </div>
        </div>
        <Container>
          <ModalExperiment
            headerTitle='Add Experiment'
            buttonTriggerTitle='Add Experiment'
            buttonSubmitTitle='Add Experiment'
            buttonColor='blue basic'
            onExperimentAdded={this.handleExperimentAdded}
            server={this.server}
          />
          <TableExperiment
            onExperimentUpdated={this.handleExperimentUpdated}
            onExperimentDeleted={this.handleExperimentDeleted}
            experiments={this.state.experiments}
            server={this.server}
          />
        </Container>
        <br/>
      </div>
    );
  }
}

export default App;
