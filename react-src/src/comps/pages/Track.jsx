import React from 'react';
import {
  Container, Segment, Header,
  Item, Card,
  Icon, Grid,
  Divider,
} from 'semantic-ui-react';

import Template from 'comps/Template';
// import { faDigit } from 'utils';


const reserves = [
  {
    id: 1, trackNumber: '123456', fName: 'علی', lName: 'اکبری', gender: 'مرد',
    phone: '12345678', serviceType: 1, date: '1398/04/20', time: '07:00', status: 'waiting'
  },
  {
    id: 2, trackNumber: '654321', fName: 'محمد', lName: 'اصغری', gender: 'مرد',
    phone: '87654321', serviceType: 2, date: '1398/04/21', time: '08:00', status: 'approved'
  },
  {
    id:3, trackNumber: '654321', fName: 'محمد', lName: 'اصغری', gender: 'مرد',
    phone: '87654321', serviceType: 2, date: '1398/04/21', time: '08:00', status: 'canceled'
  },
];


// const reserveHeaders = [
//   "شماره پیگیری",
//   "نام",
//   "نام خانوادگی",
//   "جنسیت",
//   "تلفن",
//   "نوع ماساژ",
//   "تاریخ",
//   "ساعت",
//   "وضعیت",
// ];

// function ReserveRow(reserve, i) {
//   const status = {
//     'waiting': 'در دست بررسی',
//     'approved': 'تأیید شده',
//   }[reserve.status];
//   return {
//     key: reserve.id,
//     cells: [
//       reserve.trackNumber,
//       reserve.fName,
//       reserve.lName,
//       reserve.gender,
//       reserve.phone,
//       reserve.serviceType,
//       reserve.date,
//       reserve.time,
//       {
//         key: 'status',
//         content: status,
//         icon: reserve.status === 'waiting' ? 'attention' : 'checkmark',
//         warning: reserve.status === 'waiting',
//         positive: reserve.status === 'approved'
//       },
//     ],
//   }
// }

function reserveStatus(status) {
  let text = {
    'waiting': 'در دست بررسی',
    'approved': 'تأیید شده',
    'canceled': 'کنسل شده',
  }[status];
  let icon = {
    'waiting': 'wait',
    'approved': 'check',
    'canceled': 'cancel',
  }[status];
  let iconColor = {
    'waiting': 'yellow',
    'approved': 'green',
    'canceled': 'red',
  }[status];
  return <Item.Extra>
    <Icon color={iconColor} name={icon} /> {text}
  </Item.Extra>
}
function Track() {
  return (
    <Template>
      <Container style={styles.bodyRoot}>
        <Segment raised style={styles.formContainer}>
          <div className="center">
            <Header as="h1">رزروهای انجام شده</Header>
          </div>
          <Divider />
          <Item.Group>
            <Grid centered relaxed='very'>
              {reserves.map((item) => <Grid.Column key={item.id} mobile={15} tablet={12} computer={10}>

                <Card centered > 
                  <Card.Content>
                    <Card.Header content={item.fName + " " + item.lName} />
                    <Card.Meta content={item.date + " - " + item.time} />
                    <Card.Description content={reserveStatus(item.status)} />
                  </Card.Content>
                </Card>
              </Grid.Column>
              )}

            </Grid>
          </Item.Group>
          {/* <Table celled
            headerRow={reserveHeaders}
            renderBodyRow={ReserveRow}
            tableData={reserves} /> */}
          {/* <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Image src='/img/meditation.jpg' style={{ display: 'inline', width: 256 }} />
          </div> */}
        </Segment>
      </Container>
    </Template>
  );
}

const styles = {
  bodyRoot: {
    padding: 32,
  },
  formContainer: {
    padding: 32,
  },
};

export default Track;
