$(document).ready(function () {
  bannerSlider();
  handleMobileScroll();
});

function handleMobileScroll() {
  const scrollDistance = 1000;
  const horizontalScrollBound = [19, 85];
  let banner = document.querySelector('#banner');
  let dummy = document.createElement('div');
  dummy.classList.add('dummy')
  dummy.innerHTML = document.body.innerHTML;
  document.body.append(dummy);
  let dummyBanner = document.querySelector('.dummy #banner');
  document.querySelectorAll('.nvidia').forEach(e => {
    if (e.dataset.lazy) e.src = e.dataset.lazy;
  })

  let matchMobile = window.matchMedia("(max-width: 575px)")
  matchMobile.onchange = function (e) {
    let matchMobile = window.matchMedia("(max-width: 575px)");
    if (matchMobile.matches) {
      startHandlingScroll()
    } else {
      stopHandlingScroll()
    }
  }
  setTimeout(() => matchMobile.onchange(), 0);

  function startHandlingScroll() {
    document.addEventListener('scroll', handleScroll);
    banner.style.marginTop = scrollDistance + 'px';
    banner.style.backgroundPositionX = `${horizontalScrollBound[1]}%`;
    dummy.style.display = 'block';
    dummyBanner.style.backgroundPositionX = `${horizontalScrollBound[(window.scrollY == 0) ? 0 : 1]}%`
  }

  function stopHandlingScroll() {
    document.removeEventListener('scroll', handleScroll);
    banner.style.marginTop = '';
    banner.style.backgroundPositionX = '';
    dummy.style.display = 'none';
  }

  function handleScroll(e) {
    if (window.scrollY > scrollDistance) {
      dummy.style.display = 'none';
    }
    else {
      dummy.style.display = 'block';
      dummyBanner.style.backgroundPositionX =
        (horizontalScrollBound[0] +
          window.scrollY *
          (horizontalScrollBound[1] - horizontalScrollBound[0]) / scrollDistance) + '%';
    }
  }

}

//JS請以小寫字母開頭=>竟然拆開以function來寫
//http://www.masterslider.com/doc/#slide-layers 輪播外掛元件 
//=>　未來我們後台會做一個這個的管理系統，所以一律統一使用這個
function bannerSlider() {
  if ($('#bannerSlider').length > 0) {
    //這個主程式已包在jq core裡面
    var slider = new MasterSlider();
    // adds Arrows navigation control to the slider.

    slider.control('timebar', {
      insertTo: '#bannerSlider'
    });
    slider.control('bullets');

    //依案子不一樣要調整width/height
    slider.setup('bannerSlider', {
      width: 800, // slider standard width
      height: 350, // slider standard height
      space: 0,
      layout: 'fullwidth',
      loop: true,
      preload: 0,
      instantStartLayers: true,
      autoplay: true
    });
  }
}