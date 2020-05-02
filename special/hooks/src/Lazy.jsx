import React, {lazy, Suspense} from 'react'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import About from './components/lazy/About.jsx'

// const About = lazy(() => import("./components/lazy/About.jsx"))
export default class Lazy extends React.Component{
  render(){
    return (<div>
      <ErrorBoundary>
      <About></About>
        {/* <Suspense fallback={<div>loading</div>}>

        </Suspense> */}
      </ErrorBoundary>
    </div>)
  }
}