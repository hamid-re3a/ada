import React from 'react';
import {
  Container, Segment,Header,Divider
} from 'semantic-ui-react';

import Template from 'comps/Template';
import BlogCard from 'comps/BlogCard';
import data from 'data';


function Blog() {
  return (
    <Template gray={false}>
      <Container>

        <br />
        <Header as='h1'>مقالات</Header>
        <Divider />
        <Segment basic>
          {data.articles.map(s =>
            <BlogCard key={s.id} {...s} />
          )}
        </Segment>
      </Container>
    </Template>
  );
}

export default Blog;