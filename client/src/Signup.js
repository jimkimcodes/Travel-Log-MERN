import React, { useState } from 'react';
import Container from './CenterContainer';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { createUser } from './api/auth';

export default function Signup() {
  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onChange"
  });

  const [formError, setFormError] = useState(null);
  let history = useHistory();

  const onSubmit = async (data) => {
    try {
      const createdUser = await createUser(data); 
      history.push("/login");
    } catch(error){
      setFormError(error.message);
    }
  }

  const validatePassword = (value) => value === watch('password') || 'Password and Confirm Password do not match!';
  const errorElement = (formError) => (
    <div className="notification is-danger py-2 has-text-centered"> 
    <span className="icon has-text-warning">
      <i className="fa fa-exclamation-triangle is-size-4" aria-hidden="true"></i>
    </span>
     <strong className="ml-3 is-capitalized">{formError}</strong>
    </div>
  )

  return (
    <Container>
      <h3 className="title is-3 has-text-link	has-text-centered">Sign Up</h3>
      {formError && errorElement(formError)} 
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className={"input "+(errors.username && "is-danger")} type="text" name="username" placeholder="How would you like to be called?" ref={register({ required: 'Username is required!' })} />
          </div>
          {errors.username && <p className="help is-danger">{errors.username.message}</p>}
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className={"input "+(errors.email && "is-danger")} type="email" name="email" placeholder="How would you like to be contacted?" ref={register({ required: 'Email is required!' })} />
          </div>
          {errors.email && <p className="help is-danger">{errors.email.message}</p>}

        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className={"input "+(errors.password && "is-danger")} type="password" name="password" placeholder="To secure you memory pins." ref={register({ required: 'Password is required!',minLength: { value: 6, message: 'Password should be of at least 6 characters!'} })} />
          </div>
          {errors.password && <p className="help is-danger">{errors.password.message}</p>}

        </div>

        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <input className={"input "+(errors.confirm_password && "is-danger")} type="password" name="confirm_password" placeholder="Enter your password again!" ref={register({ required: 'Please enter your password again.', validate: validatePassword })} />
          </div>
          {errors.confirm_password && <p className="help is-danger">{errors.confirm_password.message}</p>}
        </div>

        <div className="field is-grouped is-grouped-centered mt-4">
          <div className="control">
            <button className="button is-link">Sign Up</button>
          </div>
          <div className="control">
            <Link to="/login" className="button is-primary">Log In</Link>
          </div>
        </div>
      </form>
    </Container>
  )
}
