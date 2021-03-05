import { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { LoginUser } from '../../services/login'

import './index.css'
import Input from '../../components/Input/Input'

function Login() {

  const formRef = useRef(null)
  const history = useHistory()

  const [passwordType, setPasswordType] = useState(false)


  const handleSetPasswordType = () => {

    setPasswordType(!passwordType)
  }

  const handleSubmit = async ({ email, password }) => {
    try {

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
        password: Yup.string()
        .required('Senha obrigatória')
      })

      await schema.validate({email, password}, {
        abortEarly: false
      })

      const user = {
        email,
        password
      }

      const result = await LoginUser(user)

      localStorage.setItem('token', result.data.token)
      localStorage.setItem('user_id', result.data.user.id)

      history.push('/dashboard')

    } catch (err) {

      if ( err instanceof Yup.ValidationError ) {
        const errorMessages = {}

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message
        })

        formRef.current?.setErrors(errorMessages)
      }
    }
  }

  return (
    <div className="loginContainer">
      <Form ref={formRef} className="loginForm" onSubmit={handleSubmit}>
        <img src="https://app.lancadorpro.com.br/static/media/logo.126ced82.svg" alt="Lançador PRO" />
        <h1>Lançador PRO</h1>
        <div className="inputContainer">
          <Input type="text" name="email" placeholder="E-mail de acesso" />
        </div>
        <div className="inputContainer">
          <Input type={passwordType ? 'text' : 'password'} name="password" placeholder="Senha" />

          {passwordType ?
            <AiOutlineEye size={23} onClick={handleSetPasswordType} />
            :
            <AiOutlineEyeInvisible size={23} onClick={handleSetPasswordType} />
          }
        </div>
        <button type="submit">ENTRAR</button>

        <span>
          Esquece seus dados de acesso?
          <a href="/">Clique aqui</a>
        </span>
      </Form>
    </div>
  );
}

export default Login;
