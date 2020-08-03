import React from 'react'

export default function PinDetails(props) {
  const entry = props.entry;
  
  return (
    <div className="box has-background-light">
      <div className="columns">
        <div className="column">
          <img src={entry.image} alt="Pin Image" className="pin-image" />
        </div>
        <div className="column" style={{ borderLeft: '1px solid #ccc'}}>
          <h3 className="title is-4 has-text-danger mb-2">{entry.title}</h3>
          <p className="title is-5 has-text-weight-semibold has-text-info mb-3">Rating: {entry.rating}</p>
          <p className="is-italic mb-4">"{entry.comments}"</p>
          <p className="title is-5 has-text-weight-semibold has-text-primary">Visited on: {entry.visitDate}</p>
        </div>
      </div>
    </div>
    )
}
