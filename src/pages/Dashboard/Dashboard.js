import { useEffect, useState } from 'react'

import './index.css'

import { getUser } from '../../services/user'
import { useHistory } from 'react-router-dom'

export default function Dashboard() {
  
  const history = useHistory()

  const [user, setUser] = useState({})

  useEffect(() => {

    async function fetchData() {

      const { data } = await getUser()

      setUser(data)
    }

    fetchData()

  }, [])
  
  const dateForm = (date) => {

    const [newDate, ] = date.split('T')

    const [year, mounth, day] = newDate.split('-')


    return `${day}/${mounth}/${year}`
  }

  const logout = () => {
    localStorage.removeItem('token')
    history.push('/')
  }

  return (
    <div className="dashboardContainer">
      <div className="profileContainer">
        <img src="https://avatars.dicebear.com/api/male/icaro.svg" alt="avatar" />
        <h1>{user.name ? user.name : 'carregando...'}</h1>
        <div>
          <div>
            <label>Criado</label>
            {user.created_at ? dateForm(user.created_at) : 'carregando...'}
          </div>
          <div>
            <label>Atualizado</label>
            {user.updated_at ? dateForm(user.updated_at) : 'carregando...'}
          </div>
        </div>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  )
}
