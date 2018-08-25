import React, { Component } from 'react';
import axios from "axios/index";
import { Card, Image, Icon, Menu, Segment, Loader } from 'semantic-ui-react';
import { isEmpty } from 'lodash';
import "./HomePages.css"
import DoctorInfo from "../DoctorInfo/DoctorInfo";
import Modal from 'react-modal';

class HomePage extends Component {
    constructor(){
        super();

        this.getLocation =  this.getLocation.bind(this);
        this.getLocalDoctorsList = this.getLocalDoctorsList.bind(this);
        this.getDoctorsList =  this.getDoctorsList.bind(this);
        this.showDoctorInfo = this.showDoctorInfo.bind(this);

        this.state={
            currentLat:'',
            currentLong:'',
            doctorData: {},
            activeMenuItem:'Home',
            showDoctorInfo: false
        }
    }
    componentDidMount(){
        this.getLocation();
    }

    handleItemClick = (e, { name }) => this.setState({ activeMenuItem: name })

    getLocalDoctorsList(){
        const { currentLat, currentLong } =this.state;
        let appKey = 'e1690709201434be88ec8dbc8adc6262';
        axios.get('https://api.betterdoctor.com/2016-03-01/doctors?location='+currentLat+','+currentLong+',100&skip=2&limit=100&user_key='+appKey)
            .then( (respose)=>{
                console.log(respose);
                this.setState({ doctorData: respose.data });
            })
            .catch( (error) => {
                console.log(error);
            })
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    showPosition(position) {
        console.log(position.coords.latitude + ' ' + position.coords.longitude, ' ', position);
        this.setState({ currentLat:position.coords.latitude, currentLong: position.coords.longitude },
            () => {
                this.getLocalDoctorsList();
            })
    }

    showDoctorInfo() {
    this.setState( { showDoctorInfo: true } );
    }

    getDoctorsList(){
        console.log(this.state.doctorData);
        return this.state.doctorData.data.map( (docData)=>{
            return(
                <Card image={docData.profile.image_url} onClick={ this.showDoctorInfo } />
            )
        })
    }
    render() {
        const { activeMenuItem } = this.state;
        return (
            <div className="App">
                <Segment>
                    <Menu pointing secondary>
                        <Menu.Item name='Home' active={activeMenuItem === 'Home'} onClick={this.handleItemClick} />
                        <Menu.Item
                            name='Search'
                            active={activeMenuItem === 'Search'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='Contact Us'
                            active={activeMenuItem === 'Contact Us'}
                            onClick={this.handleItemClick}
                        />
                    </Menu>
                    <header className="App-header">
                        <h1 className="App-title">Welcome to FinDoc</h1>
                    </header>
                    <div className="App-intro">
                        {isEmpty(this.state.doctorData) &&
                        <Loader active inline='centered'/>
                        }
                        { !isEmpty( this.state.doctorData ) &&
                        <Card.Group itemsPerRow={8}>
                            { this.getDoctorsList() }
                        </Card.Group>
                        }
                    </div>
                </Segment>
                <DoctorInfo
                showDoctorInfo = { this.state.showDoctorInfo }
                />
            </div>
        );
    }
}

export default HomePage;
