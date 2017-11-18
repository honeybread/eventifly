import React from 'react';


var DateSort = (props) => {
    return(
    <div>
        <form>
            <button onClick={(e) => {props.onDateSort(e)}}> Sort by Date </button> 
        </form>
    </div>);
}

export default DateSort;