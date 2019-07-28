import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Segment, Icon } from 'semantic-ui-react';

function BlogCard({ id = 1, title, content, image, date }) {
  var contento = unescape(content).replace(/(<([^>]+)>)/ig, "");

  var parser = new DOMParser;
  var dom = parser.parseFromString(
    '<!doctype html><body>' + contento,
    'text/html');
  var decodedString = dom.body.textContent;
  return (
    <Segment>
      <Item.Group divided>
        <Item style={{ position: 'relative' }}>
          <Item.Image bordered src={image} style={styles.img} />
          <Item.Content>
            <Item.Header as='a'>{title}</Item.Header>
            <Item.Meta>
              نوشته شده در تاریخ
                    {date}
            </Item.Meta>
            <Item.Description>
              <p>{decodedString.substring(0, 700)} {decodedString.length > 700 ? " ..." : ""}</p>
            </Item.Description>
            {/*<Button style={{ position: 'absolute', bottom: 0, left: 0 }} as={Link} to={`/blog/${id}`} color='facebook'>*/}
<Button style={{ float: 'left' }} as={Link} to={`/blog/${id}`} color='facebook'>
              ادامه
              </Button>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
}

const styles = {
  imgFiller: {
    height: 128,
    backgroundColor: '#321',
  },
  img: {
    width: 256,
  },
};

export default BlogCard;