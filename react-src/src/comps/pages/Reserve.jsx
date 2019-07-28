import React from 'react';
import {
  Container, Segment,
} from 'semantic-ui-react';

import Template from 'comps/Template';
import ReserveForm from 'comps/ReserveForm';


function Reserve({ location }) {
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
          <ReserveForm type={type} />
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

export default Reserve;