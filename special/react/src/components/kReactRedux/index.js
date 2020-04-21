import React, { useEffect, useContext, useState } from 'react';

const Context = React.createContext()

export const Provider = (props) => {
  return <Context.Provider value={props.store}>
    {props.children}
  </Context.Provider>
}

export const connect = (mapStateToProps=state => state, mapDispatchToProps={}) => {
  return (Cmp) => {
    return () => {
      const store = useContext(Context)
      const getProps = () => {
        const stateProps = mapStateToProps(store.getState())
        const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
        return {
          ...stateProps,
          ...dispatchProps
        }
      }
      const [props, setProps] = useState(getProps())
      console.log(props)
      useEffect(() => {
        store.subscribe(() => {
          setProps({...props, ...getProps()})
        })
      })
      return <Cmp {...props}/>
    }
  }
}

function bindActionCreators(creaters, dispatch){
  return Object.keys(creaters).reduce((pre, cur) => {
    pre[cur] =  bindActionCreator(creaters[cur], dispatch)
    return pre
  }, {})
}

function bindActionCreator(creater, dispatch){
  return  (...args) => dispatch(creater(...args))
}