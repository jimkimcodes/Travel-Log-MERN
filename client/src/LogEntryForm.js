import React from 'react'
import { useForm } from "react-hook-form";

import { createLogEntry } from './api';

export default function LogEntryForm(props) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      data.latitude = props.location.latitude;
      data.longitude = props.location.longitude;
      const createdEntry = createLogEntry(data); 
      console.log(createdEntry);
      props.onClose();
    } catch(error){
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className="box has-background-light">
        <div className="columns has-text-centered">
          <div className="column">
            <h3 className="title is-4 has-text-info">Pin Memory 💝</h3>
          </div>
        </div>
        <div className="columns has-text-centered">
          <div className="column">
            <div className="field">
              <label htmlFor="title" className="label">Title</label>
              <div className="control">
                <input type="text" name="title" id="title" className="input" placeholder="Name your memory😍" ref={register} required />
              </div>
            </div>
          </div>
          <div className="column is-3">
            <div className="field">
              <label htmlFor="visitDate" className="label">Visited on</label>
              <div className="control">
                <input type="date" name="visitDate" id="visitDate" className="input" defaultValue={new Date().toLocaleDateString('en-CA')} ref={register({ required: true })} />
              </div>
            </div>
          </div>
          <div className="column is-1">
            <div className="field">
              <label htmlFor="rating" className="label">Rating</label>
              <div className="control">
                <input type="number" name="rating" id="rating" className="input" placeholder="" min="0" max="10" ref={register} required />
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label htmlFor="image" className="label">Image URL</label>
              <div className="control">
                <input type="text" name="image" id="image" className="input" placeholder="Gotta have something to look back to🎉" ref={register} />
              </div>
            </div>
          </div>
        </div>
        <div className="columns has-text-centered">
          <div className="column">
            <div className="field">
              <label htmlFor="comments" className="label is-hidden-desktop">Comment</label>
              <div className="control">
                <input type="text" name="comments" id="comments" className="input" placeholder="Brief it over now, cherish later!💕" ref={register} />
              </div>
            </div>
          </div>
          <div className="column is-2">
            <div className="field">
              <div className="control">
                <button className="button is-danger" type="submit">Pin Memory</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
