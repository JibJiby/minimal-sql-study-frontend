import './App.css'
import { Switch, Route } from 'react-router-dom'
import Home from './pages'
import Editor from './pages/editor'
import Create from './pages/create'

function App() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/editor" component={Editor} />
        </Switch>
    )
}

export default App
