import './index.css'

import { FiAlertCircle, FiXCircle } from 'react-icons/fi'

export default function Toast() {

  return (
    <div className="toastContainer">
      <div className="toast">
        <FiAlertCircle size={20}/>
        <div>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possível fazer login na aplicação, cheque as credenciais</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </div>
    </div>
  )
}
