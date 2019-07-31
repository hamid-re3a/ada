import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Button,  } from 'semantic-ui-react';


function Navbar({ location }) {
  const items = [
    { key: 'home', name: 'صفحه اصلی', href: '/' },
    { key: 'services', name: 'خدمات', href: '/services' },
    { key: 'reserve', name: 'رزرو', href: '/reserve' },
    { key: 'track', name: 'پیگیری رزرو', href: '/track' },
    { key: 'gallery', name: 'گالری', href: '/gallery' },
    { key: 'blog', name: 'بلاگ', href: '/blog' },
    { key: 'about', name: 'درباره ما', href: '/about' },
    { key: 'contact', name: 'تماس با ما', href: '/contact' },
  ];
  items.map(item => { item.color = 'violet' });
  const filteredItems = items.filter(item => item.href === location.pathname);
  if (filteredItems.length > 0)
    filteredItems[0].active = true;
  return (
    // <Menu items={items} inverted attached stackable size="large" />
    <Container>
      {items.map(item => <Menu.Item {...item} />)}
      <Menu.Item position='right'>
        <Button as='a' inverted={!fixed} color="violet" style={{ marginLeft: '0.5em' }}>
          ورود
        </Button>
        <Button as='a' inverted={!fixed}>
          عضویت
        </Button>
      </Menu.Item>
    </Container>
  );
}

export default withRouter(Navbar);