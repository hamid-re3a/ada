import React from "react";
import { Container, Segment, Header, Item, Button, Grid, Divider } from "semantic-ui-react";
import moment, { from } from "jalali-moment";
import { connect } from "react-redux";
import Template from "comps/Template";
import { faDigit } from "utils";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { config } from 'api/index';

class Track extends React.Component {

    state = {
        reserves: []
    }
    componentWillMount() {
        var that = this;
        axios.get(`${config.base_url}/orders/all`)
            .then((rs) => {
                if (rs.status === 200)
                    that.setState({ reserves: rs.data })
            })
    }

    render() {
        const { isAuthenticated } = this.props;
        return (
            <Template>
                <Container style={styles.bodyRoot}>
                    <Segment raised style={styles.formContainer}>
                    <ReserveChart reserves={this.state.reserves} />
                        {/* {isAuthenticated
                            ? <ReserveChart reserves={this.state.reserves} />
                            : <React.Fragment>
                                <div className="center">
                                    <Header as="h1">ابتدا وارد سایت شوید</Header>
                                </div>
                            </React.Fragment>
                        } */}

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
}

const womenTimes = [
    { key: 0, text: "9 - 10", value: "9 - 10" },
    { key: 1, text: "10 - 11", value: "10 - 11" },
    { key: 2, text: "11 - 12", value: "11 - 12" },
    { key: 3, text: "12 - 13", value: "12 - 13" },
    { key: 4, text: "13 - 14", value: "13 - 14" },
]

const menTimes = [
    { key: 5, text: "14 - 15", value: "14 - 15" },
    { key: 6, text: "15 - 16", value: "15 - 16" },
    { key: 7, text: "16 - 17", value: "16 - 17" },
    { key: 8, text: "17 - 18", value: "17 - 18" },
    { key: 9, text: "19 - 20", value: "19 - 20" },
    { key: 10, text: "20 - 21", value: "20 - 21" },
    { key: 11, text: "21 - 22", value: "21 - 22" },
]
const timeCell = (gender) => {
    let dt = womenTimes;
    if (gender)
        dt = menTimes;
    return <React.Fragment>
        <Divider horizontal>خانم ها</Divider>
        {womenTimes.map((item, i) =>
            <Grid.Row key={i} style={{ height: '80px' }}>
                <Segment padded piled vertical color="olive" textAlign='center'
                    style={{}}>{faDigit(item.text)}</Segment>
            </Grid.Row>
        )}
        <Divider horizontal>آقایان</Divider>
        {menTimes.map((item, i) =>
            <Grid.Row key={i} style={{ height: '80px' }}>
                <Segment padded piled vertical color="olive" textAlign='center'
                    style={{}}>{faDigit(item.text)}</Segment>
            </Grid.Row>
        )}
    </React.Fragment>

}
const renderReserveButton = (reserves, item, isItToday, date,gender) => {
    var flag = false;
    var reservedGuy;
    reserves.map(mapItem => {
        if (mapItem.time_slot == item.key) {
            reservedGuy = mapItem;
            flag = true;
        }
    })
    // if (flag) {
    //     return <p>قبلا رزرو شده</p>;
    // }
    
    // console.log(moment.from(date, 'fa', "YYYY-MM-DD").format('ddd'));
    if (isItToday)
        return null;
    if(!gender && (moment.from(date, 'fa', "YYYY-MM-DD").format('ddd') == 'Fri'))
        return null;
    return <Button compact as={Link} to={`/reserve?time_slot=${item.key}&date=${date}`}>رزرو</Button>
}
const reserveCell = (date, reserves) => {

    reserves = reserves.filter((item) => {
        if (moment.from(item.date, 'en', "YYYY-MM-DD H:i:s").isSame(moment.from(date, 'fa', "YYYY-MM-DD")))
            return true;
        return false;
    })

    var isItToday = false;
    if ((moment().locale('fa').format('YYYY/MM/DD')) === date)
        isItToday = true;

    return <React.Fragment>
        <Divider horizontal>خانم ها</Divider>
        {womenTimes.map((item, i) =>
            <Grid.Row key={i} style={{ height: '80px' }}>
                <Segment piled vertical color="olive" textAlign='center'>
                    {renderReserveButton(reserves, item, isItToday, date,false)}

                </Segment>
            </Grid.Row>
        )}

        <Divider horizontal>آقایان</Divider>
        {menTimes.map((item, i) =>
            <Grid.Row key={i} style={{ height: '80px' }}>
                <Segment piled vertical color="olive" textAlign='center'>
                    {renderReserveButton(reserves, item, isItToday, date,true)}
                </Segment>
            </Grid.Row>
        )}
    </React.Fragment>
}
const ReserveChart = ({ reserves }) => {
    return <React.Fragment>
        <div className="center">
            <Header as="h1">جدول رزروها</Header>
        </div>
        <Divider />
        <Item.Group>
            <Grid>
                <Grid.Column mobile={8} tablet={8} computer={3}>
                    <Segment textAlign='center'>ساعت</Segment>
                    {timeCell(0)}
                </Grid.Column>
                <Grid.Column only='tablet computer' tablet={8} computer={4}>
                    <Segment textAlign='center'>امروز</Segment>
                    {reserveCell((moment().locale('fa').format('YYYY/MM/DD')), reserves)}
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={3}>
                    <Segment
                        textAlign='center'>{faDigit(moment().add(1, 'day').locale('fa').format('dddd Do'))}</Segment>
                    {reserveCell((moment().add(1, 'day').locale('fa').format('YYYY/MM/DD')), reserves)}
                </Grid.Column>

                <Grid.Column mobile={8} only="mobile">
                    <Segment textAlign='center'>ساعت</Segment>
                    {timeCell(0)}
                </Grid.Column>
                <Grid.Column only='tablet computer' mobile={8} tablet={8} computer={3}>
                    <Segment
                        textAlign='center'>{faDigit(moment().add(2, 'day').locale('fa').format('dddd Do'))}</Segment>
                    {reserveCell((moment().add(2, 'day').locale('fa').format('YYYY/MM/DD')), reserves)}
                </Grid.Column>

                <Grid.Column mobile={8} only="mobile">
                    <Segment textAlign='center'>ساعت</Segment>
                    {timeCell(0)}
                </Grid.Column>
                <Grid.Column only='tablet computer' mobile={8} tablet={8} computer={3}>
                    <Segment
                        textAlign='center'>{faDigit(moment().add(3, 'day').locale('fa').format('dddd Do'))}</Segment>
                    {reserveCell((moment().add(3, 'day').locale('fa').format('YYYY/MM/DD')), reserves)}
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