
import React from 'react'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFtaWQtcmUzYSIsImEiOiJjazA0cnZxODcwZGtlM2Nxb3NvaWhhNnZlIn0.TK9oyzpRiAO27QrdCnsaow';

export default class Map extends React.Component {
    marker;
    map;

    // componentWillReceiveProps() {
    //     const { lat, long } = this.props;
    //     let center;
    //     if (lat === undefined && long === undefined)
    //         center = [51.3818433, 35.724425];
    //     else
    //         center = [long, lat];
    //     this.marker
    //         .setLngLat(center);
    //     this.map.setCenter(center);
    // }

    componentDidMount() {
        const { lat, long } = this.props;
        let center = [long, lat];
        if (lat === undefined && long === undefined)
            center = [51.3126106, 35.7079010];

        // Container to put React generated content in.
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v9',
            center,
            zoom: 19,
        });

        // this.map.on('click', (e) => {
        //     this.props.onChange(e.lngLat);
        //     this.marker.setLngLat(e.lngLat);
        // });

        // create DOM element for the marker
        var el = document.createElement('div');
        el.id = 'marker';
        el.style = `background-image: url('/img/home.png');
            background-size: cover;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;`;
        // create the marker
        this.marker = new mapboxgl.Marker(el)
            .setLngLat(center)
            .addTo(this.map);
    }

    render() {
        // if (!!this.props.lat && !!this.props.long && !!this.marker) {

        //     const { lat, long } = this.props;
        //     let center;
        //     if (lat === undefined && long === undefined)
        //         center = [51.3818433, 35.724425];
        //     else
        //         center = [long, lat];
        //     this.marker
        //         .setLngLat(center);
        //     this.map.setCenter(center);
        // }
        return (
            <div ref={el => this.mapContainer = el} style={{ width: '100%', height: '330px' }} />
        );
    }
}

