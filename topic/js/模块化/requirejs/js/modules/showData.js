define([
  'data',
], function(data) {
  'use strict';
  function show(){
    console.log('showData is'+data.getData())
  }
  return {show}
});