import React from 'react'

export default function CenterContainer(props) {
  return (
    <div className="container mt-6">
      <div className="columns mx-4 is-centered">
        <div className="column is-half-tablet box has-background-white-ter">
          {props.children}
        </div>
      </div>
    </div>
  )
}
