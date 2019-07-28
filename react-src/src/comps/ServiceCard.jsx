import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Image } from 'semantic-ui-react';

import { faDigit } from 'utils';


function ServiceCard({ id, name, description,
duration, cost, img="/img/candles5.jpg" }) {
  return (
    <Card>
      <div style={{ paddingTop: '100%', position: 'relative' }}>
        <Image src={img} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, height: '100%', width: '100%' }} />
      </div>
      <Card.Content style={{ textAlign: 'center' }}>
        <Card.Header>{name}</Card.Header>
        <Card.Description>{!!description ? description : " - "}</Card.Description>
        <Card.Content style={{ padding: 16 }}>{!!duration ? faDigit(duration) + " دقیقه " : " - "} </Card.Content>
        <Card.Content>{faDigit(cost)} تومان</Card.Content>
        <div style={{ height: 16 }} />
        <Card.Content extra>
          <Button color="violet" fluid as={Link} to={`/reserve?type=${id}`}>رزرو</Button>
        </Card.Content>
      </Card.Content>
    </Card>
  );
}

const styles = {
  imgFiller: {
    height: 256,
    backgroundColor: '#321',
  },
};

export default ServiceCard;