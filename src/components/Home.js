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
            url: 'http://localhost:8555/locations',
            headers: {'Content-Type' : 'application/json'}
        })
        .then(response => {
            this.setState({ locations: response.data.locations})
        })
        .catch(err => {console.log(err)})

        axios({
            method: 'GET',
            url: 'http://localhost:8555/mealtypes',
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