import React, { Component } from 'react'
import {
  Container, Segment,
  Card, Divider, Header,
  Responsive,
  Visibility,
} from 'semantic-ui-react';

import PropTypes from 'prop-types'
import Template from 'comps/Template';
import ServiceCard from 'comps/ServiceCard';
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
          <ResponsiveProps items_per_row={5}>
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
        items_per_row: this.props.items_per_row
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
        <ResponsiveProps items_per_row={2}>
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
const ResponsiveServiceItems = ({ items_per_row , title ,subtitle , data_collection }) => (
  <Container>
  <Segment basic>

    <br />
    <Header as='h2'>{title}</Header>
    {subtitle ? <Header as='h3' style={{lineHeight:'.5em'}}>({subtitle})</Header> : null }
    <Divider />
    <br />
    <br />

    <Card.Group items_per_row={items_per_row}>
      {data_collection.map(s =>
        <ServiceCard key={s.name} {...s} />
      )}
    </Card.Group>
  </Segment>
</Container>
);
function Services() {
  return (
    <Template gray={false}>
      <ResponsiveContainer>
        <ResponsiveServiceItems title="خدمات مرکز ماساژ Adak Spa" data_collection={data.services}/>
        <ResponsiveServiceItems title="شعبه استخر Adak" subtitle="استخر پاس قوامین" data_collection={data.poolServices}/>
      </ResponsiveContainer>
    </Template>
  );
}

const styles = {
  heroRoot: {
    backgroundColor: '#eee',
    height: 400,
  },
};

export default Services;