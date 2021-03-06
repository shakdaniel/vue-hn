import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const createResolution = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
    }
  }
`;


class ResolutionForm extends Component {
  submitForm = () => {
    this.props.createResolution({
       variables: {
         name: this.name.value
       }
    }).catch(error => {
      console.log(error);
    });
  };

  handleSubmit = e  => {
    e.preventDefault();
    this.refs.form.reset();
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} ref="form">
        <input type="text" ref={input => (this.name = input)} />
        <button onClick={this.submitForm} >Submit</button>
      </form>
    );
  };
}

export default graphql(createResolution, {
  name: "createResolution",
  options: {
    refetchQueries: ["Resolutions"]
  }
})(ResolutionForm);