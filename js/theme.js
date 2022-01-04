$(document).ready(function () {
  bannerSlider();
  handleMobileScroll();
  setupLinks();
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

function setupLinks() {
  document.querySelector('a.logo').setAttribute('href', 'index.html')
  let urls = ['ai-stack', 'cloud-fusion', 'ai-stack-appliance', 'news']
  Array.from(document.querySelector('#navbar').children).forEach((e, i) => {
    e.children[0].setAttribute('href', urls[i] + '.html')
  })
  document.querySelector('#navbar').children[3].onclick = e => {
    e.preventDefault();
    showModal(`<div class="coming-soon">
      Coming Soon
    </div>`, '');
  }
  document.querySelector('.evaluation form button').onclick = e => {
    e.preventDefault();
    showModal(`<div class="from-submit">
      <img src="./images/submit_icon-21.svg">
      <div class="from-submit-text">Thank you & we will contact
      you as soon as possible.</div>
    </div>`, '');
  }
}
function showPhilosophyModal() {
  showModal(`
  <div class="philosophy-modal philosophy-modal-font">
    We, InfinitiesSoft, are here to help. Our product, AI-Stack platform, provides a well-integrated environment, to self-service portal for AI developers and IT admins. We enable the machine learning processes that provide all possible tools and workflow instruction in an AI project. On top of that, a user-friendly interface helps our clients to monitor the resource allocation and the progress.<br><br>
    Our expertise and patented resource management techniques for AI-Stack satisfies the needs of managing AI infrastructure that most AI developers desire.<br><br>
    With AI-Stack, the environment deployment becomes 100% transparent, boosting the GPU utilization rate from 30 to 90%. The preparation time is shorter from 2 weeks to 1 minute!<br><br>
    We are a team of international talents with a strong background. Welcome to join our AI-Stack ecosystem partner network. It’s time for InfinitiesSoft to go beyond the infinity!
  </div>`,
    `<span class="red bold">Our Philosophy</span>`);
}

function showFeatureModal(imgSrc, pageName) {
  if(imgSrc instanceof Array){
    let content = '';
    imgSrc.forEach((e, i) => {
      content += `        
        <img class="sample_screen" src="./images/screenshots/${imgSrc[i]}">
        <div class="sharktech-modal-footer multi-pic-modal-font">
          <span class="red bold"></span>${pageName[i]}
        </div>
      `
    })
    showModal(`<div class="philosophy-modal wider">${content}</div>`, '');
  }
  else{
    showModal(`<img class="sample_screen" src="./images/screenshots/${imgSrc}">`,
      `<span class="red bold">實際介面:</span> ${pageName}`);
  }
}

function showModal(content, footer) {
  var modal = document.createElement('div');
  modal.classList.add('sharktech-modal')
  modal.innerHTML = `
  <div class="outer-container" onclick="hideModal();">
    <div class="container" onclick="return true;">
      <button class="close" onclick="hideModal();">
        <img src="./images/close.svg">
      </button>
      ${content}
      ${footer? `<div class="sharktech-modal-footer">${footer}</div>` : ''}
    </div>
  </div>
  `
  document.body.appendChild(modal);
  document.body.style.paddingRight = (window.innerWidth - parseInt(getComputedStyle(document.body).width)) + 'px';
  document.body.style.overflowY = 'hidden';

  setTimeout(() => {
    document.querySelector('.sharktech-modal .container').addEventListener('click', e => e.stopPropagation())
    $('.sharktech-modal').fadeIn(200);
  }, 0);
}

function hideModal() {
  $('.sharktech-modal').fadeOut(200); setTimeout(() => {
    document.body.removeChild(document.querySelector('.sharktech-modal'))
    document.body.style.paddingRight = '';
    document.body.style.overflowY = 'scroll';
  }, 200);
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