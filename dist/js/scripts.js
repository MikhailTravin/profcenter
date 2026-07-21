const modules_flsModules = {};

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout((() => {
      lockPaddingElements.forEach((lockPaddingElement => {
        lockPaddingElement.style.paddingRight = "";
      }));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }), delay);
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    }));
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
function functions_FLS(message) {
  setTimeout((() => {
    if (window.FLS) console.log(message);
  }), 0);
}

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout((() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout((() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array).filter(function (item) {
    return item.dataset[dataSetValue];
  });

  if (media.length) {
    const breakpointsArray = media.map(item => {
      const params = item.dataset[dataSetValue];
      const paramsArray = params.split(",");
      return {
        value: paramsArray[0],
        type: paramsArray[1] ? paramsArray[1].trim() : "max",
        item: item
      };
    });

    const mdQueries = uniqArray(
      breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
    );

    const mdQueriesArray = mdQueries.map(breakpoint => {
      const [query, value, type] = breakpoint.split(",");
      const matchMedia = window.matchMedia(query);
      const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
      return { itemsArray, matchMedia };
    });

    return mdQueriesArray;
  }
}

function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

//========================================================================================================================================================

if (document.querySelector('.block-intro-slider__slider')) {
  const swiperIntro = new Swiper('.block-intro-slider__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    lazy: true,
    speed: 800,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.block-intro-slider__pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.block-intro-slider__arrow-prev',
      nextEl: '.block-intro-slider__arrow-next',
    },
    on: {
    },
  })
}

if (document.querySelector('.block-reviews__slider')) {
  const swiperReviews = new Swiper('.block-reviews__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 15,
    speed: 800,
    pagination: {
      el: '.block-reviews__pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.block-reviews__arrow-prev',
      nextEl: '.block-reviews__arrow-next',
    },
    breakpoints: {
      768: {
        slidesPerView: 2.5,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    on: {
    },
  })
}

if (document.querySelector('.block-benefits__slider')) {
  const swiperBenefits = new Swiper('.block-benefits__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 15,
    speed: 800,
    navigation: {
      prevEl: '.block-benefits__arrow-prev',
      nextEl: '.block-benefits__arrow-next',
    },
    breakpoints: {
      1310: {
        slidesPerView: 6,
        spaceBetween: 30,
      },
    },
    on: {
    },
  })
}

if (document.querySelector('.block-similar__slider')) {
  const swiperSimilar = new Swiper('.block-similar__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 15,
    speed: 800,
    navigation: {
      prevEl: '.block-similar__arrow-prev',
      nextEl: '.block-similar__arrow-next',
    },
    breakpoints: {
      1500: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    on: {
    },
  })
}

//========================================================================================================================================================

//Табы
function tabs() {
  const tabs = document.querySelectorAll('[data-tabs]');
  let tabsActiveHash = [];

  if (tabs.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith('tab-')) {
      tabsActiveHash = hash.replace('tab-', '').split('-');
    }
    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add('_tab-init');
      tabsBlock.setAttribute('data-tabs-index', index);
      tabsBlock.addEventListener("click", setTabsAction);
      initTabs(tabsBlock);
    });

    let mdQueriesArray = dataMediaQueries(tabs, "tabs");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach(mdQueriesItem => {
        mdQueriesItem.matchMedia.addEventListener("change", function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }

  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach(tabsMediaItem => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
      let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
      let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
      let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
      tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
      tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add('_tab-spoller');
        } else {
          tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove('_tab-spoller');
        }
      });
    });
  }

  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
      tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
    }
    if (tabsContent.length) {
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute('data-tabs-title', '');
        tabsContentItem.setAttribute('data-tabs-item', '');

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add('_tab-active');
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
      });
    }
    setTabsStatus(tabsBlock);
  }

  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

    function isTabsAnimate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
      }
      return false;
    }
    const tabsBlockAnimate = isTabsAnimate(tabsBlock);

    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute('data-tabs-hash');
      tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains('_tab-active')) {
          if (tabsBlockAnimate) {
            _slideDown(tabsContentItem, tabsBlockAnimate, null, function () {
              refreshShowMoreInContainer(tabsContentItem);
            });
          } else {
            tabsContentItem.hidden = false;
            setTimeout(() => refreshShowMoreInContainer(tabsContentItem), 50);
          }
          if (isHash && !tabsContentItem.closest('.popup')) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            _slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }

  function setTabsAction(e) {
    const el = e.target;
    if (el.closest('[data-tabs-title]')) {
      const tabTitle = el.closest('[data-tabs-title]');
      const tabsBlock = tabTitle.closest('[data-tabs]');
      if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
        let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
        tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock);
        if (tabActiveTitle.length) tabActiveTitle[0].classList.remove('_tab-active');
        tabTitle.classList.add('_tab-active');
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}

function refreshShowMoreInContainer(container) {
  if (!container) return;
  const showMoreBlocks = container.querySelectorAll('[data-showmore]');
  if (showMoreBlocks.length) {
    showMoreBlocks.forEach(showMoreBlock => {
      const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
      const showMoreButton = showMoreBlock.querySelector('[data-showmore-button]');
      if (showMoreContent && showMoreButton) {
        showMoreBlock.classList.remove('_showmore-active');
        showMoreContent.style.removeProperty('height');
        if (typeof initItem === 'function') {
          initItem(showMoreBlock);
        } else {
          recalcShowMore(showMoreBlock);
        }
      }
    });
  }
}

function recalcShowMore(showMoreBlock) {
  if (!showMoreBlock) return;
  const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
  const showMoreButton = showMoreBlock.querySelector('[data-showmore-button]');
  if (!showMoreContent || !showMoreButton) return;
  let hiddenHeight = getShowMoreHeight(showMoreBlock, showMoreContent);
  const originalHeight = showMoreContent.scrollHeight;
  if (hiddenHeight < originalHeight) {
    _slideUp(showMoreContent, 0, hiddenHeight);
    showMoreButton.hidden = false;
  } else {
    _slideDown(showMoreContent, 0, hiddenHeight);
    showMoreButton.hidden = true;
  }
}

function getShowMoreHeight(showMoreBlock, showMoreContent) {
  let hiddenHeight = 0;
  const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size';
  const rowGap = parseFloat(getComputedStyle(showMoreContent).rowGap) ? parseFloat(getComputedStyle(showMoreContent).rowGap) : 0;
  if (showMoreType === 'items') {
    const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
    const showMoreItems = showMoreContent.children;
    for (let index = 1; index < showMoreItems.length; index++) {
      const showMoreItem = showMoreItems[index - 1];
      const marginTop = parseFloat(getComputedStyle(showMoreItem).marginTop) ? parseFloat(getComputedStyle(showMoreItem).marginTop) : 0;
      const marginBottom = parseFloat(getComputedStyle(showMoreItem).marginBottom) ? parseFloat(getComputedStyle(showMoreItem).marginBottom) : 0;
      hiddenHeight += showMoreItem.offsetHeight + marginTop;
      if (index == showMoreTypeValue) break;
      hiddenHeight += marginBottom;
    }
    rowGap ? hiddenHeight += (showMoreTypeValue - 1) * rowGap : null;
  } else {
    const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
    hiddenHeight = showMoreTypeValue;
  }
  return hiddenHeight;
}
tabs();

//========================================================================================================================================================

