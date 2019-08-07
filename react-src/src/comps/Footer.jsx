import React from 'react';
import Radium from 'radium';
import { Segment, Container, Grid, Header, Menu, Icon, Input } from 'semantic-ui-react';

import { faDigit } from 'utils';
import data from 'data';


const colItems = {
  1: [
    { key: 'type1', name: 'نوع 1', href: '/' },
    { key: 'type2', name: 'نوع 2', href: '/' },
    { key: 'type3', name: 'نوع 3', href: '/' },
    { key: 'type4', name: 'نوع 4', href: '/' },
    { key: 'type5', name: 'نوع 5', href: '/' },
    { key: 'type6', name: 'نوع 6', href: '/' },
  ],
  2: [
    { key: 'login', name: 'ورود', href: '/' },
    { key: 'signup', name: 'عضویت', href: '/' },
    { key: 'explore', name: 'جستجوی خدمات', href: '/services' },
    { key: 'track', name: 'پیگیری رزرو', href: '/track' },
    { key: 'about', name: 'درباره ما', href: '/about' },
    { key: 'contact', name: 'ارتباط با ما', href: '/contact' },
  ],
  3: [
    { key: 'address', name: 'آدرس' },
    { key: 'phone', name: faDigit('021-12345678') },
    { key: 'email', name: 'nobody@nowhere.com' },
  ],
};
colItems[1].map(item => { return item.style = { ':hover': { color: 'violet' }  }  });


function Footer() {
  return (
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid>
          <Grid.Column width={4}>
            <Header as='h4' style={styles.colHeader}>لینک‌ها</Header>
            <Menu items={colItems[2]} text vertical inverted />
          </Grid.Column>
          <Grid.Column width={4}>
            <Header as='h4' style={styles.colHeader}>ارتباط با ما</Header>
            <p>{data.address}</p>
            {data.phones.map(phone => <p key={phone}>{phone}</p>)}
            <a target="_blank noopener noreferrer" href={data.socialMedia.instagram}>
              <Icon name="instagram" size="big" color="red" />
            </a>
            <a target="_blank noopener noreferrer" href={data.socialMedia.telegram}>
              <Icon name="telegram" size="big" color="blue" />
            </a>
            {/* {icons.map(icon =>
              <Icon key={icon} name={icon} size='large' />
            )} */}
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as='h4' style={styles.colHeader}>عضویت در خبرنامه</Header>
            <p>برای دریافت آخرین اخبار و تخفیف ها در سیستم رزرواسیون ایمیل خود را ثبت نمایید.</p>
            <Input placeholder='ایمیل خود را وارد نمایید ...' fluid
              action={{ content: 'ثبت', color: 'violet' }}
            />
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
}

const styles = {
  footerRoot: {
    backgroundColor: '#333',
    color: '#ddd',
    padding: 32,
  },
  colHeader: {
    color: 'violet',
    marginBottom: 16,
  }
};

export default Radium(Footer);