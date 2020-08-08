import React, { memo } from 'react';

function Memo(){
  console.log('render')
  return (
    <div>MemoTest</div>
  )
}

function areEqual(prevProps, nextProps){
  return false
}
 
export default memo(Memo, areEqual);