function showMore() {
  window.addEventListener("load", function (e) {
    const showMoreBlocks = document.querySelectorAll('[data-showmore]');
    let showMoreBlocksRegular;
    let mdQueriesArray;

    if (showMoreBlocks.length) {
      showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (item, index, self) {
        return !item.dataset.showmoreMedia;
      });

      if (showMoreBlocksRegular.length) {
        initItems(showMoreBlocksRegular);
      }

      document.addEventListener("click", showMoreActions);
      window.addEventListener("resize", showMoreActions);

      mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
      if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach(mdQueriesItem => {
          if (mdQueriesItem.matchMedia) {
            mdQueriesItem.matchMedia.addEventListener("change", function () {
              initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
          }
        });
        initItemsMedia(mdQueriesArray);
      }
    }

    function initItemsMedia(mdQueriesArray) {
      mdQueriesArray.forEach(mdQueriesItem => {
        if (mdQueriesItem.itemsArray && mdQueriesItem.itemsArray.length) {
          initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        }
      });
    }

    function initItems(showMoreBlocks, matchMedia) {
      if (!showMoreBlocks || !showMoreBlocks.length) return;
      showMoreBlocks.forEach(showMoreBlock => {
        initItem(showMoreBlock, matchMedia);
      });
    }

    function initItem(showMoreBlock, matchMedia = false) {
      if (!showMoreBlock) return;

      showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;

      let showMoreContent = showMoreBlock.querySelectorAll('[data-showmore-content]');
      let showMoreButton = showMoreBlock.querySelectorAll('[data-showmore-button]');

      if (!showMoreContent.length || !showMoreButton.length) return;

      showMoreContent = Array.from(showMoreContent).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
      showMoreButton = Array.from(showMoreButton).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];

      if (!showMoreContent || !showMoreButton) return;

      const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
      const shouldShowButton = matchMedia ? matchMedia.matches : true;

      if (shouldShowButton) {
        if (hiddenHeight < getOriginalHeight(showMoreContent)) {
          if (typeof _slideUp === 'function') {
            _slideUp(showMoreContent, 0, showMoreBlock.classList.contains('_showmore-active') ? getOriginalHeight(showMoreContent) : hiddenHeight);
          }
          if (showMoreButton && showMoreButton.hidden !== undefined) {
            showMoreButton.hidden = false;
          }
        } else {
          if (typeof _slideDown === 'function') {
            _slideDown(showMoreContent, 0, hiddenHeight);
          }
          if (showMoreButton && showMoreButton.hidden !== undefined) {
            showMoreButton.hidden = true;
          }
        }
      } else {
        if (typeof _slideDown === 'function') {
          _slideDown(showMoreContent, 0, hiddenHeight);
        }
        if (showMoreButton && showMoreButton.hidden !== undefined) {
          showMoreButton.hidden = true;
        }
      }
    }

    function getHeight(showMoreBlock, showMoreContent) {
      if (!showMoreBlock || !showMoreContent) return 0;

      let hiddenHeight = 0;
      const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size';
      const rowGap = parseFloat(getComputedStyle(showMoreContent).rowGap) ? parseFloat(getComputedStyle(showMoreContent).rowGap) : 0;

      if (showMoreType === 'items') {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? parseInt(showMoreContent.dataset.showmoreContent) : 3;
        const showMoreItems = showMoreContent.children;
        const itemsToCount = Math.min(showMoreTypeValue, showMoreItems.length);

        for (let index = 0; index < itemsToCount; index++) {
          const showMoreItem = showMoreItems[index];
          if (!showMoreItem) continue;

          const marginTop = parseFloat(getComputedStyle(showMoreItem).marginTop) || 0;
          const marginBottom = parseFloat(getComputedStyle(showMoreItem).marginBottom) || 0;

          hiddenHeight += showMoreItem.offsetHeight + marginTop;
          if (index < itemsToCount - 1) {
            hiddenHeight += marginBottom;
          }
        }

        if (rowGap && itemsToCount > 1) {
          hiddenHeight += (itemsToCount - 1) * rowGap;
        }
      } else {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? parseInt(showMoreContent.dataset.showmoreContent) : 150;
        hiddenHeight = showMoreTypeValue;
      }

      return hiddenHeight;
    }

    function getOriginalHeight(showMoreContent) {
      if (!showMoreContent) return 0;

      let parentHidden = null;
      let hiddenHeight = showMoreContent.offsetHeight;

      showMoreContent.style.removeProperty('height');

      if (showMoreContent.closest('[hidden]')) {
        parentHidden = showMoreContent.closest('[hidden]');
        if (parentHidden && parentHidden.hidden !== undefined) {
          parentHidden.hidden = false;
        }
      }

      let originalHeight = showMoreContent.offsetHeight;

      if (parentHidden && parentHidden.hidden !== undefined) {
        parentHidden.hidden = true;
      }

      showMoreContent.style.height = `${hiddenHeight}px`;
      return originalHeight;
    }

    function showMoreActions(e) {
      const targetEvent = e.target;
      const targetType = e.type;

      if (targetType === 'click') {
        const button = targetEvent.closest('[data-showmore-button]');
        if (button) {
          const showMoreBlock = button.closest('[data-showmore]');
          if (showMoreBlock) {
            const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
            if (showMoreContent) {
              const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : '500';
              const hiddenHeight = getHeight(showMoreBlock, showMoreContent);

              if (!showMoreContent.classList.contains('_slide')) {
                if (typeof _slideUp === 'function' && typeof _slideDown === 'function') {
                  if (showMoreBlock.classList.contains('_showmore-active')) {
                    _slideUp(showMoreContent, showMoreSpeed, hiddenHeight);
                  } else {
                    _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
                  }
                  showMoreBlock.classList.toggle('_showmore-active');
                }
              }
            }
          }
        }
      } else if (targetType === 'resize') {
        if (showMoreBlocksRegular && showMoreBlocksRegular.length) {
          initItems(showMoreBlocksRegular);
        }
        if (mdQueriesArray && mdQueriesArray.length) {
          initItemsMedia(mdQueriesArray);
        }
      }
    }
  });
}

showMore();

//========================================================================================================================================================

const contactsLoginButton = document.querySelector('.contacts-login__button');
const contactsLogin = document.querySelector('.contacts-login');

if (contactsLoginButton) {
  contactsLoginButton.addEventListener('click', (event) => {
    event.stopPropagation();
    contactsLogin.classList.toggle('active');
  });

  document.addEventListener('click', (event) => {
    if (!contactsLogin.contains(event.target)) {
      contactsLogin.classList.remove('active');
    }
  });
}

//========================================================================================================================================================

const iconMenu = document.querySelector('.icon-menu');
const headerBody = document.querySelector('.header-bottom__menu');

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    e.stopPropagation();
    document.documentElement.classList.toggle("menu-open");
  });

  document.addEventListener('click', function (e) {
    const isClickInsideHeaderBody = headerBody && headerBody.contains(e.target);
    const isClickOnMenuIcon = e.target === iconMenu || iconMenu.contains(e.target);

    if (!isClickInsideHeaderBody && !isClickOnMenuIcon) {
      document.documentElement.classList.remove("menu-open");
    }
  });
}

//========================================================================================================================================================

Fancybox.bind("[data-fancybox]", {
  // опции
});

//========================================================================================================================================================

//Маска
const telephone = document.querySelectorAll('.telephone');
if (telephone) {
  Inputmask({
    "mask": "+7 (999) 999 - 99 - 99",
    "showMaskOnHover": false,
  }).mask(telephone);
}

//========================================================================================================================================================

//Наблюдатель
class ScrollWatcher {
  constructor(props) {
    let defaultConfig = {
      logging: true,
    }
    this.config = Object.assign(defaultConfig, props);
    this.observer;
    !document.documentElement.classList.contains('watcher') ? this.scrollWatcherRun() : null;
  }
  scrollWatcherUpdate() {
    this.scrollWatcherRun();
  }
  scrollWatcherRun() {
    document.documentElement.classList.add('watcher');
    this.scrollWatcherConstructor(document.querySelectorAll('[data-watch]'));
  }
  scrollWatcherConstructor(items) {
    if (items.length) {
      let uniqParams = uniqArray(Array.from(items).map(function (item) {
        if (item.dataset.watch === 'navigator' && !item.dataset.watchThreshold) {
          let valueOfThreshold;
          if (item.clientHeight > 2) {
            valueOfThreshold =
              window.innerHeight / 2 / (item.clientHeight - 1);
            if (valueOfThreshold > 1) {
              valueOfThreshold = 1;
            }
          } else {
            valueOfThreshold = 1;
          }
          item.setAttribute(
            'data-watch-threshold',
            valueOfThreshold.toFixed(2)
          );
        }
        return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : '0px'}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
      }));
      uniqParams.forEach(uniqParam => {
        let uniqParamArray = uniqParam.split('|');
        let paramsWatch = {
          root: uniqParamArray[0],
          margin: uniqParamArray[1],
          threshold: uniqParamArray[2]
        }
        let groupItems = Array.from(items).filter(function (item) {
          let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
          let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : '0px';
          let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
          if (
            String(watchRoot) === paramsWatch.root &&
            String(watchMargin) === paramsWatch.margin &&
            String(watchThreshold) === paramsWatch.threshold
          ) {
            return item;
          }
        });

        let configWatcher = this.getScrollWatcherConfig(paramsWatch);

        this.scrollWatcherInit(groupItems, configWatcher);
      });
    }
  }
  getScrollWatcherConfig(paramsWatch) {
    let configWatcher = {}
    if (document.querySelector(paramsWatch.root)) {
      configWatcher.root = document.querySelector(paramsWatch.root);
    }
    configWatcher.rootMargin = paramsWatch.margin;
    if (paramsWatch.margin.indexOf('px') < 0 && paramsWatch.margin.indexOf('%') < 0) {
      return
    }
    if (paramsWatch.threshold === 'prx') {
      paramsWatch.threshold = [];
      for (let i = 0; i <= 1.0; i += 0.005) {
        paramsWatch.threshold.push(i);
      }
    } else {
      paramsWatch.threshold = paramsWatch.threshold.split(',');
    }
    configWatcher.threshold = paramsWatch.threshold;

    return configWatcher;
  }
  scrollWatcherCreate(configWatcher) {
    console.log(configWatcher);
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        this.scrollWatcherCallback(entry, observer);
      });
    }, configWatcher);
  }
  scrollWatcherInit(items, configWatcher) {
    this.scrollWatcherCreate(configWatcher);
    items.forEach(item => this.observer.observe(item));
  }
  scrollWatcherIntersecting(entry, targetElement) {
    if (entry.isIntersecting) {
      !targetElement.classList.contains('_watcher-view') ? targetElement.classList.add('_watcher-view') : null;
    } else {
      targetElement.classList.contains('_watcher-view') ? targetElement.classList.remove('_watcher-view') : null;
    }
  }
  scrollWatcherOff(targetElement, observer) {
    observer.unobserve(targetElement);
  }
  scrollWatcherCallback(entry, observer) {
    const targetElement = entry.target;
    this.scrollWatcherIntersecting(entry, targetElement);
    targetElement.hasAttribute('data-watch-once') && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
    document.dispatchEvent(new CustomEvent("watcherCallback", {
      detail: {
        entry: entry
      }
    }));
  }
}
modules_flsModules.watcher = new ScrollWatcher({});

//========================================================================================================================================================

