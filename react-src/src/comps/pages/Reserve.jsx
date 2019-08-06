import React from 'react';
import {
  Container, Segment, Header,
} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Template from 'comps/Template';
import ReserveForm from 'comps/ReserveForm';


function Reserve({ location , isAuthenticated }) {
  let type = location.search;
  if (type.length < 2) type = undefined;
  else {
    type = type.substr(1).split('=')[1];
    type = Number(type);
  }
  return (
    <Template>
      <Container style={styles.bodyRoot}>
        <Segment raised style={styles.formContainer}>
          {isAuthenticated
            ? <ReserveForm type={type} />
            : <Header>Not isAuthenticated</Header>
          }
        </Segment>
      </Container>
    </Template>
  );
}

const styles = {
  bodyRoot: {
    padding: 32,
  },
  formContainer: {
    padding: 32,
  },
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.accessToken,
});

export default connect(mapStateToProps,null)(Reserve);