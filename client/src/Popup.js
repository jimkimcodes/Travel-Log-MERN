import { Popup } from 'react-map-gl';
import React from 'react'

export default function PopupMessage(props) {
  return (
    <Popup
      latitude={props.entry.latitude}
      longitude={props.entry.longitude}
      closeButton={false}
      offsetLeft={0}
      offsetTop={props.viewport.zoom < 9 ? -20 : -40}
      anchor="bottom"
    >
      <div>
        <h3 className="title is-5 mb-2 has-text-danger">{props.entry.title}</h3>
        <p className="entry-comment">{props.entry.comments}</p>
        {
          props.entry.visitDate ? (
            <small className="has-text-info">Visited on: {new Date(props.entry.visitDate).toLocaleDateString('en-GB')}</small>
          ): null
        }
        </div>
    </Popup>
  )
}
