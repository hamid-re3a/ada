import React from 'react';
import {
  Container, Segment, Header,
  Item, Card,
  Icon, Grid,
  Divider,
} from 'semantic-ui-react';

import Template from 'comps/Template';


function Track() {
  return (
    <Template>
      <Container style={styles.bodyRoot}>
        <Segment raised style={styles.formContainer}>
          <div className="center">
            <Header as="h1">رزروهای انجام شده</Header>
          </div>
          <Divider />
          <Item.Group>
            <Grid>
              <Grid.Column only='computer' computer={5}>
                <Header>Articles</Header>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={5}>
                <Header>Articles</Header>
              </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={5}>
                <Header>Articles</Header>
              </Grid.Column>
              <Grid.Column only='mobile tablet' mobile={16} tablet={16}>
                <Header>mobile</Header>
              </Grid.Column>
            </Grid>
          </Item.Group>
          {/* <Table celled
            headerRow={reserveHeaders}
            renderBodyRow={ReserveRow}
            tableData={reserves} /> */}
          {/* <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Image src='/img/meditation.jpg' style={{ display: 'inline', width: 256 }} />
          </div> */}
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

export default Track;
