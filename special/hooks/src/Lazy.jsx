import React, {lazy, Suspense} from 'react'
import ErrorBoundary from './components/ErrorBoundary.jsx'

const About = lazy(() => import("./components/lazy/About.jsx"))
export default class Lazy extends React.Component{
  render(){
    return (<div>
      <ErrorBoundary>
        <Suspense fallback={<div>loading</div>}>
        <About></About>
        </Suspense>
      </ErrorBoundary>
    </div>)
  }
}