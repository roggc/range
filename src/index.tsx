import { render } from 'react-dom'
import App from './components/App'
import './public/favicon.ico'
import { Server } from 'miragejs'

new Server({
    routes() {
        this.namespace = 'api'

        this.get('/normal/', () => {
            return { min: 1, max: 20, rangeValues: undefined }
        })
        this.get('/fixedvalues/', () => {
            return {
                min: 1,
                max: 100,
                rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
            }
        })
    },
})

render(<App />, document.getElementById('app'))
