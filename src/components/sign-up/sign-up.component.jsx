import React, { useState } from "react";
import CustomButton from "../custom-button/custom-button.component.jsx";
import FormInput from "../form-input/form-input.component.jsx";
import "./sign-up.styles.css";

function SignUp() {
  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [turma, setTurma] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // await authRepository.createUserWithEmailAndPassword(
    //   email,
    //   password,
    //   displayName
    // );
    setEmail("");
    setPassword("");
    setdisplayName("");
    setConfirmPassword("");
  }

  return (
    <div className='sign-up'>
      <h2 className='title'>Eu não tenho uma conta</h2>
      <span>Cadastre-se com seu email e senha</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={(e) => setdisplayName(e.target.value)}
          label='Nome completo'
          required
        />

        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label='E-mail'
          required
        />

        <FormInput
          type='text'
          name='turma'
          value={turma}
          onChange={(e) => setTurma(e.target.value)}
          label='Turma'
          required
        />

        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label='Senha'
          required
        />

        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label='Confirmar senha'
          required
        />

        <CustomButton type='submit'>Cadastrar</CustomButton>
      </form>
    </div>
  );
}

export default SignUp;
