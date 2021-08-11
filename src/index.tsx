import {render} from 'react-dom'
import {App} from './components/App'
import './public/favicon.ico'
import {Server} from 'miragejs'

new Server({
  routes() {
    this.namespace = 'api'

    this.get('/normal/', () => {
      return { min: 1, max: 10 }
    })
    this.get('/fixedvalues/', () => {
      return { min: 1, max: 100,rangeValues:[10,20,30,40,50,60,70,80,90] }
    })
  }
})

render
(
  <App/>,
  document.getElementById('app')
)