//Прокрутка к блоку
let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
  const targetBlockElement = document.querySelector(targetBlock);

  if (!targetBlockElement) {
    console.warn(`Element ${targetBlock} not found`);
    return;
  }

  let headerItem = '';
  let headerItemHeight = 0;

  if (noHeader) {
    headerItem = 'header.header';
    const headerElement = document.querySelector(headerItem);
    if (headerElement) {
      if (!headerElement.classList.contains('_header-scroll')) {
        headerElement.style.cssText = `transition-duration: 0s;`;
        headerElement.classList.add('_header-scroll');
        headerItemHeight = headerElement.offsetHeight;
        headerElement.classList.remove('_header-scroll');
        setTimeout(() => {
          headerElement.style.cssText = ``;
        }, 0);
      } else {
        headerItemHeight = headerElement.offsetHeight;
      }
    }
  }

  if (document.documentElement.classList.contains("menu-open")) {
    if (typeof menuClose === 'function') {
      menuClose();
    }
  }

  if (typeof SmoothScroll !== 'undefined') {
    let options = {
      speedAsDuration: true,
      speed: speed,
      header: headerItem,
      offset: offsetTop,
      easing: 'easeOutQuad',
    };
    new SmoothScroll().animateScroll(targetBlockElement, '', options);
  } else {
    let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + window.scrollY;

    if (headerItemHeight) {
      targetBlockElementPosition -= headerItemHeight;
    }

    if (offsetTop) {
      targetBlockElementPosition -= offsetTop;
    }

    window.scrollTo({
      top: targetBlockElementPosition,
      behavior: "smooth"
    });
  }
};
function pageNavigation() {
  document.addEventListener("click", pageNavigationAction);
  document.addEventListener("watcherCallback", pageNavigationAction);

  function pageNavigationAction(e) {
    if (e.type === "click") {
      const targetElement = e.target;
      const gotoLink = targetElement.closest('[data-goto]');

      if (gotoLink) {
        const gotoLinkSelector = gotoLink.dataset.goto || '';
        const noHeader = gotoLink.hasAttribute('data-goto-header');
        const gotoSpeed = gotoLink.dataset.gotoSpeed ? parseInt(gotoLink.dataset.gotoSpeed) : 500;
        const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;

        if (window.modules_flsModules && modules_flsModules.fullpage) {
          const fullpageSection = document.querySelector(`${gotoLinkSelector}`)?.closest('[data-fp-section]');
          const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;

          if (fullpageSectionId !== null) {
            modules_flsModules.fullpage.switchingSection(fullpageSectionId);
            if (document.documentElement.classList.contains("menu-open") && typeof menuClose === 'function') {
              menuClose();
            }
          }
        } else {
          gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
        }

        e.preventDefault();
      }
    } else if (e.type === "watcherCallback" && e.detail) {
      const entry = e.detail.entry;
      const targetElement = entry.target;

      if (targetElement.dataset.watch === 'navigator') {
        document.querySelectorAll('[data-goto]._navigator-active').forEach(el => {
          el.classList.remove('_navigator-active');
        });

        const navigatorLinks = findNavigatorLinks(targetElement);
        navigatorLinks.forEach(link => {
          if (entry.isIntersecting) {
            link.classList.add('_navigator-active');
          } else {
            link.classList.remove('_navigator-active');
          }
        });
      }
    }
  }

  function findNavigatorLinks(element) {
    const links = [];

    if (element.id) {
      const idLinks = document.querySelectorAll(`[data-goto="#${element.id}"]`);
      links.push(...idLinks);
    }

    if (element.classList.length) {
      element.classList.forEach(className => {
        const classLinks = document.querySelectorAll(`[data-goto=".${className}"]`);
        links.push(...classLinks);
      });
    }

    return links;
  }
}
pageNavigation();

//========================================================================================================================================================

// Добавление к шапке при скролле
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      header.classList.add('_header-scroll');
      document.documentElement.classList.add('header-scroll');
    } else {
      header.classList.remove('_header-scroll');
      document.documentElement.classList.remove('header-scroll');
    }
  });
}

//========================================================================================================================================================

//Попап
class Popup {
  constructor(options) {
    let config = {
      logging: true,
      init: true,
      attributeOpenButton: "data-popup",
      attributeCloseButton: "data-close",
      fixElementSelector: "[data-lp]",
      youtubeAttribute: "data-popup-youtube",
      youtubePlaceAttribute: "data-popup-youtube-place",
      setAutoplayYoutube: true,
      classes: {
        popup: "popup",
        popupContent: "popup__content",
        popupActive: "popup_show",
        bodyActive: "popup-show"
      },
      focusCatch: true,
      closeEsc: true,
      bodyLock: true,
      hashSettings: {
        goHash: true
      },
      on: {
        beforeOpen: function () { },
        afterOpen: function () { },
        beforeClose: function () { },
        afterClose: function () { }
      }
    };
    this.youTubeCode;
    this.isOpen = false;
    this.targetOpen = {
      selector: false,
      element: false
    };
    this.previousOpen = {
      selector: false,
      element: false
    };
    this.lastClosed = {
      selector: false,
      element: false
    };
    this._dataValue = false;
    this.hash = false;
    this._reopen = false;
    this._selectorOpen = false;
    this.lastFocusEl = false;
    this._focusEl = ["a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'];
    this.options = {
      ...config,
      ...options,
      classes: {
        ...config.classes,
        ...options?.classes
      },
      hashSettings: {
        ...config.hashSettings,
        ...options?.hashSettings
      },
      on: {
        ...config.on,
        ...options?.on
      }
    };
    this.bodyLock = false;
    this.options.init ? this.initPopups() : null;
  }
  initPopups() {
    this.eventsPopup();
  }
  eventsPopup() {
    document.addEventListener("click", function (e) {
      const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
      if (buttonOpen) {
        e.preventDefault();
        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
        if ("error" !== this._dataValue) {
          if (!this.isOpen) this.lastFocusEl = buttonOpen;
          this.targetOpen.selector = `${this._dataValue}`;
          this._selectorOpen = true;
          this.open();
          return;
        }
        return;
      }
      const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
      if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
    }.bind(this));
    document.addEventListener("keydown", function (e) {
      if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
      if (this.options.focusCatch && 9 == e.which && this.isOpen) {
        this._focusCatch(e);
        return;
      }
    }.bind(this));
    if (this.options.hashSettings.goHash) {
      window.addEventListener("hashchange", function () {
        if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
      }.bind(this));
      window.addEventListener("load", function () {
        if (window.location.hash) this._openToHash();
      }.bind(this));
    }
  }
  open(selectorValue) {
    if (bodyLockStatus) {
      this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
      if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
        this.targetOpen.selector = selectorValue;
        this._selectorOpen = true;
      }
      if (this.isOpen) {
        this._reopen = true;
        this.close();
      }
      if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
      if (!this._reopen) this.previousActiveElement = document.activeElement;
      this.targetOpen.element = document.querySelector(this.targetOpen.selector);
      if (this.targetOpen.element) {
        if (this.youTubeCode) {
          const codeVideo = this.youTubeCode;
          const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
          const iframe = document.createElement("iframe");
          iframe.setAttribute("allowfullscreen", "");
          const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
          iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
          iframe.setAttribute("src", urlVideo);
          if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
          }
          this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
        }
        const videoElement = this.targetOpen.element.querySelector("video");
        if (videoElement) {
          videoElement.muted = true;
          videoElement.currentTime = 0;
          videoElement.play().catch((e => console.error("Autoplay error:", e)));
        }
        if (this.options.hashSettings.location) {
          this._getHash();
          this._setHash();
        }
        this.options.on.beforeOpen(this);
        document.dispatchEvent(new CustomEvent("beforePopupOpen", {
          detail: {
            popup: this
          }
        }));
        this.targetOpen.element.classList.add(this.options.classes.popupActive);
        document.documentElement.classList.add(this.options.classes.bodyActive);
        if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
        this.targetOpen.element.setAttribute("aria-hidden", "false");
        this.previousOpen.selector = this.targetOpen.selector;
        this.previousOpen.element = this.targetOpen.element;
        this._selectorOpen = false;
        this.isOpen = true;
        this.options.on.afterOpen(this);
        document.dispatchEvent(new CustomEvent("afterPopupOpen", {
          detail: {
            popup: this
          }
        }));
      }
    }
  }
  close(selectorValue) {
    if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
    if (!this.isOpen || !bodyLockStatus) return;
    this.options.on.beforeClose(this);
    document.dispatchEvent(new CustomEvent("beforePopupClose", {
      detail: {
        popup: this
      }
    }));
    if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
    this.previousOpen.element.classList.remove(this.options.classes.popupActive);
    const videoElement = this.previousOpen.element.querySelector("video");
    if (videoElement) videoElement.pause();
    this.previousOpen.element.setAttribute("aria-hidden", "true");
    if (!this._reopen) {
      document.documentElement.classList.remove(this.options.classes.bodyActive);
      !this.bodyLock ? bodyUnlock() : null;
      this.isOpen = false;
    }
    document.dispatchEvent(new CustomEvent("afterPopupClose", {
      detail: {
        popup: this
      }
    }));
  }
  _getHash() {
    if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
  }
  _openToHash() {
    let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
    const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
    if (buttons && classInHash) this.open(classInHash);
  }
  _setHash() {
    history.pushState("", "", this.hash);
  }
  _removeHash() {
    history.pushState("", "", window.location.href.split("#")[0]);
  }
  _focusCatch(e) {
    const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);
    if (e.shiftKey && 0 === focusedIndex) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }
}
//modules_flsModules.popup = new Popup({});

