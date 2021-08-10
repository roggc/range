import {render} from 'react-dom'
import {App} from './components/App'
import './public/favicon.ico'
import {Server} from 'miragejs'

new Server({
  routes() {
    this.namespace = 'api'

    this.get('/minmax/', () => {
      return { min: 1, max: 10 }
    })
  }
})

render
(
  <App/>,
  document.getElementById('app')
)