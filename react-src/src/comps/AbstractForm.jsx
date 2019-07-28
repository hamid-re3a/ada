import React from 'react';


class AbstractForm extends React.Component {
  state = {};
  handleChange = name => (e, { value }) => this.setState({ [name]: value });
  commonProps = name => ({
    name, value: this.state[name], onChange: this.handleChange(name)
  });
}

export default AbstractForm;