function menuOpen() {
  bodyLock();
  document.documentElement.classList.add("menu-open");
}
function menuClose() {
  bodyUnlock();
  document.documentElement.classList.remove("menu-open");
}

//========================================================================================================================================================

//Форма
function formFieldsInit(options = { viewPass: true, autoHeight: false }) {
  document.body.addEventListener("focusin", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.add('_form-focus');
        targetElement.parentElement.classList.add('_form-focus');
      }
      formValidate.removeError(targetElement);
      targetElement.hasAttribute('data-validate') ? formValidate.removeError(targetElement) : null;
    }
  });
  document.body.addEventListener("focusout", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.remove('_form-focus');
        targetElement.parentElement.classList.remove('_form-focus');
      }
      if (targetElement.value.trim()) {
        targetElement.parentElement.classList.add('filled');
      } else {
        targetElement.parentElement.classList.remove('filled');
      }
      targetElement.hasAttribute('data-validate') ? formValidate.validateInput(targetElement) : null;
    }
  });
  if (options.viewPass) {
    document.addEventListener("click", function (e) {
      const targetElement = e.target;
      if (targetElement.closest('.form__viewpass')) {
        const viewpassBlock = targetElement.closest('.form__viewpass');
        const input = viewpassBlock.closest('.form__input').querySelector('input');

        if (input) {
          const isActive = viewpassBlock.classList.contains('_viewpass-active');
          input.setAttribute("type", isActive ? "password" : "text");
          viewpassBlock.classList.toggle('_viewpass-active');
        } else {
          console.error('Input не найден!');
        }
      }
    });
  }
  if (options.autoHeight) {
    const textareas = document.querySelectorAll('textarea[data-autoheight]');
    if (textareas.length) {
      textareas.forEach(textarea => {
        const startHeight = textarea.hasAttribute('data-autoheight-min') ?
          Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
        const maxHeight = textarea.hasAttribute('data-autoheight-max') ?
          Number(textarea.dataset.autoheightMax) : Infinity;
        setHeight(textarea, Math.min(startHeight, maxHeight))
        textarea.addEventListener('input', () => {
          if (textarea.scrollHeight > startHeight) {
            textarea.style.height = `auto`;
            setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
          }
        });
      });
      function setHeight(textarea, height) {
        textarea.style.height = `${height}px`;
      }
    }
  }
}
formFieldsInit({
  viewPass: true,
  autoHeight: false
});

let formValidate = {
  getErrors(form) {
    let error = 0;
    let formRequiredItems = form.querySelectorAll('*[data-required]');
    if (formRequiredItems.length) {
      formRequiredItems.forEach(formRequiredItem => {
        if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
          error += this.validateInput(formRequiredItem);
        }
      });
    }
    return error;
  },
  validateInput(formRequiredItem) {
    let error = 0;

    if (formRequiredItem.dataset.required === "email") {
      formRequiredItem.value = formRequiredItem.value.replace(" ", "");
      if (this.emailTest(formRequiredItem)) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
      this.addError(formRequiredItem);
      this.removeSuccess(formRequiredItem);
      error++;
    } else if (formRequiredItem.dataset.validate === "password-confirm") {
      const passwordInput = document.getElementById('password');
      if (!passwordInput) return error;

      if (formRequiredItem.value !== passwordInput.value) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else {
      if (!formRequiredItem.value.trim()) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    }

    return error;
  },
  addError(formRequiredItem) {
    formRequiredItem.classList.add('_form-error');
    formRequiredItem.parentElement.classList.add('_form-error');
    let inputError = formRequiredItem.parentElement.querySelector('.form__error');
    if (inputError) formRequiredItem.parentElement.removeChild(inputError);
    if (formRequiredItem.dataset.error) {
      formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
    }
    formRequiredItem.parentElement.classList.remove('filled');
  },
  removeError(formRequiredItem) {
    formRequiredItem.classList.remove('_form-error');
    formRequiredItem.parentElement.classList.remove('_form-error');
    if (formRequiredItem.parentElement.querySelector('.form__error')) {
      formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
    }
  },
  addSuccess(formRequiredItem) {
    formRequiredItem.classList.add('_form-success');
    formRequiredItem.parentElement.classList.add('_form-success');
    if (formRequiredItem.value.trim()) {
      formRequiredItem.parentElement.classList.add('filled');
    }
  },
  removeSuccess(formRequiredItem) {
    formRequiredItem.classList.remove('_form-success');
    formRequiredItem.parentElement.classList.remove('_form-success');
    formRequiredItem.parentElement.classList.remove('filled');
  },
  formClean(form) {
    form.reset();
    setTimeout(() => {
      let inputs = form.querySelectorAll('input,textarea');
      for (let index = 0; index < inputs.length; index++) {
        const el = inputs[index];
        el.parentElement.classList.remove('_form-focus');
        el.classList.remove('_form-focus');

        el.classList.remove('_form-success');
        el.parentElement.classList.remove('_form-success');

        el.parentElement.classList.remove('filled');

        formValidate.removeError(el);

        if (el.classList.contains('telephone') && el.clearFilled) {
          el.clearFilled();
        }
      }

      let checkboxes = form.querySelectorAll('.checkbox__input');
      if (checkboxes.length > 0) {
        for (let index = 0; index < checkboxes.length; index++) {
          const checkbox = checkboxes[index];
          checkbox.checked = false;
          checkbox.classList.remove('_form-success');
          checkbox.closest('.checkbox')?.classList.remove('_form-success');
        }
      }

      if (modules_flsModules.select) {
        let selects = form.querySelectorAll('div.select');
        if (selects.length) {
          for (let index = 0; index < selects.length; index++) {
            const select = selects[index].querySelector('select');
            modules_flsModules.select.selectBuild(select);
          }
        }
      }
    }, 0);
  },
  emailTest(formRequiredItem) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
  }
};

function formSubmit() {
  const forms = document.forms;
  if (forms.length) {
    for (const form of forms) {
      form.addEventListener('submit', function (e) {
        const form = e.target;
        formSubmitAction(form, e);
      });
      form.addEventListener('reset', function (e) {
        const form = e.target;
        formValidate.formClean(form);
      });
    }
  }

  async function formSubmitAction(form, e) {
    const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;

    if (error === 0) {
      const ajax = form.hasAttribute('data-ajax');

      if (ajax) {
        e.preventDefault();

        const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
        const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
        const formData = new FormData(form);

        form.classList.add('_sending');

        try {
          const response = await fetch(formAction, {
            method: formMethod,
            body: formData
          });

          const textResponse = await response.text();

          form.classList.remove('_sending');

          let responseResult = {};
          let isJson = false;

          try {
            responseResult = JSON.parse(textResponse);
            isJson = true;
          } catch (jsonError) {
            console.error('Сервер вернул не JSON:', textResponse);
          }

          if (response.ok) {
            if (isJson && responseResult.message) {
              console.log('Успех:', responseResult.message);
            }

            formSent(form, responseResult);
          } else {
            console.error('Ошибка сервера:', response.status);
          }

        } catch (fetchError) {
          console.error('Ошибка сети:', fetchError);
          form.classList.remove('_sending');
        }

      } else if (form.hasAttribute('data-dev')) {
        e.preventDefault();
        formSent(form);
      }
    } else {
      e.preventDefault();

      if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
        const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';
        gotoBlock(formGoToErrorClass, true, 1000);
      }
    }
  }

  function formSent(form, responseResult = {}) {
    formValidate.formClean(form);

    const telephoneInputs = form.querySelectorAll('.telephone');
    telephoneInputs.forEach(input => {
      const parent = input.closest('.form__input');
      if (parent) {
        parent.classList.remove('filled');
      }
    });

    form.reset();
    form.classList.remove('_sending');

    const popupMessage = form.dataset.popupMessage;

    if (popupMessage) {

      if (window.modules_flsModules && window.modules_flsModules.popup) {
        try {
          const popupElement = document.querySelector(popupMessage);

          if (popupElement) {
            window.modules_flsModules.popup.open(popupMessage);
          } else {
            console.error('Popup element not found:', popupMessage);
          }
        } catch (error) {
          console.error('Error opening popup:', error);
        }
      } else {
        console.warn('Popup module not found');
      }
    } else {
      console.log('Форма успешно отправлена');
    }

    document.dispatchEvent(new CustomEvent("formSent", {
      detail: {
        form: form,
        response: responseResult
      }
    }));
  }
}

if (typeof window.modules_flsModules === 'undefined') {
  window.modules_flsModules = {};
}
window.modules_flsModules.popup = new Popup({});
formSubmit();

//========================================================================================================================================================

const mapElement = document.querySelector('#map');
if (mapElement) {
  const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mapObserver.unobserve(mapElement);

        if (typeof ymaps === 'undefined') {
          const script = document.createElement('script');
          script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
          script.async = true;

          script.onload = () => {
            if (typeof ymaps !== 'undefined') {
              ymaps.ready(safeInitMap);
            }
          };

          script.onerror = () => {
            console.error('Yandex Maps failed to load');
          };

          document.head.appendChild(script);
        } else {
          ymaps.ready(safeInitMap);
        }
      }
    });
  }, {
    rootMargin: '0px 0px 200px 0px'
  });

  mapObserver.observe(mapElement);
}
function safeInitMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement || mapElement.dataset.initialized === 'true') return;

  try {
    const preview = mapElement.querySelector('.map-preview');
    if (preview) preview.remove();

    const myMap = new ymaps.Map('map', {
      center: [53.209163, 50.126631],
      zoom: 17,
      controls: ['zoomControl']
    });

    // Метка
    const placemark = new ymaps.Placemark([53.209163, 50.126631], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/icons/map.svg',
      iconImageSize: [100, 100],
      iconImageOffset: [-50, -50]
    });

    myMap.geoObjects.add(placemark);
    mapElement.dataset.initialized = 'true';

  } catch (error) {
    console.error("Map init error:", error);
  }
}

