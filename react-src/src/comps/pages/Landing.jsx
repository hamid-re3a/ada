import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {
  Container, Segment,
  Button, Header, Card, Grid, Image,
  Responsive, Divider,
  Visibility,
} from 'semantic-ui-react';

import PropTypes from 'prop-types'
import Template from 'comps/Template';
import Center from 'comps/Center';
import ServiceCard from 'comps/ServiceCard';
import BlogCard from 'comps/BlogCard';
import data from 'data';


// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}


/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  render() {
    const { children } = this.props

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
        >
          <Hero />
          <ResponsiveProps itemsPerRow={3}>
            {children}
          </ResponsiveProps>
        </Visibility>
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class ResponsiveProps extends React.Component {
  render() {

    const childrenWithExtraProp = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        itemsPerRow: this.props.itemsPerRow
      });
    });

    return (
      <div>
        {childrenWithExtraProp}
      </div>
    );
  }
}
class MobileContainer extends Component {

  render() {
    const { children } = this.props

    return (
      <Responsive
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Hero mobile />
        <ResponsiveProps itemsPerRow={1}>
          {children}
        </ResponsiveProps>
      </Responsive>
    )
  }
}
MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}
const Hero = ({ mobile }) => (
  <div style={!mobile ? styles.heroRoot : styles.heroRootMobile}>
    <Center >
      <Header as='h1' style={{ color: 'white', textShadow: '0 0 3px black' }}>رزرو ماساژ</Header>
      <Header as='h3' style={{ color: 'white', textShadow: '0 0 3px black' }}>خدمات حرفه‌ای ماساژ در Adak Spa تجربه کنید</Header>
      <div style={{ height: 32 }} />
      <Link to='/reserve'><Button color="violet">رزرو</Button></Link>
      <Link to='/services'><Button >مشاهده خدمات</Button></Link>
    </Center>
  </div>
);

Hero.propTypes = {
  mobile: PropTypes.bool,
}
const Options = () => (

  <Segment basic style={{ padding: '8em 0em 4em' }} vertical>
    <Grid container stackable verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as='h3' style={{ fontSize: '2em' }}>
           Adak Spa
          </Header>
          <p style={{ fontSize: '1.33em', textAlign: 'justify' }}>
          اینجا جایگاهی است که میتوان به خویشتن احترام گذاشت . در شلوغی و روزمرگی های طولانی و خسته کننده زندگی شهری امروز یکی از گزینه های رفع خستگی و آرامش ماساژ می باشد . 

          </p>
          <p style={{ fontSize: '1.33em', textAlign: 'justify' }}>
          امید به اینکه بتوانیم خدمتی شایسته به شما عزیزان ارائه دهیم
          </p>
        </Grid.Column>
        <Grid.Column floated='right' width={6}>
          <Image bordered rounded size='large' src='/img/oil.jpg' />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Button size='huge'>همین حالا ببینید</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

const ResponsiveServiceItems = ({ itemsPerRow }) => (
  <Container style={styles.bodyRoot} >
    <Header as='h1'>انواع ماساژ</Header>
    <div className="ui divider"></div>
    <Segment basic>
      <Card.Group itemsPerRow={itemsPerRow}>
        <ServiceCard key={data.services[0].name} {...data.services[0]} />
        <ServiceCard key={data.services[1].name} {...data.services[1]} />
        <ServiceCard key={data.services[2].name} {...data.services[2]} />
      </Card.Group>
      <div className='center' style={{ margin: 32 }}>
        <Button as={Link} to='/services' size="huge">مشاهده همه‌</Button>
      </div>
    </Segment>
  </Container>
);

function Landing() {
  return (
    <Template gray={false}>
      <ResponsiveContainer>

        <Options />

        <ResponsiveServiceItems />


        <Segment style={{ padding: '0em' }}>
          <Grid celled='internally' columns='equal' >
            <Grid.Row textAlign='center'>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Adak Spa
                </Header>
                <p style={{ fontSize: '1.33em' }}>تجربه‌ منحصر به فرد آرامش</p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  با مدیریت محترم
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  {/* <Image avatar src='/images/avatar/large/nan.jpg' /> */}
                  {data.manager}
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Container style={styles.bodyRoot}>
          <Header as='h1'>آخرین آموزش ها</Header>
          <Divider />
          <Segment basic>
            {data.articles.map(s =>
              <BlogCard key={s.id} {...s} />
            )}
          </Segment>
          <div className='center' style={{ margin: 32 }}>
            <Button as={Link} to='/blog' size="huge">مشاهده همه‌ی آموزش‌ها</Button>
          </div>
        </Container>

      </ResponsiveContainer>
    </Template>
  );
}

const styles = {
  heroRoot: {
    backgroundColor: '#e0e0e0',
    backgroundImage: `url('/img/lobby2.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: "center",
    backgroundPositionY: -128,
    backgroundRepeat: "no-repeat",
    boxShadow: "inset 0px 0px 200px 140px rgba(0, 0, 0, .99)",
    height: 500,
  },
  heroRootMobile: {
    backgroundColor: '#e0e0e0',
    backgroundImage: `url('/img/building.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    boxShadow: "inset 0px 0px 200px 50px rgba(0, 0, 0, .99)",
    height: 300,
  },
  bodyRoot: {
    padding: 64,
  }
};

export default Landing;