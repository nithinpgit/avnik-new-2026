import React, { Component } from 'react';



class EventDiscount extends Component {
    render() {
        return (
            <>
                <div className="b-f-in">
                <span className="label-small-h">Offer Available</span>
                    <div className="flex-select-bx">
                        <select className="form-control custom-select-bx" onChange={(e)=>this.props.setAnyState({eventDiscount: e.target.value})} name="eventDiscount" value={this.props.value.eventDiscount}>
                            <option >Discount</option>
                            <option value="10,10%">First 10 People 10%</option>
                            <option value="20,08%">First 20 People 08%</option>
                            <option value="30,06%">First 30 People 06%</option>
                            <option value="40,04%">First 40 People 04%</option>
                            <option value="50,02%">First 50 People 02%</option>
                        </select>
                    </div>
                </div>
            </>
        );
    }
}



export default EventDiscount;