//========================================================================================================================================================

const fileInput = document.querySelector('.form-file-button input');
const filesContainer = document.querySelector('.form-files');

if (fileInput) {
  function updateContainerVisibility() {
    const hasFiles = filesContainer.querySelectorAll('.form-file').length > 0;
    filesContainer.style.display = hasFiles ? 'flex' : 'none';
  }

  function addFiles(files) {
    Array.from(files).forEach(file => {
      const fileElement = document.createElement('div');
      fileElement.className = 'form-file';

      const nameSpan = document.createElement('span');
      nameSpan.textContent = file.name;
      fileElement.appendChild(nameSpan);

      const closeBtn = document.createElement('span');
      closeBtn.className = 'form-file-close';
      closeBtn.textContent = '×';

      closeBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        fileElement.remove();
        updateContainerVisibility();
      });

      fileElement.appendChild(closeBtn);
      filesContainer.appendChild(fileElement);
    });

    updateContainerVisibility();
  }
  fileInput.addEventListener('change', function (e) {
    addFiles(this.files);
    this.value = '';
  });
  updateContainerVisibility();
}

//========================================================================================================================================================

if (document.querySelector('.images-product')) {
  const thumbsSwiper = new Swiper('.images-product__thumb', {
    observer: true,
    observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 10,
    speed: 400,
    preloadImages: true,
    breakpoints: {
      768: {
        spaceBetween: 15,
      },
    },
  });

  const mainThumbsSwiper = new Swiper('.images-product__slider', {
    thumbs: {
      swiper: thumbsSwiper
    },
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 400,
    preloadImages: true,
    navigation: {
      prevEl: '.images-product__arrow-prev',
      nextEl: '.images-product__arrow-next',
    },
  });
}

//========================================================================================================================================================

const buttons = document.querySelectorAll('.product-card-question__button');

if (buttons) {
  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      if (window.innerWidth <= 992) {
        e.stopPropagation();
        const parent = this.closest('.product-card-question');
        if (parent) {
          parent.classList.toggle('active');
        }
      }
    });
  });
  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 992) {
      const target = e.target.closest('.product-card-question');

      if (!target) {
        const allBlocks = document.querySelectorAll('.product-card-question.active');
        allBlocks.forEach(block => {
          const button = block.querySelector('.product-card-question__button');
          if (button && !button.contains(e.target)) {
            block.classList.remove('active');
          }
        });
      }
    }
  });
}

//========================================================================================================================================================

class SelectConstructor {
  constructor(props, data = null) {
    let defaultConfig = {
      init: true,
      logging: true,
      speed: 150
    }
    this.config = Object.assign(defaultConfig, props);
    this.selectClasses = {
      classSelect: "select",
      classSelectBody: "select__body",
      classSelectTitle: "select__title",
      classSelectValue: "select__value",
      classSelectLabel: "select__label",
      classSelectInput: "select__input",
      classSelectText: "select__text",
      classSelectLink: "select__link",
      classSelectOptions: "select__options",
      classSelectOption: "select__option",
      classSelectContent: "select__content",
      classSelectRow: "select__row",
      classSelectData: "select__asset",
      classSelectArrow: "select__arrow",
      classSelectDisabled: "_select-disabled",
      classSelectTag: "_select-tag",
      classSelectOpen: "_select-open",
      classSelectActive: "_select-active",
      classSelectFocus: "_select-focus",
      classSelectMultiple: "_select-multiple",
      classSelectCheckBox: "_select-checkbox",
      classSelectOptionSelected: "_select-selected",
      classSelectPseudoLabel: "_select-pseudo-label",
    }
    this._this = this;
    if (this.config.init) {
      const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll('select');
      if (selectItems.length) {
        this.selectsInit(selectItems);
      }
    }
  }
  getSelectClass(className) {
    return `.${className}`;
  }
  getSelectElement(selectItem, className) {
    return {
      originalSelect: selectItem.querySelector('select'),
      selectElement: selectItem.querySelector(this.getSelectClass(className)),
    }
  }
  selectsInit(selectItems) {
    selectItems.forEach((originalSelect, index) => {
      this.selectInit(originalSelect, index + 1);
    });
    document.addEventListener('click', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('keydown', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('focusin', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('focusout', function (e) {
      this.selectsActions(e);
    }.bind(this));
  }
  selectInit(originalSelect, index) {
    const _this = this;
    let selectItem = document.createElement("div");
    selectItem.classList.add(this.selectClasses.classSelect);
    originalSelect.parentNode.insertBefore(selectItem, originalSelect);
    selectItem.appendChild(originalSelect);
    originalSelect.hidden = true;
    index ? originalSelect.dataset.id = index : null;

    selectItem.insertAdjacentHTML('beforeend', `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);

    if (this.getSelectPlaceholder(originalSelect)) {
      originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
    }

    this.selectBuild(originalSelect);

    originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : this.config.speed;
    this.config.speed = +originalSelect.dataset.speed;

    originalSelect.addEventListener('change', function (e) {
      _this.selectChange(e);
    });
  }
  selectBuild(originalSelect) {
    const selectItem = originalSelect.parentElement;

    selectItem.dataset.id = originalSelect.dataset.id;
    originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;

    originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);

    originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);

    this.setSelectTitleValue(selectItem, originalSelect);
    this.setOptions(selectItem, originalSelect);
    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;

    originalSelect.hasAttribute('data-open') ? this.selectAction(selectItem) : null;

    this.selectDisabled(selectItem, originalSelect);
  }
  selectsActions(e) {
    const targetElement = e.target;
    const targetType = e.type;
    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
      const selectItem = targetElement.closest('.select') ? targetElement.closest('.select') : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
      const originalSelect = this.getSelectElement(selectItem).originalSelect;
      if (targetType === 'click') {
        if (!originalSelect.disabled) {
          if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {

            const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
            const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
            this.optionAction(selectItem, originalSelect, optionItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) {
            this.selectAction(selectItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
            const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
            this.optionAction(selectItem, originalSelect, optionItem);
          }
        }
      } else if (targetType === 'focusin' || targetType === 'focusout') {
        if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
          targetType === 'focusin' ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
        }
      } else if (targetType === 'keydown' && e.code === 'Escape') {
        this.selectsСlose();
      }
    } else {
      this.selectsСlose();
    }
  }
  selectsСlose(selectOneGroup) {
    const selectsGroup = selectOneGroup ? selectOneGroup : document;
    const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
    if (selectActiveItems.length) {
      selectActiveItems.forEach(selectActiveItem => {
        this.selectСlose(selectActiveItem);
      });
    }
  }
  selectСlose(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    if (!selectOptions.classList.contains('_slide')) {
      selectItem.classList.remove(this.selectClasses.classSelectOpen);
      _slideUp(selectOptions, originalSelect.dataset.speed);
      setTimeout(() => {
        selectItem.style.zIndex = '';
      }, originalSelect.dataset.speed);
    }
  }
  selectAction(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOpenzIndex = originalSelect.dataset.zIndex ? originalSelect.dataset.zIndex : 3;

    this.setOptionsPosition(selectItem);

    this.selectsСlose();

    setTimeout(() => {
      if (!selectOptions.classList.contains('_slide')) {
        selectItem.classList.toggle(this.selectClasses.classSelectOpen);
        _slideToggle(selectOptions, originalSelect.dataset.speed);

        if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
          selectItem.style.zIndex = selectOpenzIndex;
        } else {
          setTimeout(() => {
            selectItem.style.zIndex = '';
          }, originalSelect.dataset.speed);
        }
      }
    }, 0);
  }
  setSelectTitleValue(selectItem, originalSelect) {
    const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
    if (selectItemTitle) selectItemTitle.remove();
    selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));

    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
  }
  getSelectTitleValue(selectItem, originalSelect) {
    let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
    const selectedOptions = this.getSelectedOptionsData(originalSelect);

    if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
      selectTitleValue = selectedOptions.elements.map(option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="${this.selectClasses.classSelectTag}">${this.getSelectElementContent(option)}</span>`).join('');

      if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
        document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
        if (originalSelect.hasAttribute('data-search')) selectTitleValue = false;
      }
    }

    if (selectedOptions.values.length > 0) {
      selectTitleValue = selectTitleValue.length ? selectTitleValue : '';
    } else {
      selectTitleValue = originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : '';
    }

    let pseudoAttribute = '';
    let pseudoAttributeClass = '';
    if (originalSelect.hasAttribute('data-pseudo-label')) {
      pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заповніть атрибут"`;
      pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
    }

    selectedOptions.values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);

    if (originalSelect.hasAttribute('data-search')) {
      return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
    } else {
      const customClass = selectedOptions.elements.length && selectedOptions.elements[0] && selectedOptions.elements[0].dataset.class ? ` ${selectedOptions.elements[0].dataset.class}` : '';

      return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span><span class="${this.selectClasses.classSelectArrow}"></span></span></button>`;
    }
  }
  getSelectElementContent(selectOption) {
    const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : '';
    const selectOptionDataHTML = selectOptionData.indexOf('img') >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
    let selectOptionContentHTML = ``;
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : '';
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : '';
    selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : '';
    selectOptionContentHTML += selectOption.textContent;
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    return selectOptionContentHTML;
  }
  getSelectPlaceholder(originalSelect) {
    const selectPlaceholder = Array.from(originalSelect.options).find(option => !option.value);
    if (selectPlaceholder) {
      return {
        value: selectPlaceholder.textContent,
        show: selectPlaceholder.hasAttribute("data-show"),
        label: {
          show: selectPlaceholder.hasAttribute("data-label"),
          text: selectPlaceholder.dataset.label
        }
      }
    }
  }

  getSelectedOptionsData(originalSelect, type) {
    let selectedOptions = [];
    if (originalSelect.multiple) {
      selectedOptions = Array.from(originalSelect.options).filter(option => option.value).filter(option => option.selected);
    } else {
      if (originalSelect.selectedIndex >= 0 && originalSelect.options[originalSelect.selectedIndex]) {
        const option = originalSelect.options[originalSelect.selectedIndex];
        if (option.value) {
          selectedOptions.push(option);
        }
      }
    }
    return {
      elements: selectedOptions.map(option => option),
      values: selectedOptions.filter(option => option && option.value).map(option => option.value),
      html: selectedOptions.map(option => this.getSelectElementContent(option))
    }
  }
  getOptions(originalSelect) {
    let selectOptions = Array.from(originalSelect.options);
    if (selectOptions.length > 0) {
      let selectOptionsHTML = ``;

      selectOptions = selectOptions.filter(option => option.value);

      selectOptions.forEach(selectOption => {
        selectOptionsHTML += this.getOption(selectOption, originalSelect);
      });
      return selectOptionsHTML;
    }
  }
  getOption(selectOption, originalSelect) {
    const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : '';

    const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute('data-show-selected') && !originalSelect.multiple && selectOption.value ? `hidden` : ``;

    const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : '';
    const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
    const selectOptionLinkTarget = selectOption.hasAttribute('data-href-blank') ? `target="_blank"` : '';
    let selectOptionHTML = ``;
    selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
    selectOptionHTML += this.getSelectElementContent(selectOption);
    selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
    return selectOptionHTML;
  }
  setOptions(selectItem, originalSelect) {
    const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    selectItemOptions.innerHTML = this.getOptions(originalSelect);
  }
  setOptionsPosition(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOptionsPosMargin = +originalSelect.dataset.optionsMargin ? +originalSelect.dataset.optionsMargin : 10;

    if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
      selectOptions.hidden = false;
      const selectOptionsHeight = selectOptions.offsetHeight;
      selectOptions.hidden = true;

      const selectItemHeight = selectItem.offsetHeight;
      const selectItemPos = selectItem.getBoundingClientRect().top;
      const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight;
      const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);

      if (selectItemResult < 0) {
        selectItem.classList.add('select--show-top');
      } else {
        selectItem.classList.remove('select--show-top');
      }
    } else {
      setTimeout(() => {
        selectItem.classList.remove('select--show-top');
      }, +originalSelect.dataset.speed);
    }
  }
  optionAction(selectItem, originalSelect, optionItem) {
    const selectOptions = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
    if (!selectOptions.classList.contains('_slide')) {
      if (originalSelect.multiple) {
        optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
        const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
        originalSelectSelectedItems.forEach(originalSelectSelectedItem => {
          originalSelectSelectedItem.removeAttribute('selected');
        });
        const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
        selectSelectedItems.forEach(selectSelectedItems => {
          originalSelect.querySelector(`option[value = "${selectSelectedItems.dataset.value}"]`).setAttribute('selected', 'selected');
        });
      } else {
        if (optionItem.dataset.value) {
          if (!originalSelect.hasAttribute('data-show-selected')) {
            setTimeout(() => {
              if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) {
                selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
              }
              optionItem.hidden = true;
            }, this.config.speed);
          }
          originalSelect.value = optionItem.dataset.value;
          this.selectAction(selectItem);
        }
      }
      this.setSelectTitleValue(selectItem, originalSelect);
      this.setSelectChange(originalSelect);
    }
  }
  selectChange(e) {
    const originalSelect = e.target;
    this.selectBuild(originalSelect);
    this.setSelectChange(originalSelect);
  }
  setSelectChange(originalSelect) {
    if (originalSelect.hasAttribute('data-validate')) {
      if (window.formValidate) {
        window.formValidate.validateInput(originalSelect);
      }
    }
    if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
      let tempButton = document.createElement("button");
      tempButton.type = "submit";
      const form = originalSelect.closest('form');
      if (form) {
        form.appendChild(tempButton);
        tempButton.click();
        tempButton.remove();
      }
    }
    const selectItem = originalSelect.parentElement;
    this.selectCallback(selectItem, originalSelect);
  }
  selectDisabled(selectItem, originalSelect) {
    if (originalSelect.disabled) {
      selectItem.classList.add(this.selectClasses.classSelectDisabled);
      const titleElement = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
      if (titleElement) titleElement.disabled = true;
    } else {
      selectItem.classList.remove(this.selectClasses.classSelectDisabled);
      const titleElement = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
      if (titleElement) titleElement.disabled = false;
    }
  }
  searchActions(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption} `);
    const _this = this;
    selectInput.addEventListener("input", function () {
      selectOptionsItems.forEach(selectOptionsItem => {
        if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) {
          selectOptionsItem.hidden = false;
        } else {
          selectOptionsItem.hidden = true;
        }
      });
      selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
    });
  }
  selectCallback(selectItem, originalSelect) {
    document.dispatchEvent(new CustomEvent("selectCallback", {
      detail: {
        select: originalSelect
      }
    }));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    window.modules_flsModules = window.modules_flsModules || {};
    modules_flsModules.select = new SelectConstructor({});
  });
} else {
  window.modules_flsModules = window.modules_flsModules || {};
  modules_flsModules.select = new SelectConstructor({});
}

