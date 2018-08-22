import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './Shipping.css';
import { createUser } from '../../actions';
import {connect} from 'react-redux';
import { Row, Col } from 'reactstrap';
import { countries, regions } from '../Models/CountriesAndRegions';

const contactIntro = 'Welcome to the club, where can we ship your shirts to? You can always provide this information at checkout';

class Shipping extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            address1: '',
            address2: '',
            phone: '',
            city: '',
            country: '',
            province: '',
            zip: '',
            email: '',
            password: ''
        };
    }

    // componentWillMount() {
    //     this.setState({
    //         email: this.props.signUpdata.email,
    //         password: this.props.signUpdata.password
    //     });
    // }

    componentWillReceiveProps(nextProps) {
        this.setState({
            email: nextProps.signUpdata.email,
            password: nextProps.signUpdata.password
        });
    }
    shippingInfoSubmit = e => {
        e.preventDefault()
        console.log('shipping state' + this.state);
        // this.setState({
        //     email: this.props.signUpdata.email,
        //     password: this.props.signUpdata.password
        // })
        // let user = User.getUser();
        // user.storeValue(this.state);
        this.props.createUser(this.state);
		this.props.history.push('/catalog');
    }
    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }

    render() {
        let regionsForSelectedCountry = regions[this.state.country];
        
        return (
            <div>
                <h2>Awesome!</h2>
                <p>{contactIntro}</p>
                <form onSubmit={this.shippingInfoSubmit.bind(this)}>
                    <Row className="row-item">
                        <Col className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                        </Col>
                    </Row>
                    <Row className="row-item">
                        <Col className="form-group">
                            <label htmlFor="address1">Address 1</label>
                            <input type="text" name="address1" className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                        </Col>
                        <Col className="form-group">
                            <label htmlFor="address2">Address 2</label>
                            <input type="text" name="address2" className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                        </Col>
                    </Row>
                    <Row className="row-item">
                        <Col className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" name="phone" className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                        </Col>
                        <Col className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" name="city" className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                        </Col>
                    </Row>
                    <Row className="row-item">
                        <Col className="form-group shipping-col" xs="6">
                            <label htmlFor="country">Country</label>
                            <br />
                            <select name="country" className="form-control form-control-sm" value={this.state[this.id]} onChange={this.handleInputChange.bind(this)} id="country">
                                <option value="">Select</option>
                                {countries.map(country => (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </Col>
                        <Col className="form-group shipping-col" xs="3">
                            <label htmlFor="province">Province</label>
                            <br />
                            <select name="province" className="form-control form-control-sm" value={this.state[this.id]}onChange={this.handleInputChange.bind(this)} id="region">
                                <option value="">Select</option>
                                {regionsForSelectedCountry && regionsForSelectedCountry.length > 0
                                    ? regionsForSelectedCountry.map(region => (
                                        <option key={region} value={region}>
                                            {region}
                                        </option>
                                    ))
                                    : null}
                            </select>
                        </Col>
                        <Col className="form-group shipping-col" xs="3">
                            <label htmlFor="zip">Postal Code</label>
                            <input name="zip" type="text" className="form-control form-control-sm" onChange={this.handleInputChange.bind(this)}/>
                        </Col>
                    </Row>
                    <div>
                        <Link to="/catalog">
                            <button type="button" className="primary-btn float-left">DO THIS LATER</button>
                        </Link>

                        <button type="submit" className="primary-btn float-right">SAVE</button>
                    </div>
                </form>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.user.user
    }
}


export default connect(mapStateToProps, {createUser})(withRouter(Shipping));