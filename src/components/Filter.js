import React from "react";
import '../style/filter.css';
import queryString from 'query-string';
import axios from "axios";

class Filter extends React.Component{

    constructor() {
        super();
        this.state = {
            restaurants: [],
            locations: [],
            mealtype: undefined,
            cuisine: [],
            location: undefined,
            lcost: undefined,
            hcost: undefined,
            sort: 1,
            page: 1,
            pageCount: []
        }
    }

    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { mealtype, location } = qs;
        
        const filterObj = {
            mealtype: Number(mealtype),
            location
        }

        axios({
            method: 'POST',
            url: 'http://localhost:8555/filter',
            headers: {'Content-Type' : 'application/json'},
            data: filterObj
        })
        .then(response => {
            this.setState({ 
                restaurants: response.data.restaurants, 
                mealtype, 
                location,
                pageCount: response.data.pageCount
            })
        })
        .catch(err => {console.log(err)})

        axios({
            method: 'GET',
            url: 'http://localhost:8555/locations',
            headers: {'Content-Type' : 'application/json'}
        })
        .then(response => {
            this.setState({ locations: response.data.locations})
        })
        .catch(err => {console.log(err)})
    }

    handleSortChange = (sort) => {
        const { mealtype, cuisine, location, lcost, hcost, page } = this.state

        const filterObj = {
            mealtype: Number(mealtype),
            cuisine: cuisine && cuisine.length === 0 ? undefined : cuisine, 
            location, 
            lcost, 
            hcost, 
            page,
            sort 
        }
        axios({
            method: 'POST',
            url: 'http://localhost:8555/filter',
            headers: {'Content-Type' : 'application/json'},
            data: filterObj
        })
        .then(response => {
            this.setState({ restaurants: response.data.restaurants, sort, pageCount: response.data.pageCount})
            
        })
        .catch(err => {console.log(err)})
    }

    handleCostChange = (lcost, hcost) => {
        const { mealtype, cuisine, location, sort, page } = this.state

        const filterObj = {
            mealtype: Number(mealtype),
            cuisine: cuisine && cuisine.length === 0 ? undefined : cuisine, 
            location, 
            lcost, 
            hcost, 
            page,
            sort 
        }
        axios({
            method: 'POST',
            url: 'http://localhost:8555/filter',
            headers: {'Content-Type' : 'application/json'},
            data: filterObj
        })
        .then(response => {
            this.setState({ restaurants: response.data.restaurants, lcost, hcost, pageCount: response.data.pageCount})
        })
        .catch(err => {console.log(err)})
    }

    handleLocationChange = (event) => {
        const location = event.target.value;
        const { mealtype, cuisine, lcost, hcost, sort, page } = this.state

        const filterObj = {
            mealtype: Number(mealtype),
            cuisine: cuisine && cuisine.length === 0 ? undefined : cuisine, 
            location, 
            lcost, 
            hcost, 
            page,
            sort 
        }
        axios({
            method: 'POST',
            url: 'http://localhost:8555/filter',
            headers: {'Content-Type' : 'application/json'},
            data: filterObj
        })
        .then(response => {
            this.setState({ restaurants: response.data.restaurants, location, pageCount: response.data.pageCount})
        })
        .catch(err => {console.log(err)})

        this.props.history.push(`./filter?mealtype=${mealtype}&location=${location}`);
    }

    handleCuisineChange = (cuisineId) => {
        const { mealtype, cuisine, location, lcost, hcost, sort, page } = this.state

        const index = cuisine.indexOf(cuisineId);

        if (index >= 0) {
            cuisine.splice(index, 1);
        } else {
            cuisine.push(cuisineId);
        }

        const filterObj = {
            mealtype: Number(mealtype),
            cuisine: cuisine && cuisine.length === 0 ? undefined : cuisine, 
            location, 
            lcost, 
            hcost, 
            page,
            sort 
        }
        axios({
            method: 'POST',
            url: 'http://localhost:8555/filter',
            headers: {'Content-Type' : 'application/json'},
            data: filterObj
        })
        .then(response => {
            this.setState({ restaurants: response.data.restaurants, cuisine, pageCount: response.data.pageCount })
        })
        .catch(err => {console.log(err)})
    }

    handlePageChange = (page) => {

        const { mealtype, cuisine, location, lcost, hcost, sort } = this.state;

        const filterObj = {
            mealtype: Number(mealtype),
            cuisine: cuisine && cuisine.length === 0 ? undefined : cuisine,
            location,
            lcost,
            hcost,
            page,
            sort
        }

        axios({
            method: 'POST',
            url: 'http://localhost:8555/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, page, pageCount: response.data.pageCount },()=>{
                    console.log("this.state.restaurants", response.data)
                })
            })
            .catch(err => console.log(err));
    }

    handleNavigate = (resId) => {
        this.props.history.push(`/details?restaurant=${resId}`);
    }

    render() {
        const { restaurants, locations, pageCount} = this.state
        return (
            <div>
                <div className="breakfast">
                    Breakfast Places in Mumbai
                </div>
                <div className="padding-left">
                {/* Left Hands Side */}  
                    <div className="small">
                        
                        <div className="Rectangle">
                            <div className="filterhead">
                                <span className="Filters">
                                    Filters
                                </span>
                                <div className="icon">
                                    <span className="fas fa-angle-double-down" data-bs-toggle="collapse" data-bs-target="#collapseExample" 
                                    aria-expanded="false"></span>
                                </div>
                            </div>    
                            <div className="collapse filterclass dpl" id="collapseExample">
                                <div className="Location">
                                    Select Location
                                </div>
                                <select className="Rectangle2" onChange={this.handleLocationChange}>
                                    <option value={0}>Select Location</option>
                                    {
                                        locations.map(item => {
                                        return <option value={item.location_id}>{`${item.name} ${item.city}`}</option>
                                    })
                                }
                                </select>
                                            
                                {/* CHECKBOX */}  
                                            
                                <div className="cuisine">Cuisine</div>
                                <div className="margin-top">
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleCuisineChange(1)}/>
                                        <span className="Checkbox1">North Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleCuisineChange(2)}/>
                                        <span className="Checkbox1">South Indian</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleCuisineChange(3)}/>
                                        <span className="Checkbox1">Chineese</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleCuisineChange(4)}/>
                                        <span className="Checkbox1">Fast Food</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleCuisineChange(5)}/>
                                        <span className="Checkbox1">Street Food</span>
                                    </div>
                                </div>
                                    {/* COST FOR TWO */}
                                
                                    <div className="cuisine">Cost For Two</div>
                                <div className="margin-top">    
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1, 500)}/>
                                        <span className="Checkbox1">Less than &#8377; 500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(500, 1000)}/>
                                        <span className="Checkbox1">&#8377; 500 to &#8377; 1000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1000, 1500)}/>
                                        <span className="Checkbox1">&#8377; 1000 to &#8377; 1500</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(1500, 2000)}/>
                                        <span className="Checkbox1">&#8377; 1500 to &#8377; 2000</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCostChange(2000, 50000)}/>
                                        <span className="Checkbox1">&#8377; 2000 +</span>
                                    </div>
                                </div>
                                    {/* SORT*/}
                                <div className="cuisine">Sort</div>
                                <div className="margin-top">
                                    <div>
                                        <input type="radio" name="sort" onChange={() => this.handleSortChange(1)}/>
                                        <span className="Checkbox1">Price low to high</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="sort" onChange={() => this.handleSortChange(-1)}/>
                                        <span className="Checkbox1">Price high to low</span>
                                    </div>
                                </div>  
                            </div>  
                        </div>
                    </div>
                    {/* Right Hand Side Block*/}

                    <div className="big verticle">
                    {   restaurants && restaurants.length > 0 ?
                        restaurants.map(item => {
                                return <div className="Item" onClick={() => this.handleNavigate(item._id)}>
                                <div>
                                    <div className="small-item vertical">
                                        <img src={`./${item.image}`} alt="No found" width="100%" height="100%"/>
                                    </div>
                                    <div className="big-item">
                                        <div className="rest-name">{item.name}</div>
                                        <div className="rest-location">{item.locality}</div>
                                        <div className="rest-address">{item.city}</div>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <div className="margin-left">
                                        <div className="Bakery">
                                            <table>
                                                <tr>
                                                    <th>CUISINES</th>
                                                    <th>: { item.cuisine.map(cuisine => `${cuisine.name} `) }</th>
                                                </tr>
                                                <tr>
                                                    <th>COST FOR TWO</th>
                                                    <th>: {item.min_price}</th>
                                                </tr>
                                            </table>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        })
                    : <div className="no-records">
                    No Records Found
                    </div>}

                        {/* Bottom pagination */}
                            {
                                restaurants && restaurants.length > 0 ? <div className="pagination">
                                    <span className='page-number'>&laquo;</span>
                                    {pageCount.map(item => {
                                        return <span className='page-number' onClick={() => this.handlePageChange(item)}>{item}</span>
                                    })}
                                    <span className='page-number'>&raquo;</span>
                                </div> : null
                            }
                    </div>
                </div>
            </div>
        )
    }
}

export default Filter;