import { each } from 'lodash';

const raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60) };

const defaultBreakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

export default new class {

  constructor () {
    this.width = this.getWidth();
    this.device = this.getBreakpoint(this.width);
    this.callbacks = [];
    this.breakpoints = defaultBreakpoints;

    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        this.loop();
      }, 500);
    });
  }

  loop () {
    let newWidth = this.getWidth();
    if (this.width === newWidth) {
      raf(() => { this.loop() })
      return;
    }
    this.width = newWidth;
    let newBreakpoint = this.getBreakpoint(this.width);
    let oldBreakpoint = this.device;
    this.fireEvent('width', { width: newWidth });
    if (oldBreakpoint === newBreakpoint) {
      raf(() => { this.loop() })
      return;
    }
    this.device = newBreakpoint;
    this.fireEvent('change', { oldDevice: oldBreakpoint, newDevice: newBreakpoint });
    raf(() => { this.loop() })
  }

  registerCallbacks (cb) {
    this.callbacks.push(cb);
  }

  getWidth () {
    return (window.innerWidth > 0) ? window.innerWidth : screen.width;
  }

  getBreakpoint (width) {
    let result = null;
    each(this.breakpoints, (value, key) => {
      if (width >= value) {
        result = key;
      } else {
        return false;
      }
    })
    return result;
  }

  fireEvent (name, params) {
    this.callbacks.forEach(handler => {
      handler(name, params);
    });
  }

}
