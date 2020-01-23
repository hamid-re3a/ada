import React, {Component} from "react";
import Footer from "comps/Footer";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Container, Icon, Menu, Responsive, Segment, Sidebar, Visibility} from "semantic-ui-react";
import Auth from "comps/Auth";


// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

const items = [
  { key: 'home', name: 'صفحه اصلی', href: '/' },
  { key: 'services', name: 'خدمات', href: '/services' },
  { key: 'courses', name: 'دوره‌های آموزشی', href: '/courses' },
  { key: 'reserve', name: 'رزرو', href: '/reserve' },
  { key: 'track', name: 'جدول رزروها', href: '/track' },
  { key: 'gallery', name: 'گالری', href: '/gallery' },
  { key: 'blog', name: 'بلاگ', href: '/blog' },
  { key: 'about', name: 'درباره ما', href: '/about' },
  { key: 'contact', name: 'تماس با ما', href: '/contact' },
];


class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {

    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            // style={{ height: 100 }}
            style={{ padding: 0 }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                {items.map((item,index) => {
                  if (window.location.pathname.split('/')[1] === item.href.split('/')[1])
                    return <Link key={index} to={item.href}><Menu.Item {...item} active /></Link>
                  return <Link key={index} to={item.href}><Menu.Item {...item} /></Link>
                })}
                <Menu.Item position='right'>
                  {/* <Button as='a' inverted={!fixed} color="violet" style={{ marginLeft: '0.5em' }}>
                    ورود
                  </Button>
                  <Button as='a' inverted={!fixed}>
                    عضویت
                  </Button> */}
                  <Auth isAuthenticated={true} inverted={!fixed} />
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state
    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          {items.map((item,index) => {
                  if (window.location.pathname.split('/')[1] === item.href.split('/')[1])
                    return <Link key={index} to={item.href}><Menu.Item {...item} active /></Link>
                  return <Link key={index} to={item.href}><Menu.Item {...item} /></Link>
                })}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            // style={{ height: 100 }}
            style={{ padding: 0 }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  {/* <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                    ورود
                  </Button>
                  <Button as='a' inverted>
                    عضویت
                  </Button> */}
                  <Auth isAuthenticated={false} inverted={true} />
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>

          {children}
        </Sidebar.Pusher>
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

function Template({ children, gray = true }) {
  return (
    <ResponsiveContainer>
      <div style={styles.root(gray)}>
        {children}
        <div style={styles.footerContainer}>
          <Footer />
        </div>
      </div>
    </ResponsiveContainer>
  );
}

const styles = {
  root: gray => ({
    backgroundColor: gray ? '#e0e0e0' : 'white',
    minHeight: '100vh',
  }),
  footerContainer: {
    // position: 'absolute',
    // bottom: 0,
  },
};

export default Template;
