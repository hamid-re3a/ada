import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Image,Popup,Rating } from 'semantic-ui-react';

import { faDigit } from 'utils';


function ServiceCard({ id, name, description,
duration, cost, img="/img/candles5.jpg" }) {
  return (
    <Popup trigger={
    <Card>
      <div style={{ paddingTop: '100%', position: 'relative' }}>
        <Image src={img} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, height: '200px', width: '100%',objectFit: 'cover', }} />
      </div>
      <Card.Content style={{ textAlign: 'center' }}>
        <Card.Header>{name}</Card.Header>
     
        {/* <Card.Description>{!!description ? description : " - "}</Card.Description> */}
        <Card.Content style={{ padding: 16 }}>{!!duration ? faDigit(duration) + " دقیقه " : " - "} </Card.Content>
        <Card.Content>{faDigit(cost)} تومان</Card.Content>
        <div style={{ height: 16 }} />
        <Card.Content extra>
          <Button color="violet" fluid as={Link} to={`/reserve?type=${id}`}>رزرو</Button>
        </Card.Content>
      </Card.Content>
    </Card>}
    >
    <Popup.Header>{!!description ? description : " - "}</Popup.Header>
  </Popup>
  );
}


export default ServiceCard;