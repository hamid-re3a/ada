import React from "react";
import {Card, Button, Image} from "semantic-ui-react";
import {faDigit} from "utils";


function CourseCard({ id, name, description, duration, cost, img="/img/candles5.jpg", height=140 }) {
  return (
    <Card>
      <div style={{ paddingTop: '100%', position: 'relative' }}>
        <Image src={img} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, height: '100%', width: '100%',objectFit: 'cover', }} />
      </div>
      <Card.Content style={{ textAlign: 'center' }}>
        <Card.Header>{name}</Card.Header>
        <br/>
        <Card.Content>{faDigit(cost)} تومان</Card.Content>
        <div style={{ height: 16 }} />
        <Card.Content extra>
          <Button color="violet" fluid >ثبت نام</Button>
        </Card.Content>
      </Card.Content>
    </Card>
  );
}


export default CourseCard;