//========================================================================================================================================================

function spollers() {
  const spollersArray = document.querySelectorAll("[data-spollers]");
  if (spollersArray.length > 0) {
    const spollersRegular = Array.from(spollersArray).filter((function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    }));
    if (spollersRegular.length) initSpollers(spollersRegular);

    spollersArray.forEach(spollersBlock => {
      const mediaQuery = spollersBlock.dataset.spollers;
      if (mediaQuery) {
        const [width, type] = mediaQuery.split(",");
        const size = parseInt(width);
        const trimmedType = type ? type.trim() : '';

        if (trimmedType === "min") {
          if (window.innerWidth >= size) {
            if (!spollersBlock.classList.contains("_spoller-init")) {
              initSpollers([spollersBlock]);
            }
          } else {
            if (spollersBlock.classList.contains("_spoller-init")) {
              spollersBlock.classList.remove("_spoller-init");
              showAllContent(spollersBlock);
              spollersBlock.removeEventListener("click", setSpollerAction);
            }
          }
        }
        else if (trimmedType === "max" && window.innerWidth <= size) {
          if (!spollersBlock.classList.contains("_spoller-init")) {
            initSpollers([spollersBlock]);
          }
        } else if (trimmedType === "max" && window.innerWidth > size) {
          if (spollersBlock.classList.contains("_spoller-init")) {
            spollersBlock.classList.remove("_spoller-init");
            showAllContent(spollersBlock);
            spollersBlock.removeEventListener("click", setSpollerAction);
          }
        }
      }
    });

    function showAllContent(spollersBlock) {
      const allTexts = spollersBlock.querySelectorAll('.block-compound-spollers__text');
      allTexts.forEach(text => {
        text.hidden = false;
        text.style.display = 'block';
        text.style.height = 'auto';
        text.style.opacity = '1';
      });

      const allTitles = spollersBlock.querySelectorAll('[data-spoller]');
      allTitles.forEach(title => {
        title.classList.remove('_spoller-active');
        const parent = title.parentElement;
        if (parent) {
          parent.classList.remove('_spoller-active');
        }
      });

      const allSlides = spollersBlock.querySelectorAll('.block-compound-spollers__slide');
      allSlides.forEach(slide => {
        slide.classList.remove('_spoller-active');
      });
    }

    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("_spoller-init");
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);

          initCloseButtons(spollersBlock);
        } else {
          spollersBlock.classList.remove("_spoller-init");
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      }));
    }

    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
        spollerTitles.forEach((spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
            if (!spollerTitle.classList.contains("_spoller-active")) {
              if (spollerTitle.nextElementSibling) {
                spollerTitle.nextElementSibling.hidden = true;
              }
            }
          } else {
            spollerTitle.setAttribute("tabindex", "-1");
            if (spollerTitle.nextElementSibling) {
              spollerTitle.nextElementSibling.hidden = false;
            }
          }
        }));
      }
    }

    function initCloseButtons(spollersBlock) {
      const closeButtons = spollersBlock.querySelectorAll('.cabinet-orders-spollers__button');

      closeButtons.forEach(button => {
        button.removeEventListener('click', closeSpollerHandler);
        button.addEventListener('click', closeSpollerHandler);
      });
    }

    function closeSpollerHandler(e) {
      e.preventDefault();
      e.stopPropagation();

      const button = e.currentTarget;
      const spollersBlock = button.closest('[data-spollers]');
      const spollerItem = button.closest('.cabinet-orders-spollers__item');

      if (spollersBlock && spollerItem) {
        const spollerTitle = spollerItem.querySelector('[data-spoller]');

        if (spollerTitle && spollerTitle.classList.contains('_spoller-active')) {
          const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

          spollerTitle.classList.remove('_spoller-active');
          const parent = spollerTitle.parentElement;
          if (parent) {
            parent.classList.remove('_spoller-active');
          }
          spollerItem.classList.remove('_spoller-active');

          const contentBlock = spollerTitle.nextElementSibling;
          _slideUp(contentBlock, spollerSpeed);
        }
      }
    }

    function setSpollerAction(e) {
      const el = e.target;
      const spollerTitle = el.closest("[data-spoller]");
      if (!spollerTitle) return;

      if (el.closest('a') && !spollerTitle.closest('a')) {
        return;
      }

      const spollerItem = spollerTitle.closest(".spollers__item, .cabinet-orders-spollers__item, .menu-catalog__item");
      const spollersBlock = spollerTitle.closest("[data-spollers]");

      if (!spollersBlock) return;

      const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

      if (!spollersBlock.querySelectorAll("._slide").length) {
        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) {
          hideSpollersBody(spollersBlock);
        }

        spollerTitle.classList.toggle("_spoller-active");
        const parent = spollerTitle.parentElement;
        if (parent) {
          parent.classList.toggle('_spoller-active');
        }
        if (spollerItem) spollerItem.classList.toggle("_spoller-active");

        const contentBlock = spollerTitle.nextElementSibling;
        if (contentBlock) {
          _slideToggle(contentBlock, spollerSpeed);
        }

        e.preventDefault();
      }
    }

    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
      if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
        const spollerItem = spollerActiveTitle.closest(".spollers__item, .cabinet-orders-spollers__item, .menu-catalog__item");

        spollerActiveTitle.classList.remove("_spoller-active");
        const parent = spollerActiveTitle.parentElement;
        if (parent) {
          parent.classList.remove('_spoller-active');
        }
        if (spollerItem) spollerItem.classList.remove("_spoller-active");
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
      }
    }

    const spollersClose = document.querySelectorAll("[data-spoller-close]");
    if (spollersClose.length) {
      document.addEventListener("click", (function (e) {
        const el = e.target;
        if (!el.closest("[data-spollers]")) {
          spollersClose.forEach((spollerClose => {
            const spollersBlock = spollerClose.closest("[data-spollers]");
            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
            spollerClose.classList.remove("_spoller-active");
            const parent = spollerClose.parentElement;
            if (parent) {
              parent.classList.remove('_spoller-active');
            }

            const spollerItem = spollerClose.closest(".spollers__item, .cabinet-orders-spollers__item, .menu-catalog__item");
            if (spollerItem) spollerItem.classList.remove("_spoller-active");

            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
          }));
        }
      }));
    }
  }
}

