import React, { Component } from 'react'
import {
  Container, Segment,
  Card, Divider, Header,
  Responsive,
  Visibility,
} from 'semantic-ui-react';

import PropTypes from 'prop-types'
import Template from 'comps/Template';
import GalleryCard from 'comps/GalleryCard';
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
        <ResponsiveProps itemsPerRow={2}>
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
const ResponsiveServiceItems = ({ itemsPerRow , title, data_collection }) => (
  <Container>
  <Segment basic>

    <br />
    <Header as='h1'>{title}</Header>
    <Divider />
    <br />
    <br />

    <Card.Group itemsPerRow={itemsPerRow}>
      {data_collection.map(s =>
        <GalleryCard key={s.name} {...s} />
      )}
    </Card.Group>
  </Segment>
</Container>
);
function Gallery() {
  return (
    <Template gray={false}>
      <ResponsiveContainer>
        <ResponsiveServiceItems title="گالری" data_collection={data.images}/>
      </ResponsiveContainer>
    </Template>
  );
}


export default Gallery;