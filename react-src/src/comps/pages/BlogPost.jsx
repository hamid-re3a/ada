import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Header, Image, Button, Icon } from 'semantic-ui-react';

import Template from 'comps/Template';
import data from 'data';


function BlogPost({ match }) {
  let articles = data.articles.filter(item => item.id === match.params.id);
  let article = articles[0];
  return (
    <Template gray={false}>
      <Container style={styles.bodyRoot}>
        <Segment raised style={{ padding: 32 }}>
          <div style={{ marginBottom: 32 }}>
            <span style={{ display: 'inline-block' }}>
              <Header as="h1">{article.title}</Header>
              <Header.Subheader>
                نوشته شده در تاریخ
                {article.date}
              </Header.Subheader>
            </span>
            <span style={{ display: 'inline-block', float: 'left' }}>
              <Image rounded bordered src={article.image}
                style={styles.img} />
            </span>
          </div>
          <div style={{ lineHeight: '2em' }} dangerouslySetInnerHTML={{ __html: article.content }}>

          </div>
          <Button as={Link} to='/blog' color='facebook'  > بازگشت <Icon name='chevron left' style={{ marginRight: 5 }} /></Button>
        </Segment>
      </Container>
    </Template>
  );
}

const styles = {
  bodyRoot: {
    padding: 32,
  },
  img: {
    height: 256,
    margin: 10
  },
};

export default BlogPost;