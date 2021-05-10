import React, { useState } from "react";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    // await authRepository.signInWithEmailAndPassword(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <div className='sign-in'>
      <h2>Eu já tenho uma conta</h2>
      <span>Faça login com seu e-mail e senha</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={(e) => setEmail(e.target.value)}
          value={email}
          label='e-mail'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          label='Senha'
          required
        />
        <div className='buttons'>
          <CustomButton type='submit'> Entrar </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
