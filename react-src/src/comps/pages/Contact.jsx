import React from 'react';
import {
  Container, Segment, Header, Image, Icon, Grid,
} from 'semantic-ui-react';

import Template from 'comps/Template';
import data from 'data';


function Contact() {
  return (
    <Template>
      <Container style={{ padding: 32 }}>
        <Segment raised style={{ padding: 32 }}>
          <Grid>
            <Grid.Column mobile={16} computer={5}>
              <Segment>
                <Image style={styles.img} src='/img/building3.jpg' />
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} computer={11}>
              <Header>
                آدرس
              </Header>
              <p>
                {data.address}
              </p>
              <Header>
                تلفن‌های تماس
              </Header>
              {data.phones.map(phone => <p>{phone}</p>)}
              <Header>
                در شبکه‌های اجتماعی
              </Header>
              <a target="_blank noopener noreferrer" href={data.socialMedia.instagram}>
                <Icon name="instagram" size="huge" color="red" />
              </a>
              <a target="_blank noopener noreferrer" href={data.socialMedia.telegram}>
                <Icon name="telegram" size="huge" color="blue" />
              </a>
              <div style={{ clear: 'both' }}></div>
            </Grid.Column>
          </Grid>

        </Segment>
      </Container>
    </Template>
  );
}

const styles = {
  leftside: {
    display: 'inline-block',
    float: 'left',
  },
  img: {
    width: 324,
  },
};

export default Contact;