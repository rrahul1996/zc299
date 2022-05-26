import React from 'react';
import QuickSearchItem from './QuickSearchItem'

class QuickSearch extends React.Component {
    render() {
        const { mealtypesData } = this.props;
        return(
            <div>
                <div className="container">
                    <div className="item-heading">Quick Searches</div>
                    <div className="item-sub-heading">Discover restaurants by type of meal</div>
                    <div className="row">
                        {mealtypesData.map(item => {
                            return <QuickSearchItem qsdata={item}/>
                        })}
                    </div>
                </div> 
            </div>
        )
    }
}

export default QuickSearch;