import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

import Template from 'comps/Template';


export default function NotFound() {
  return (
    <Template>
      <Container>
        <Segment raised>خطای 404 - صفحه‌ی مورد نظر یافت نشد.</Segment>
      </Container>
    </Template>
  );
}