function initSlideSpollers() {
  const isMobile = window.innerWidth < 1280;

  const slides = document.querySelectorAll('.block-compound-spollers__slide');

  slides.forEach(slide => {
    slide.removeEventListener('click', handleSlideClick);

    if (!isMobile) {
      slide.addEventListener('click', handleSlideClick);
    }
  });

  document.querySelectorAll('.block-compound-spollers').forEach(spollerContainer => {
    if (!isMobile) {
      updatePagination(spollerContainer);
    } else {
      const allTexts = spollerContainer.querySelectorAll('.block-compound-spollers__text');
      allTexts.forEach(text => {
        text.hidden = false;
        text.style.display = 'block';
        text.style.height = 'auto';
        text.style.opacity = '1';
      });

      const pagination = spollerContainer.querySelector('.block-compound-spollers__pagination');
      if (pagination) {
        pagination.innerHTML = '';
      }
    }
  });
}

function handleSlideClick(e) {
  if (window.innerWidth < 1280) {
    e.preventDefault();
    return;
  }

  const slide = e.currentTarget;
  const spollerTitle = slide.querySelector('[data-spoller]');

  if (!spollerTitle) return;

  const spollersBlock = slide.closest('[data-spollers]');
  if (!spollersBlock) return;

  const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
  const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

  if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
    const allActiveSlides = spollersBlock.querySelectorAll('.block-compound-spollers__slide._spoller-active');
    allActiveSlides.forEach(activeSlide => {
      const activeTitle = activeSlide.querySelector('[data-spoller]');
      if (activeTitle) {
        activeTitle.classList.remove('_spoller-active');
        const parent = activeTitle.parentElement;
        if (parent) {
          parent.classList.remove('_spoller-active');
        }
        activeSlide.classList.remove('_spoller-active');
        const content = activeTitle.nextElementSibling;
        if (content && content.hidden !== undefined) {
          _slideUp(content, spollerSpeed);
        }
      }
    });
  }

  spollerTitle.classList.toggle('_spoller-active');
  const parent = spollerTitle.parentElement;
  if (parent) {
    parent.classList.toggle('_spoller-active');
  }
  slide.classList.toggle('_spoller-active');

  const contentBlock = spollerTitle.nextElementSibling;
  if (contentBlock) {
    _slideToggle(contentBlock, spollerSpeed);
  }

  const spollersContainer = slide.closest('.block-compound-spollers');
  if (spollersContainer) {
    updatePagination(spollersContainer);
  }

  e.preventDefault();
}

function updatePagination(spollersContainer) {
  if (window.innerWidth < 1280) {
    const pagination = spollersContainer.querySelector('.block-compound-spollers__pagination');
    if (pagination) {
      pagination.innerHTML = '';
    }
    return;
  }

  const slides = spollersContainer.querySelectorAll('.block-compound-spollers__slide');
  const pagination = spollersContainer.querySelector('.block-compound-spollers__pagination');

  if (!pagination || !slides.length) return;

  pagination.innerHTML = '';

  let activeIndex = 0;
  slides.forEach((slide, index) => {
    if (slide.classList.contains('_spoller-active')) {
      activeIndex = index;
    }
  });

  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.classList.add('pagination__dot');
    if (index === activeIndex) {
      dot.classList.add('_active');
    }

    dot.addEventListener('click', function () {
      if (window.innerWidth < 1280) return;

      const spollerTitle = slide.querySelector('[data-spoller]');
      if (spollerTitle) {
        if (!slide.classList.contains('_spoller-active')) {
          const spollersBlock = slide.closest('[data-spollers]');
          const oneSpoller = spollersBlock ? spollersBlock.hasAttribute('data-one-spoller') : false;
          const spollerSpeed = spollersBlock ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

          if (oneSpoller) {
            const allActiveSlides = spollersBlock.querySelectorAll('.block-compound-spollers__slide._spoller-active');
            allActiveSlides.forEach(activeSlide => {
              const activeTitle = activeSlide.querySelector('[data-spoller]');
              if (activeTitle) {
                activeTitle.classList.remove('_spoller-active');
                const parent = activeTitle.parentElement;
                if (parent) {
                  parent.classList.remove('_spoller-active');
                }
                activeSlide.classList.remove('_spoller-active');
                const content = activeTitle.nextElementSibling;
                if (content && content.hidden !== undefined) {
                  _slideUp(content, spollerSpeed);
                }
              }
            });
          }

          spollerTitle.classList.add('_spoller-active');
          const parent = spollerTitle.parentElement;
          if (parent) {
            parent.classList.add('_spoller-active');
          }
          slide.classList.add('_spoller-active');
          const contentBlock = spollerTitle.nextElementSibling;
          if (contentBlock) {
            _slideDown(contentBlock, spollerSpeed);
          }

          updatePagination(spollersContainer);
        }
      }
    });

    pagination.appendChild(dot);
  });
}

function initSpollersWithSlides() {
  if (typeof spollers === 'function') {
    spollers();
  }

  initSlideSpollers();
}

initSpollersWithSlides();

window.addEventListener('resize', function () {
  initSpollersWithSlides();
});

if (typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length) {
        const hasNewSlides = Array.from(mutation.addedNodes).some(node =>
          node.classList && node.classList.contains('block-compound-spollers__slide')
        );
        if (hasNewSlides) {
          const container = document.querySelector('.block-compound__wrapper');
          if (container) {
            const spollersContainer = container.querySelector('.block-compound-spollers');
            if (spollersContainer) {
              updatePagination(spollersContainer);
            }
          }
          initSlideSpollers();
        }
      }
    });
  });

  const container = document.querySelector('.block-compound__wrapper');
  if (container) {
    observer.observe(container, { childList: true, subtree: true });
  }
}

//========================================================================================================================================================

