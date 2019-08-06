import React from 'react';
import {
  Container, Segment, Grid, Image,
  Divider
} from 'semantic-ui-react';

import Template from 'comps/Template';
import data from 'data';


function About() {
  return (
    <Template>
      <Container style={{ padding: 32 }}>
        <Segment raised style={{ padding: 32 }}>
        <Grid>
            <Grid.Column mobile={16} computer={5}>
              <Segment>
              <Image src='/img/corridor4.jpg' style={styles.img} />
              </Segment>
              <Segment>
            <Image src='/img/flags.jpg' style={styles.img} />
              </Segment>
            </Grid.Column>
            <Grid.Column mobile={16} computer={11}>
            <Divider horizontal>Adak Spa ارائه‌دهنده‌ی بهترین خدمات ماساژ</Divider>
          <br/>
          <p>
            اینجا جایی است که شما ‌‌می‌توانید حداقل یک ماساژ و بهسازی صورت در یک ملاقات روزانه داشته باشید. حدود ۸۰ درصد از اسپاها، اسپاهای روزانه هستند.
          </p>
          <br/><br/><br/>
          <Divider horizontal>
            مدیریت
          </Divider>
          <p>
            {data.manager}
          </p>
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

export default About;