import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { connect } from 'react-redux';

import Landing from 'comps/pages/Landing';
import Services from 'comps/pages/Services';
import Courses from 'comps/pages/Courses';
import Reserve from 'comps/pages/Reserve';
import Track from 'comps/pages/Track';
import Gallery from 'comps/pages/Gallery';
import Blog from 'comps/pages/Blog';
import BlogPost from 'comps/pages/BlogPost';
import About from 'comps/pages/About';
import Contact from 'comps/pages/Contact';
import NotFound from 'comps/pages/NotFound';


// const mapStateToProps = state => ({
//   isAuthenticated: !!state.user.accessToken,
// });

// const AuthRoute = connect(mapStateToProps)(({ isAuthenticated, ...otherProps }) =>
//   isAuthenticated
//     ? <Route {...otherProps} />
//     : <Redirect to="/login" />
// );

// const UnAuthRoute = connect(mapStateToProps)(({ isAuthenticated, ...otherProps }) =>
//   isAuthenticated
//     ? <Redirect to="/" />
//     : <Route {...otherProps} />
// );

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/services" component={Services} />
        <Route exact path="/courses" component={Courses} />
        <Route exact path="/reserve" component={Reserve} />
        <Route exact path="/track" component={Track} />
        <Route exact path="/gallery" component={Gallery} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/blog/:id" component={BlogPost} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