const filterContainer = document.querySelector('.catalog-filter');
if (filterContainer) {

  const filterButton = document.querySelector('.catalog-filter__button');
  const filterBody = document.querySelector('.catalog-filter__content');
  const closeButton = document.querySelector('.catalog-filter__close');

  function isMobile() {
    return window.innerWidth <= 992;
  }

  function openFilter() {
    if (!isMobile()) return;
    document.documentElement.classList.add('filter-open');
  }

  function closeFilter() {
    document.documentElement.classList.remove('filter-open');
  }

  filterButton.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (!isMobile()) return;

    if (document.documentElement.classList.contains('filter-open')) {
      closeFilter();
    } else {
      openFilter();
    }
  });

  closeButton.addEventListener('click', function (e) {
    e.stopPropagation();
    if (document.documentElement.classList.contains('filter-open')) {
      closeFilter();
    }
  });

  document.addEventListener('click', function (e) {
    if (!isMobile()) return;
    if (!document.documentElement.classList.contains('filter-open')) return;

    const isClickInsideBody = filterBody.contains(e.target);
    const isClickOnButton = filterButton.contains(e.target);
    const isClickInsideSelect = e.target.closest('.select') !== null;
    const isClickInsideSelectTag = e.target.closest('._select-tag') !== null;
    const isClickInsideCalendar = e.target.closest('.calendar') !== null;
    const isClickInsideCalendarBtn = e.target.closest('.calendar-btn') !== null;

    if (!isClickInsideBody && !isClickOnButton && !isClickInsideSelect && !isClickInsideSelectTag && !isClickInsideCalendar && !isClickInsideCalendarBtn) {
      closeFilter();
    }
  });

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (!isMobile() && document.documentElement.classList.contains('filter-open')) {
        closeFilter();
      }
    }, 200);
  });

  filterBody.addEventListener('click', function (e) {
    const isClickInsideSelect = e.target.closest('.select') !== null;
    const isClickInsideSelectTag = e.target.closest('._select-tag') !== null;
    const isClickInsideCalendar = e.target.closest('.calendar') !== null;
    const isClickInsideCalendarBtn = e.target.closest('.calendar-btn') !== null;

    if (!isClickInsideSelect && !isClickInsideSelectTag && !isClickInsideCalendar && !isClickInsideCalendarBtn) {
      e.stopPropagation();
    }
  });
}

//========================================================================================================================================================

const calendars = document.querySelectorAll(".calendar");
if (calendars.length > 0) {
  calendars.forEach(calendar => {
    const calendarMain = calendar.querySelector(".calendar__main");
    const calHeaderTitle = calendar.querySelector(".calendar__header span");

    const parentInputs = calendar.closest(".form-calendar__inputs");

    if (!parentInputs) {
      return;
    }

    const input = parentInputs.querySelector(".input-calendar");
    if (!input) {
      return;
    }

    const months = [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    const todayTimestamp = Date.now() - (Date.now() % (24 * 60 * 60 * 1000));
    let selectedDate = null;

    const getNumberOfDays = (year, month) => {
      return new Date(year, month + 1, 0).getDate();
    };

    const getDayDetails = (args) => {
      let date = args.index - args.firstDay;
      let dayOfWeek = (args.index % 7 + 7) % 7;
      let prevMonth = args.month - 1;
      let nextMonth = args.month + 1;
      let prevYear = args.year;
      let nextYear = args.year;

      if (prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
      }
      if (nextMonth > 11) {
        nextMonth = 0;
        nextYear++;
      }

      let prevMonthDays = getNumberOfDays(prevYear, prevMonth);
      let currentMonthDays = getNumberOfDays(args.year, args.month);

      let displayDate, displayMonth, displayYear;
      if (date < 0) {
        displayDate = prevMonthDays + date + 1;
        displayMonth = prevMonth;
        displayYear = prevYear;
      } else if (date >= currentMonthDays) {
        displayDate = date - currentMonthDays + 1;
        displayMonth = nextMonth;
        displayYear = nextYear;
      } else {
        displayDate = date + 1;
        displayMonth = args.month;
        displayYear = args.year;
      }

      let timestamp = new Date(Date.UTC(displayYear, displayMonth, displayDate)).getTime();
      return {
        date: displayDate,
        day: dayOfWeek,
        month: displayMonth === args.month ? 0 : displayMonth < args.month ? -1 : 1,
        timestamp: timestamp
      };
    };

    const getMonthDetails = (year, month) => {
      let firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay();
      firstDay = firstDay === 0 ? 6 : firstDay - 1;
      let monthArray = [];
      for (let i = 0; i < 42; i++) {
        monthArray.push(getDayDetails({
          index: i,
          firstDay: firstDay,
          year: year,
          month: month
        }));
      }
      return monthArray;
    };

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let monthDetails = getMonthDetails(year, month);

    const setCalBody = (monthDetails) => {
      calendarMain.innerHTML = "";
      monthDetails.forEach(day => {
        let div = document.createElement("div");
        let span = document.createElement("span");

        div.classList.add("cell_wrapper");
        div.classList.add("cal_date");

        if (day.month === 0) {
          div.classList.add("current");
        } else if (day.month === -1) {
          div.classList.add("prev-month");
        } else if (day.month === 1) {
          div.classList.add("next-month");
        }

        if (day.timestamp === todayTimestamp && day.month === 0) {
          div.classList.add("isCurrent");
        }

        if (day.timestamp < todayTimestamp) {
          div.classList.add("disabled");
          div.style.pointerEvents = "none";
        }

        span.classList.add("cell_item");
        span.innerText = day.date;
        div.setAttribute("data-timestamp", day.timestamp);
        div.appendChild(span);
        calendarMain.appendChild(div);
      });
    };

    const setHeader = (year, month) => {
      calHeaderTitle.innerHTML = `${months[month]} ${year}`;
    };

    const navigateMonth = (offset) => {
      month += offset;
      if (month === -1) {
        month = 11;
        year--;
      } else if (month === 12) {
        month = 0;
        year++;
      }
      monthDetails = getMonthDetails(year, month);
      setHeader(year, month);
      setCalBody(monthDetails);
    };

    setHeader(year, month);
    setCalBody(monthDetails);

    let calendarBtns = calendar.querySelectorAll(".calendar-btn");
    if (calendarBtns.length === 0) {
      calendarBtns = parentInputs.querySelectorAll(".calendar-btn");
    }

    calendarBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        let offset = btn.classList.contains("calendar__btn-prev") ? -1 : 1;
        navigateMonth(offset);
      });
    });

    const clearSelection = () => {
      selectedDate = null;
      calendar.querySelectorAll(".cell_wrapper").forEach(cell => {
        cell.classList.remove("isSelected");
      });
    };

    const updateInputValue = (timestamp) => {
      const dateString = getDateStringFromTimestamp(timestamp);
      input.value = dateString;

      if (input.hasAttribute("data-start")) {
        input.dataset.start = dateString;
      } else {
        input.dataset.end = dateString;
      }
    };

    const getDateStringFromTimestamp = (timestamp) => {
      let dateObject = new Date(timestamp);
      let year = dateObject.getUTCFullYear();
      let month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
      let day = String(dateObject.getUTCDate()).padStart(2, '0');
      return `${day}-${month}-${year}`;
    };

    const closeCalendar = () => {
      document.querySelectorAll('.form-calendar__inputs').forEach(el => {
        el.classList.remove('active');
      });

      document.documentElement.classList.remove('open-calendar');

      const filterTabsButtons = document.querySelectorAll('.drop-down-button');
      const shadow = document.querySelector('.shadow');
      if (shadow) {
        shadow.classList.remove("_active");
      }

      if (!document.documentElement.classList.contains('filter-open')) {
        document.documentElement.classList.remove('filter-open');
        filterTabsButtons.forEach((button) => button.classList.remove("_active"));
      }
    };

    calendarMain.addEventListener("click", (e) => {
      e.stopPropagation();

      const target = e.target.closest(".cell_wrapper.current");
      if (!target || target.classList.contains("disabled")) {
        return;
      }

      const cellTimestamp = parseInt(target.getAttribute("data-timestamp"));
      if (!cellTimestamp) {
        return;
      }

      clearSelection();
      selectedDate = cellTimestamp;
      target.classList.add("isSelected");
      updateInputValue(selectedDate);

      closeCalendar();
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const formInputsBlocks = document.querySelectorAll('.form-calendar__inputs');

  if (formInputsBlocks.length > 0) {
    formInputsBlocks.forEach(block => {
      block.addEventListener('click', function (e) {
        e.stopPropagation();

        const isCalendarClick = e.target.closest('.calendar');
        const isCalendarBtnClick = e.target.closest('.calendar-btn');

        if (isCalendarClick || isCalendarBtnClick) {
          return;
        }

        const wasActive = this.classList.contains('active');

        document.querySelectorAll('.form-calendar__inputs').forEach(el => {
          el.classList.remove('active');
        });

        document.documentElement.classList.remove('open-calendar');

        if (!wasActive) {
          this.classList.add('active');
          document.documentElement.classList.add('open-calendar');
        }
      });
    });
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.form-calendar__inputs')) {
      document.querySelectorAll('.form-calendar__inputs').forEach(el => {
        el.classList.remove('active');
      });

      document.documentElement.classList.remove('open-calendar');
    }
  });
});

//========================================================================================================================================================

const cookieBlock = document.querySelector('.block-cookie');
if (cookieBlock) {
  const acceptBtn = cookieBlock.querySelector('.btn-add');
  const rejectBtn = cookieBlock.querySelector('.btn-close');

  function hideCookieBlock() {
    cookieBlock.style.display = 'none';
  }

  function acceptAllCookies() {
    console.log('Приняты все cookie');
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookiesPreferences', JSON.stringify({
      necessary: true,
      functional: true,
      analytics: true,
      advertising: true
    }));

    hideCookieBlock();
  }

  function rejectCookies() {
    localStorage.setItem('cookiesAccepted', 'false');
    localStorage.setItem('cookiesPreferences', JSON.stringify({
      necessary: true,
      functional: false,
      analytics: false,
      advertising: false
    }));

    hideCookieBlock();
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', acceptAllCookies);
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', rejectCookies);
  }
  const cookiesAccepted = localStorage.getItem('cookiesAccepted');
  if (cookiesAccepted === 'true') {
    hideCookieBlock();
  }
}