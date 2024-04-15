export interface IPopupWindow {
  width: number;
  height: number;
  title: string;
  url: string;
  focus: boolean;
  scrollbars: boolean;
}

const openPopupWindow = (popupOptions: IPopupWindow): Window | null => {
  {
    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - popupOptions.width) / 2 / systemZoom + dualScreenLeft;
    const top = (height - popupOptions.height) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(
      popupOptions.url,
      popupOptions.title,
      `scrollbars=${popupOptions.scrollbars ? "yes" : "no"},
      width=${popupOptions.width / systemZoom}, 
      height=${popupOptions.height / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    );
    newWindow!.opener = null;
    if (popupOptions.focus) {
      newWindow!.focus();
    }
    return newWindow;
  }
};

export default openPopupWindow;
