import React from 'react';
import {
  Container, Segment, Header, Image, Icon, Grid,
} from 'semantic-ui-react';
import Template from 'comps/Template';
import data from 'data';
import Map from 'comps/Map'
class Contact extends React.Component {
  state = {
    viewport: {
      latitude: 35.707635,
      longitude:  51.312707,
      zoom: 15.5,
      bearing: 0,
      pitch: 0
    },
    settings: {
      invertZoom: false,
      invertPan: false,
      longPress: false
    }
  };

  _onViewportChange = viewport => this.setState({viewport});

  _onSettingsChange = (name, value) => {
    this.setState({
      settings: {...this.state.settings, [name]: value}
    });
  };

  render(){
    const {viewport, settings} = this.state;
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
                  <Icon name="instagram" size="big" color="red" />
                </a>
                <a target="_blank noopener noreferrer" href={data.socialMedia.telegram}>
                  <Icon name="telegram" size="big" color="blue" />
                </a>
                <a target="_blank noopener noreferrer" href={data.socialMedia.facebook}>
                  <Icon name="facebook" size="big" color="facebook" />
                </a>
                <a target="_blank noopener noreferrer" href={data.socialMedia.twitter}>
                  <Icon name="twitter" size="big" color="twitter" />
                </a>
                <div style={{ clear: 'both' }}></div>
                <Header>
                  نقشه 
                </Header>
                <div style={{minHeight: '330px', overflow: 'hidden', direction: 'ltr'}}>
                <Map></Map>

                </div>
                {/* <a href="https://www.google.com/maps/@35.7079122,51.3118286,16.96z">

                <Image bordered rounded style={{margin : "10px 0"}} size='huge' src='/img/map/map.png' />
                </a> */}
              </Grid.Column>
            </Grid>
  
          </Segment>
        </Container>
      </Template>
    );
  }
  
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