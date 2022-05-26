import React from "react";
import '../style/home.css';
import axios from "axios";

// Child Component
import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';

class Home extends React.Component{
    constructor() {
        super();
        this.state = {
            locations: [],
            mealtypes: []
        }
    }

    componentDidMount () {
        sessionStorage.clear();
        axios({
            method: 'GET',
            url: 'https://gentle-ridge-33068.herokuapp.com/locations',
            headers: {'Content-Type' : 'application/json'}
        })
        .then(response => {
            this.setState({ locations: response.data.locations})
        })
        .catch(err => {console.log(err)})

        axios({
            method: 'GET',
            url: 'https://gentle-ridge-33068.herokuapp.com/mealtypes',
            headers: {'Content-Type' : 'application/json'}
        })
        .then(response => {
            this.setState({ mealtypes: response.data.mealTypes})
        })
        .catch(err => {console.log(err)})
    }

    render() {
        const { locations, mealtypes } = this.state;
        return (
            <div>          
                <Wallpaper locationsData ={ locations }/>
                <QuickSearch mealtypesData = { mealtypes }/>
            </div>
        )
    }
}

export default Home;