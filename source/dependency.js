/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
window.DependencyChecker = class DependencyChecker {
  constructor(container) {
    this.container = container;
    this.elemTimerWrapper = this.container.querySelector('.timer-wrapper');
    this.elemMessage      = this.container.querySelector('.message');

    this.container.addEventListener('click', event => {
      if (!event.target.classList.contains('use-anyway')) { return; }
      return this.elemTimerWrapper.classList.remove('disabled');
    });
  }

  check() {
    if (!this.hasFullscreen()) { return this.notify('fullscreen'); }
    if (!this.hasLocalStorage()) { return this.notify('localStorage'); }
  }

  /*
  @private
  @method hasLocalStorage
  */
  hasLocalStorage() {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }

  /*
  @private
  @method hasLocalStorage
  */
  hasFullscreen() {
    return (screenfull.enabled != null);
  }

  /*
  @private
  @method notify
  */
  notify(item) {
    let message  = `Looks like <em>${item}</em> is not supported. Consider using a `;
    message += "<a href='https://www.google.com/chrome/browser/' target='_blank'>modern browser</a>.";
    message += "<button class='use-anyway big button'>Use anyway</button>";

    this.elemTimerWrapper.classList.add('disabled');
    return this.elemMessage.innerHTML = message;
  }
};
