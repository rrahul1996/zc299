import React from "react";
import { withRouter } from 'react-router-dom';

class QuickSearchItem extends React.Component {

    handleNavigate = (MealTypeId) => {
        const locationId = sessionStorage.getItem('locationId');
        if(locationId) {
            this.props.history.push(`./filter?mealtype=${MealTypeId}&location=${locationId}`);
        }
        else{
            this.props.history.push(`./filter?mealtype=${MealTypeId}`);
        }
    } 

    render () {
        const { qsdata } = this.props;
        return (
            <div className="col-lg-4 col-md-6 col-sm-12 bd" onClick={() => this.handleNavigate(qsdata.meal_type)}>
                <div className="item">
                    <div className="col-6">
                        <img src={`./${qsdata.image}`} height="160px" width="100%" alt="No found"/>
                    </div>
                    <div className="col-6 pd">
                        <div className="item-heading">{qsdata.name}</div>
                        <div className="item-sub-heading">{qsdata.content}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(QuickSearchItem);