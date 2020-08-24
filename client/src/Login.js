import React, { useState } from 'react';
import Container from './CenterContainer';
import { Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { loginUser } from './api/auth';
import { useHistory } from 'react-router-dom';

export default function Signup() {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange"
  });

  const [formError, setFormError] = useState(null);
  let history = useHistory();

  const onSubmit = async (data) => {
    try {
      const user = await loginUser(data);
      setFormError(user.username);
      history.push("/");
    } catch(error){
      setFormError(error.message);
    }
  }

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
      <h3 className="title is-3 has-text-link	has-text-centered">Log In</h3>
      {formError && errorElement(formError)} 
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className={"input "+(errors.username && "is-danger")} type="text" name="username" placeholder="Username..." ref={register({ required: 'Username is required!' })} />
          </div>
          {errors.username && <p className="help is-danger">{errors.username.message}</p>}
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className={"input "+(errors.password && "is-danger")} type="password" name="password" placeholder="Password..." ref={register({ required: 'Password is required!'})} />
          </div>
          {errors.password && <p className="help is-danger">{errors.password.message}</p>}
        </div>
        <div className="field is-grouped is-grouped-centered mt-5">
          <div className="control">
            <button className="button is-link">Log In</button>
          </div>
          <div className="control">
            <Link to="/signup" className="button is-primary">Sign Up</Link>
          </div>
        </div>
      </form>
    </Container>
  )
}
