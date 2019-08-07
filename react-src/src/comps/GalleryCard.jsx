import React from "react";
import {Card, Image} from "semantic-ui-react";


function CourseCard({ id, name, description, duration, cost, img="/img/candles5.jpg", height=140 }) {
  return (
    <Card>
      <div style={{ paddingTop: '100%', position: 'relative' }}>
        <Image src={img} style={{ objectFit: 'cover', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, height: '100%', width: '100%' }} />
      </div>
    </Card>
  );
}

export default CourseCard;