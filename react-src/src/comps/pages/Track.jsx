import React from 'react';
import {
  Container, Segment, Header,
  Item, Button,
  Icon, Grid,
  Divider,
} from 'semantic-ui-react';
import moment from 'jalali-moment'
import { connect } from 'react-redux';
import Template from 'comps/Template';
import { faDigit } from 'utils';


function Track({ isAuthenticated }) {
  return (
    <Template>
      <Container style={styles.bodyRoot}>
        <Segment raised style={styles.formContainer}>

          {isAuthenticated
            ? <ReserveChart />
            : <React.Fragment>
              <div className="center" >
                <Header as="h1">ابتدا وارد سایت شوید</Header>
              </div>
            </React.Fragment>
          }

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

const womenTimes = [
  { key: 0, text: "9 - 10" },
  { key: 1, text: "10 - 11" },
  { key: 2, text: "11 - 12" },
  { key: 3, text: "12 - 13" },
  { key: 4, text: "13 - 14" },
]

const menTimes = [
  { key: 5, text: "14 - 15" },
  { key: 6, text: "15 - 16" },
  { key: 7, text: "16 - 17" },
  { key: 8, text: "17 - 18" },
  { key: 9, text: "19 - 20" },
  { key: 9, text: "20 - 21" },
  { key: 9, text: "21 - 22" },
]
const timeCell = (gender) => {
  let dt = womenTimes;
  if(gender)
    dt = menTimes;
  return <React.Fragment>
    {dt.map((item, i) =>
      <Segment key={i} color="olive" textAlign='center'>{faDigit(item.text)}</Segment>
    )}
  </React.Fragment>

}

const reserveCell = (gender , status , date) => {
  let dt = womenTimes;
  if(gender)
    dt = menTimes;
  return <React.Fragment>
    {dt.map((item, i) =>
      <Segment  key={i} color="olive" textAlign='center'><Button>رزرو</Button></Segment>
    )}
  </React.Fragment>
}
const ReserveChart = () => {
  return <React.Fragment>
    <div className="center" >
      <Header as="h1">جدول رزروها</Header>
    </div>
    <Divider />
    <Item.Group>
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={3}>
          <Segment textAlign='center'>ساعت</Segment>
          {timeCell(0)}
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={4}>
          <Segment textAlign='center'>امروز</Segment>
          {reserveCell()}
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={3}>
          <Segment textAlign='center'>{faDigit(moment().add(1, 'day').locale('fa').format('dddd Do'))}</Segment>
        </Grid.Column>

        <Grid.Column mobile={16} tablet={8} computer={3}>
          <Segment textAlign='center'>{faDigit(moment().add(2, 'day').locale('fa').format('dddd Do'))}</Segment>
        </Grid.Column>

        <Grid.Column mobile={16} tablet={8} computer={3}>
          <Segment textAlign='center'>{faDigit(moment().add(3, 'day').locale('fa').format('dddd Do'))}</Segment>
        </Grid.Column>
      </Grid>
    </Item.Group>
  </React.Fragment>
};
const styles = {
  bodyRoot: {
    padding: 32,
  },
  formContainer: {
    padding: 32,
  },
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.accessToken,
});

export default connect(mapStateToProps, null)(Track);