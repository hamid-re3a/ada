import React from "react";
import {Button, Modal, Form, Popup, Icon, Header, Divider} from "semantic-ui-react";
import AbstractForm from "./AbstractForm";
import {connect} from "react-redux";
import {ACT_signin, ACT_signup, ACT_signout} from "redux/action/user";


function Auth({ isAuthenticated, inverted = false, signup, signin, signout }) {
  return isAuthenticated
    ? <AccountControl signout={signout} />
    : <AuthControls inverted={inverted} signup={signup} signin={signin} />
    ;
}

class AuthControls extends React.Component {
  state = { open: false, tab: 0 };
  signupClicked = () => this.setState({ open: true, tab: 0 });
  signinClicked = () => this.setState({ open: true, tab: 1 });
  close = () => this.setState({ open: false });
  tabChanged = (e, { activeIndex }) => this.setState({ tab: activeIndex });
  render() {
    const { inverted, signup, signin } = this.props;
    return (
      <React.Fragment>
        <Button onClick={this.signinClicked} inverted={inverted}
          color="violet" style={{ marginLeft: '0.5em' }}>
          ورود
        </Button>
        <Button onClick={this.signupClicked} inverted={inverted}>
          عضویت
        </Button>
        <Modal open={this.state.open} onClose={this.close} size="tiny">
          {/* <Tab
            activeIndex={this.state.tab}
            onTabChange={this.tabChanged}
            menu={{ secondary: true, pointing: true, attached: 'top' }}
            panes={[
              {
                menuItem: 'ورود', render: () =>
                  <Tab.Pane attached='bottom'>ورود</Tab.Pane>
              },
              {
                menuItem: 'عضویت', render: () =>
                  <Tab.Pane attached='bottom'>عضویت</Tab.Pane>
              },
            ]}
          /> */}
          <Modal.Content>
            {this.state.tab === 0
              ? <SignUp signup={signup} close={this.close} />
              : <SignIn signin={signin} close={this.close} />}
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}

class SignUp extends AbstractForm {
  constructor() {
    super();
    this.state = {
      error: null
    }
  }
  submit = () => {
    const { username, password, passwordConfirm } = this.state;
    this.props.signup(username, password, passwordConfirm)
      .then((rs) => {
        if (rs.success === false)
          this.setState({
            error: rs.response.data.result_message
          })
        else
          this.props.close();

      });
  }
  render() {
    return (
      <Form>
        <Header as='h2' textAlign={"center"}>فرم ثبت نام</Header>
        <Divider />
        <Form.Button basic style={this.state.error != null ? null : { display: 'none' }} size="large" fluid color='red'>
          {this.state.error}
        </Form.Button>
        <br />
        <Form.Input label="شماره موبایل"
          {...this.commonProps("username")} />
        <Form.Input label="رمز عبور" type="password"
          {...this.commonProps("password")} />
        <Form.Input label="رمز عبور را مجدد وارد کنید" type="password"
          {...this.commonProps("passwordConfirm")} />
        <Form.Button color="violet" size="large" fluid
          onClick={this.submit}>
          عضویت
        </Form.Button>
      </Form>
    );
  }
}

class SignIn extends AbstractForm {
  constructor() {
    super();
    this.state = {
      error: null
    };
  }
  submit = () => {
    const { username, password } = this.state;
    this.props.signin(username, password).then((rs) => {
      if (rs.success === false)
        this.setState({
          error: rs.response.data.result_message
        })
      else
        this.props.close();

    });

  }
  render() {
    return (
      <Form error={!!this.state.error}>
        <Header as='h2' textAlign={"center"}>فرم ورود</Header>
        <Divider />
        <Form.Button basic style={this.state.error != null ? null : { display: 'none' }} size="large" fluid color='red'>
          {this.state.error}
        </Form.Button>
        <br />
        <Form.Input label="شماره موبایل"
          {...this.commonProps("username")} />
        <Form.Input label="رمز عبور" type="password"
          {...this.commonProps("password")} />

        <Form.Button color="violet" size="large" fluid
          onClick={this.submit}>
          ورود
        </Form.Button>

      </Form>
    );
  }
}

function AccountControl({ signout }) {
  return (
    <Popup
      trigger={<Icon name="user circle" size="large" />}
      on="click"
    >
      {/* <Header as="h6">admin</Header>
      <Divider /> */}
      <Button negative onClick={signout}>خروج</Button>
    </Popup>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.accessToken,
});

const mapDispatchToProps = dispatch => ({
  signup: (username, password, passwordConfirm) => dispatch(ACT_signup(username, password, passwordConfirm)),
  signin: (username, password) => dispatch(ACT_signin(username, password)),
  signout: () => dispatch(ACT_signout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);