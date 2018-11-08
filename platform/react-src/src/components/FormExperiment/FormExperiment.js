import React, { Component } from 'react';
import { Message, Button, Form } from 'semantic-ui-react';
import axios from 'axios';

class FormExperiment extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      AGroup: '',
      ATraffic: '',
      BGroup: '',
      BTraffic: '',
      formClassName: '',
      formSuccessMessage: '',
      formErrorMessage: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.experimentID) {
      axios.get(`${this.props.server}/api/experiment/${this.props.experimentID}`)
      .then((response) => {
        this.setState({
          name: response.data.name,
          AGroup: response.data.AGroup,
          ATraffic: response.data.ATraffic,
          BGroup: response.data.BGroup,
          BTraffic: response.data.BTraffic,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSelectChange(e, data) {
    this.setState({ gender: data.value });
  }

  handleSubmit(e) {
    // Prevent browser refresh
    e.preventDefault();

    const experiment = {
      name: this.state.name,
      AGroup: this.state.AGroup,
      ATraffic: this.state.ATraffic,
      BGroup: this.state.BGroup,
      BTraffic: this.state.BTraffic,
    };

    // set method to put if experimentID exists, otherwise its a post
    const method = this.props.experimentID ? 'put' : 'post';
    //set param to the experiment id otherwise leave empty string
    const params = this.props.experimentID ? this.props.experimentID : '';

    axios({
      method: method,
      responseType: 'json',
      url: `${this.props.server}/api/experiment/${params}`,
      data: experiment
    })
    .then(() => {
      this.setState({
        formClassName: 'success',
        formSuccessMessage: "Successfully submitted Experiment!"
      });

      if (!this.props.experimentID) {
        //set state to clear
        this.setState({
          name: '',
          AGroup: '',
          ATraffic: '',
          BTraffic: '',
          BGroup: ''
        });

      }

    })
    .catch((err) => {
      if (err) {
          this.setState({
            formClassName: 'warning',
            formErrorMessage: err.response.message || err.response.data.message
          });
      }
      else {
        this.setState({
          formClassName: 'warning',
          formErrorMessage:  err.response.message || err.response.data.message
        });
      }
    });
  }

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <Form className={formClassName} onSubmit={this.handleSubmit}>
        <Form.Input
          label='Experiment Name'
          type='text'
          placeholder='Example: Red Button Vs. Yellow Button'
          name='name'
          maxLength='100'
          required
          value={this.state.name}
          onChange={this.handleInputChange}
        />

        <Form.Group widths='equal'>
          <Form.Input
            label='Group A'
            type='text'
            placeholder='With Red Button'
            name='AGroup'
            maxLength='150'
            required
            value={this.state.AGroup}
            onChange={this.handleInputChange}
          />
          <Form.Input
            label='Group A Traffic'
            type='number'
            required
            placeholder='100'
            min={0}
            max={100}
            name='ATraffic'
            value={this.state.ATraffic}
            onChange={this.handleInputChange}
          />
          <Form.Input
            label='Group B'
            type='text'
            placeholder='With Grey Button'
            name='BGroup'
            maxLength='300'
            required
            value={this.state.BGroup}
            onChange={this.handleInputChange}
          />
          <Form.Input
            label='Group B Traffic'
            type='number'
            required
            placeholder='0'
            min={0}
            max={100}
            name='BTraffic'
            value={this.state.BTraffic}
            onChange={this.handleInputChange}
          />
        </Form.Group>
        <Message
          success
          color='green'
          header='Your Experiment has been added, but has not been enabled.'
          content={formSuccessMessage}
        />
        <Message
          warning
          color='red'
          header='Failed validation. Check errors :'
          content={formErrorMessage}
        />
        <Button color={this.props.buttonColor} floated='right'>{this.props.buttonSubmitTitle}</Button>
        <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
    );
  }
}

export default FormExperiment;
