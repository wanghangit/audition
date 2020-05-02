class TouchMobile{
  constructor(el, options){
    el.addEventListener('touchstart', this.handleStart, false)
    this.options = options
  }
  handleStart(e){
    console.log(e)
  }
}