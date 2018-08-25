import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import './DoctorInfo.css'
import axios from 'axios/index';
import Modal from 'react-modal';
import { Image, Grid, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const propTypes={
    showDoctorInfo: PropTypes.bool
}

class DoctorInfo extends Component {
    constructor(){
        super();
        this.getDoctorInfo = this.getDoctorInfo.bind(this);
        this.state = {
            doctorInfo: {}
        }
    }
    componentDidMount(){
        this.getDoctorInfo();
    }
    getDoctorInfo(dId){
        let appKey = 'e1690709201434be88ec8dbc8adc6262';
        axios.get('https://api.betterdoctor.com/2016-03-01/doctors/npi/1811951197?user_key='+appKey)
            .then( (respose)=>{
                console.log(respose, 'DOCTOR DESC');
                this.setState({ doctorInfo: respose.data });
            })
            .catch( (error) => {
                console.log(error);
            })
    }
    render() {
        const {
            showDoctorInfo
        } = this.props;
        return (
            <Modal
                isOpen={ showDoctorInfo }
            >
                <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Segment>1</Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>2</Segment>
                    </Grid.Column>
                </Grid.Row>
                </Grid>
            </Modal>
        );
    }
}

export default DoctorInfo;
