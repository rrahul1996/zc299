import React from 'react';
import axios from 'axios';
import { withRouter} from 'react-router-dom';

class Wallpaper extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurants : [],
            suggestions : [],
            inputText : undefined
        }
    }

    handleDDChange = (event) => {
        const locationId = event.target.value;
        sessionStorage.setItem('locationId', locationId);

        axios({
            method: 'GET',
            url: `http://localhost:8555/restaurants/${locationId}`,
            headers: {'Content-Type' : 'application/json'}
        })
        .then(response => {
            this.setState({ restaurants: response.data.restaurants})
        })
        .catch(err => {console.log(err)})

    }

    selectingRestaurant = (resObj) => {
        this.props.history.push(`/details?restaurant=${resObj._id}`);
    }

    handleSearch = (event) => {
        const inputText = event.target.value;

        const { restaurants } = this.state;

        const suggestions = restaurants.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({ suggestions, inputText });
    }

    showSuggestion = () => {
        const { suggestions, inputText } = this.state;

        if (suggestions.length === 0 && inputText === undefined) {
            return null;
        }
        if (suggestions.length > 0 && inputText === '') {
            return null;
        }
        if (suggestions.length === 0 && inputText) {
            return <ul >
                <li>No Search Results Found</li>
            </ul>
        }
        return (
            <ul >
                {
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectingRestaurant(item)}>{`${item.name} -   ${item.locality},${item.city}`}</li>))
                }
            </ul>
        );
    }

    render() {
        const { locationsData } = this.props;
        return(
            <div>
                <img src="Assets/homepage.png" alt="No found" width="100%" height="400px"/>
                {/*
                <header>
                    <nav className="navbar">
                        <input type="checkbox" id="check"/>
                        <label  className="checkbtn">
                            <i className="fas fa-bars"></i>
                        </label>
                        <ul>
                            <li><a href="#">Login</a></li>
                            <li><a href="#">Creat an account</a></li>
                        </ul>
                    </nav>
                    <section></section>
                </header>
        */}
                <div className="topcontent" style={{textAlign: "center"}}>
                    <div className="logo">
                        <b>e!</b> 
                    </div>
                    <div className="inline">
                        <select className="select" onChange={this.handleDDChange}>
                            <option value="0">Select</option>
                                {
                                        locationsData.map(item => {
                                        return <option value={item.location_id}>{`${item.name} ${item.city}`}</option>
                                    })
                                }
                        </select>
                        <div className="search">
                        {/*
                            <div id="notebooks">
                                <i className="far fa-search"></i>
                                <input id="query" type="text" placeholder="Search Your Restaurants" onChange={this.handleSearch}/> 
                                {this.showSuggestions()}
                            </div> */}
                            <div id="notebooks">
                                <i className="far fa-search"></i>
                                <input id="query" className="restaurantsinput" type="text"
                                    placeholder="Please Enter Restaurant Name" onChange={this.handleSearch} />
                                {this.showSuggestion()}
                            </div>
                        </div>
                    </div>
                </div>           
            </div>
        )
    }
}

export default withRouter(Wallpaper);