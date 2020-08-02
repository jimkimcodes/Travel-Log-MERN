import React from 'react'

export default function LogEntryForm() {
  return (
    <div className="box has-background-light">
      <div className="columns has-text-centered">
        <div className="column">
          <h3 class="title is-4 has-text-info">Pin Memory 💝</h3>
        </div>
      </div>
      <div className="columns has-text-centered">
        <div className="column">
          <div className="field">
            <label htmlFor="title" className="label">Title</label>
            <div className="control">
              <input type="text" name="title" id="title" className="input" placeholder="Name your memory😍" />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="visitDate" className="label">Visited on</label>
            <div className="control">
              <input type="date" name="visitDate" id="visitDate" className="input" value={new Date().toLocaleDateString('en-CA')} />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label htmlFor="image" className="label">Image URL</label>
            <div className="control">
              <input type="text" name="image" id="image" className="input" placeholder="Gotta have something to look back to🎉"/>
            </div>
          </div>
        </div>
      </div>
      <div className="columns has-text-centered">
        <div className="column">
          <div className="field">
            <div className="control">
              <input type="text" name="comment" id="comment" className="input" placeholder="Brief it over now, cherish later!💕" />
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
  )
}
