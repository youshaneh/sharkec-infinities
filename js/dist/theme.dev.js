"use strict";

$(document).ready(function () {
  bannerSlider();
  var matchMobile = window.matchMedia("(max-width: 575px)");

  matchMobile.onchange = function (e) {
    var matchMobile = window.matchMedia("(max-width: 575px)");

    if (matchMobile.matches) {
      startHandleScroll();
    } else {
      stopHandleScroll();
    }
  };

  setTimeout(function () {
    matchMobile.onchange();
  }, 0); // modern Chrome requires { passive: false } when adding event

  var supportsPassive = false;

  try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassive = true;
      }
    }));
  } catch (e) {}

  var wheelOpt = supportsPassive ? {
    passive: false
  } : false;
  var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  function startHandleScroll() {
    window.addEventListener(wheelEvent, handleScroll, wheelOpt);
    window.addEventListener('touchmove', handleScroll, wheelOpt);
    window.addEventListener('keydown', handleScrollForScrollKeys, false);
    banner.style.backgroundPositionX = window.scrollY == 0 ? '15%' : '85%';
  }

  function stopHandleScroll() {
    window.removeEventListener(wheelEvent, handleScroll, wheelOpt);
    window.removeEventListener('touchmove', handleScroll, wheelOpt);
    window.removeEventListener('keydown', handleScrollForScrollKeys, false);
    var banner = document.querySelector('#banner');
    banner.style.backgroundPositionX = '';
  }

  function handleScroll(e) {
    var banner = document.querySelector('#banner');
    var x = Number(getComputedStyle(banner).backgroundPositionX.split('%')[0]);

    if (e.deltaY > 0 && getComputedStyle(banner).backgroundPositionX.split('%')[0] < 85) {
      banner.style.backgroundPositionX = x + Number(e.deltaY) * 0.06 + '%';
      e.preventDefault();
    } else if (e.deltaY < 0 && getComputedStyle(banner).backgroundPositionX.split('%')[0] > 15 && window.scrollY == 0) {
      banner.style.backgroundPositionX = x + Number(e.deltaY) * 0.06 + '%';
    }
  }

  function handleScrollForScrollKeys(e) {
    if ([37, 38, 39, 40].indexOf(e.keyCode) >= 0) {
      handleScroll(e);
      return false;
    }
  }
}); //JS請以小寫字母開頭=>竟然拆開以function來寫
//http://www.masterslider.com/doc/#slide-layers 輪播外掛元件 
//=>　未來我們後台會做一個這個的管理系統，所以一律統一使用這個

function bannerSlider() {
  if ($('#bannerSlider').length > 0) {
    //這個主程式已包在jq core裡面
    var slider = new MasterSlider(); // adds Arrows navigation control to the slider.

    slider.control('timebar', {
      insertTo: '#bannerSlider'
    });
    slider.control('bullets'); //依案子不一樣要調整width/height

    slider.setup('bannerSlider', {
      width: 800,
      // slider standard width
      height: 350,
      // slider standard height
      space: 0,
      layout: 'fullwidth',
      loop: true,
      preload: 0,
      instantStartLayers: true,
      autoplay: true
    });
  }
}