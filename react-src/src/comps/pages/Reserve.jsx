import React from 'react';
import {
  Container, Segment, Header,
} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Template from 'comps/Template';
import ReserveForm from 'comps/ReserveForm';
import qs from 'query-string';

function Reserve({ location , isAuthenticated }) {
  let type = qs.parse(location.search, { ignoreQueryPrefix: true }).type;
  let date = qs.parse(location.search, { ignoreQueryPrefix: true }).date;
  let time_slot = qs.parse(location.search, { ignoreQueryPrefix: true }).time_slot;
  
  return (
    <Template>
      <Container style={styles.bodyRoot}>
        <Segment raised style={styles.formContainer}>
          {isAuthenticated
            ? <ReserveForm type={type} date={date} time_slot={time_slot} />
            : <React.Fragment>
            <div className="center" >
              <Header as="h1">ابتدا وارد سایت شوید</Header>
            </div>
          </React.Fragment>
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