import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from './auth'

import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'

const PrivateRoute = ({ component: Component, ...rest}) => {

  return (
    <Route {...rest} render={props => (
      isAuthenticated() ?
      
      (
        <Component {...props}/>
      ) 
      
      : 
      
      (
        <Redirect to={{ pathname: "/", state: { from: props.location }}} />
      )
    )} />
  )
}

export default function routes() {
  return (
    <Router>
      <Switch>
        <Route  path="/" exact component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard}/>
      </Switch>
    </Router>
  )
}
