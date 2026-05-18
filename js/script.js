// 이전 클래스명 바꾸기 전, 스크롤바 위치까지 완벽했던 거 ㄱㄱㄱ

// document.addEventListener('DOMContentLoaded', () => {
//   const swiperEl = document.querySelector('.mySwiper');
//   if (!swiperEl) return;

//   const toggleBtn = document.querySelector('.toggle');
//   if (!toggleBtn) return;

//   // ✅ SVG 아이콘 (원하면 너 스타일로 교체 가능)
//   const PLAY_ICON = `
//     <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
//       <polygon points="8,6 18,12 8,18"
//                fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
//     </svg>
//   `;
//   const PAUSE_ICON = `
//     <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
//       <line x1="9" y1="6" x2="9" y2="18"
//             stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
//       <line x1="15" y1="6" x2="15" y2="18"
//             stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
//     </svg>
//   `;

//   let isPlaying = true;       // autoplay 상태
//   let pausedByHover = false;  // hover로 멈춘 건지

//   const swiper = new Swiper('.mySwiper', {
//     slidesPerView: 4,
//     slidesPerGroup: 1,
//     spaceBetween: 46,
//     centeredSlides: false,
//     loop: true,

//     autoplay: {
//       delay: 2500,
//       disableOnInteraction: false,
//     },

//     navigation: { 
//       nextEl: '.next',
//       prevEl: '.prev',
//     },

//     scrollbar: {
//       el: '.swiper-scrollbar',
//       draggable: true,
//       hide: false,
//     },

//     breakpoints: {
//       0: { slidesPerView: 1.2, spaceBetween: 16 },
//       640: { slidesPerView: 2, spaceBetween: 24 },
//       1024: { slidesPerView: 3, spaceBetween: 36 },
//       1280: { slidesPerView: 4, spaceBetween: 46 },
//     },
//   });

//   // ✅ 버튼 UI 변경(무조건 innerHTML로 통제)
//   function setToggleUI(playing) {
//     toggleBtn.innerHTML = playing ? PAUSE_ICON : PLAY_ICON;
//     toggleBtn.setAttribute('aria-label', playing ? '자동 재생 정지' : '자동 재생 시작');
//     toggleBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
//   }

//   // ✅ Swiper 실제 autoplay 상태로 초기 UI 맞추기
//   // (init 직후 autoplay.running 값을 신뢰)
//   isPlaying = !!(swiper.autoplay && swiper.autoplay.running);
//   setToggleUI(isPlaying);

//   // 토글 클릭
//   toggleBtn.addEventListener('click', () => {
//     if (isPlaying) {
//       swiper.autoplay.stop();
//       isPlaying = false;
//       pausedByHover = false; // 사용자가 직접 멈춘 것
//       setToggleUI(false);
//     } else {
//       swiper.autoplay.start();
//       isPlaying = true;
//       setToggleUI(true);
//     }
//   });

//   // autoplay 이벤트 동기화(안정)
//   swiper.on('autoplayStart', () => {
//     isPlaying = true;
//     setToggleUI(true);
//   });
//   swiper.on('autoplayStop', () => {
//     isPlaying = false;
//     setToggleUI(false);
//   });

//   // ✅ hover: 올리면 stop / 나가면 start (hover로 멈춘 경우만)
//   swiperEl.addEventListener('mouseenter', () => {
//     if (isPlaying) {
//       pausedByHover = true;
//       swiper.autoplay.stop(); // 여기서 UI는 autoplayStop 이벤트가 바꿔줌
//     }
//   });

//   swiperEl.addEventListener('mouseleave', () => {
//     if (pausedByHover) {
//       pausedByHover = false;
//       swiper.autoplay.start(); // 여기서 UI는 autoplayStart 이벤트가 바꿔줌
//     }
//   });

//   // (선택) 마우스 움직일 때만 스크롤바 표시
//   let hideTimer;
//   swiperEl.addEventListener('mousemove', () => {
//     swiperEl.classList.add('is-active');
//     clearTimeout(hideTimer);
//     hideTimer = setTimeout(() => {
//       swiperEl.classList.remove('is-active');
//     }, 1200);
//   });
// });


// 메인 이미지 슬라이드 (섹션 1)
// document.addEventListener('DOMContentLoaded', () => {
//   const mainSwiperEl = document.querySelector('.mainSwiper');
//   if (!mainSwiperEl) return;

//   const mainSwiper = new Swiper(mainSwiperEl, {
//     loop: true,

//     navigation: {
//       nextEl: '.mainSwiper .swiper-button-next',
//       prevEl: '.mainSwiper .swiper-button-prev',
//     },

//     pagination: {
//       el: '.mainSwiper .swiper-pagination',
//       clickable: true,
//     },

//     mousewheel: {
//       forceToAxis: true,   // ✅ 세로 스크롤 시 슬라이드 이동 방지
//     },

//     keyboard: {
//       enabled: true,
//       onlyInViewport: true,
//     },
//   });
// });

// 메인 슬라이드 - 무한 루프 설정
document.addEventListener('DOMContentLoaded', () => {
  const mainSwiperEl = document.querySelector('.mainSwiper');
  if (!mainSwiperEl) return;

  const prevBtn = mainSwiperEl.querySelector('.nav-prev');
  const nextBtn = mainSwiperEl.querySelector('.nav-next');

  const mainSwiper = new Swiper(mainSwiperEl, {
    loop: true,

    /* 🔥 무한루프 안정 핵심 옵션 */
    slidesPerView: 1,
    watchOverflow: false,          // 슬라이드 적어도 loop 유지
    loopAdditionalSlides: 2,       // clone 여유분
    loopPreventsSliding: false,

    /* 커스텀 SVG 네비게이션 */
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },

    /* pagination */
    pagination: {
      el: mainSwiperEl.querySelector('.swiper-pagination'),
      clickable: true,
    },

    /* ⚠️ mousewheel이 loop 막는 주범 */
    mousewheel: {
      forceToAxis: true,
      releaseOnEdges: true,        // ⭐ 이게 중요
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });
});












// 메가 메뉴 - 점 정중앙 표시
document.addEventListener('DOMContentLoaded', () => {
  const headerBox = document.querySelector('.header-box');
  const indicator = document.querySelector('.gnb-indicator');
  const items = document.querySelectorAll('.gnb-item.has-mega');

  if (!headerBox || !indicator || items.length === 0) return;

  function moveIndicatorTo(item){
    const link = item.querySelector('.gnb-link') || item.querySelector('a');
    if (!link) return;

    const boxRect = headerBox.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    // 링크의 가운데 x좌표를 headerBox 기준 left로 변환
    const centerX = (linkRect.left + linkRect.right) / 2 - boxRect.left;

    indicator.style.left = `${centerX}px`;
    indicator.style.opacity = '1';
  }

  function hideIndicator(){
    indicator.style.opacity = '0';
  }

  items.forEach(item => {
    item.addEventListener('mouseenter', () => moveIndicatorTo(item));
    item.addEventListener('focusin', () => moveIndicatorTo(item));
  });

  // 헤더에서 벗어나면 숨김
  headerBox.addEventListener('mouseleave', hideIndicator);

  // 리사이즈 시 위치 재계산(열려있는 항목이 있다면 그걸로)
  window.addEventListener('resize', () => {
    const active = document.querySelector('.gnb-item.has-mega:hover, .gnb-item.has-mega:focus-within');
    if (active) moveIndicatorTo(active);
  });
});


// 메가 메뉴 - gnb 이동 시, 상태 유지
// document.addEventListener('DOMContentLoaded', () => {
//   const nav = document.querySelector('.gnb-nav');
//   const items = document.querySelectorAll('.gnb-item.has-mega');
//   if (!nav || !items.length) return;

//   let openItem = null;

//   function open(target) {
//     // 이미 열려있으면 스킵
//     if (openItem === target) return;

//     // 이전 열림 닫기
//     if (openItem) openItem.classList.remove('is-open');

//     // 새 메뉴 열기
//     target.classList.add('is-open');
//     openItem = target;
//   }

//   function closeAll() {
//     if (!openItem) return;
//     openItem.classList.remove('is-open');
//     openItem = null;
//   }

//   // 메뉴 hover/focus 들어오면 즉시 열기
//   items.forEach(item => {
//     const mega = item.querySelector('.mega');

//     item.addEventListener('mouseenter', () => open(item));
//     item.addEventListener('focusin', () => open(item));

//     // mega 위에서도 현재 메뉴 유지
//     if (mega) {
//       mega.addEventListener('mouseenter', () => open(item));
//       // ✅ mega에서 나간다고 바로 닫지 않음
//       // (nav 영역을 벗어날 때만 닫게 할 거라서)
//     }
//   });

//   // ✅ nav(헤더 메뉴 영역) 밖으로 완전히 나가면 닫기
//   nav.addEventListener('mouseleave', closeAll);

//   // ESC로 닫기
//   document.addEventListener('keydown', (e) => {
//     if (e.key !== 'Escape') return;
//     closeAll();
//   });
// });


// document.addEventListener('DOMContentLoaded', () => {
//   const nav = document.querySelector('.gnb-nav');
//   const items = document.querySelectorAll('.gnb-item.has-mega');
//   const megas = document.querySelectorAll('.mega');
//   if (!nav || !items.length) return;

//   let activeItem = null;

//   function open(item){
//     if (activeItem === item) return;

//     if (activeItem) activeItem.classList.remove('is-open');

//     item.classList.add('is-open');
//     activeItem = item;
//   }

//   function closeAll(){
//     if (!activeItem) return;
//     activeItem.classList.remove('is-open');
//     activeItem = null;
//   }

//   items.forEach(item => {
//     const mega = item.querySelector('.mega');

//     // gnb hover
//     item.addEventListener('mouseenter', () => open(item));
//     item.addEventListener('focusin', () => open(item));

//     // mega 위에서도 유지
//     if (mega) {
//       mega.addEventListener('mouseenter', () => open(item));
//     }
//   });

//   // ✅ nav + mega 둘 다 아닌 곳으로 나갔을 때만 닫기
//   document.addEventListener('mousemove', (e) => {
//     const isInNav = nav.contains(e.target);
//     const isInMega = [...megas].some(m => m.contains(e.target));

//     if (!isInNav && !isInMega) {
//       closeAll();
//     }
//   });

//   // ESC 닫기
//   document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape') closeAll();
//   });
// });



// 메가 이동 시, 닫힘 없음
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.gnb-nav');
  const items = document.querySelectorAll('.gnb-item.has-mega');
  if (!nav || !items.length) return;

  const CLOSE_DELAY = 220; // ✅ 이동 구간 버퍼(180~260 추천)
  let activeItem = null;
  let closeTimer = null;

  const clearClose = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  };

  const open = (item) => {
    clearClose();
    if (activeItem === item) return;

    if (activeItem) activeItem.classList.remove('is-open');
    item.classList.add('is-open');
    activeItem = item;
  };

  const closeAll = () => {
    clearClose();
    if (!activeItem) return;
    activeItem.classList.remove('is-open');
    activeItem = null;
  };

  const scheduleClose = () => {
    clearClose();
    closeTimer = setTimeout(closeAll, CLOSE_DELAY);
  };

  items.forEach(item => {
    const mega = item.querySelector('.mega');
    const link = item.querySelector('.gnb-link');

    // ✅ GNB에 들어오면 열기
    item.addEventListener('mouseenter', () => open(item));
    item.addEventListener('focusin', () => open(item));

    // ✅ GNB에서 나가면 "닫기 예약" (즉시 닫지 않음)
    item.addEventListener('mouseleave', scheduleClose);

    // ✅ mega에 들어오면 닫기 예약 취소 + 유지
    if (mega) {
      mega.addEventListener('mouseenter', () => open(item));
      mega.addEventListener('mouseleave', scheduleClose);
    }

    // (선택) 클릭 시 토글 원하면 아래 주석 해제
    if (link) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (activeItem === item) closeAll();
        else open(item);
      });
    }
  });

  // ✅ nav에서 나가도 "닫기 예약"
  nav.addEventListener('mouseleave', scheduleClose);
  nav.addEventListener('mouseenter', clearClose);

  // ✅ ESC 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });

  // ✅ 바깥 클릭 닫기(원하면 유지)
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) closeAll();
  });
});



// 같은 gnb 클릭 시, 닫힘 
// document.addEventListener('DOMContentLoaded', () => {
//   const nav = document.querySelector('.gnb-nav');
//   const items = document.querySelectorAll('.gnb-item.has-mega');
//   if (!nav || !items.length) return;

//   const CLOSE_DELAY = 220;
//   let activeItem = null;
//   let closeTimer = null;
//   let openedByClick = false; // ⭐ 핵심 플래그

//   const clearClose = () => {
//     if (closeTimer) {
//       clearTimeout(closeTimer);
//       closeTimer = null;
//     }
//   };

//   const open = (item, byClick = false) => {
//     clearClose();

//     if (activeItem === item) return;

//     if (activeItem) activeItem.classList.remove('is-open');

//     item.classList.add('is-open');
//     activeItem = item;
//     openedByClick = byClick;
//   };

//   const closeAll = () => {
//     clearClose();
//     if (!activeItem) return;
//     activeItem.classList.remove('is-open');
//     activeItem = null;
//     openedByClick = false;
//   };

//   const scheduleClose = () => {
//     if (openedByClick) return; // ⭐ 클릭으로 연 상태면 hover로는 닫지 않음
//     clearClose();
//     closeTimer = setTimeout(closeAll, CLOSE_DELAY);
//   };

//   items.forEach(item => {
//     const mega = item.querySelector('.mega');
//     const link = item.querySelector('.gnb-link');

//     // ===== hover =====
//     item.addEventListener('mouseenter', () => open(item, false));
//     item.addEventListener('focusin', () => open(item, false));
//     item.addEventListener('mouseleave', scheduleClose);

//     if (mega) {
//       mega.addEventListener('mouseenter', () => open(item, false));
//       mega.addEventListener('mouseleave', scheduleClose);
//     }

//     // ===== click =====
//     if (link) {
//       link.addEventListener('click', (e) => {
//         e.preventDefault();
//         e.stopPropagation();

//         // ⭐ 같은 gnb 다시 클릭 → 닫기
//         if (activeItem === item && openedByClick) {
//           closeAll();
//           return;
//         }

//         // ⭐ 새로 클릭 → 고정 열기
//         open(item, true);
//       });
//     }
//   });

//   // nav 영역
//   nav.addEventListener('mouseenter', clearClose);
//   nav.addEventListener('mouseleave', scheduleClose);

//   // ESC
//   document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape') closeAll();
//   });

//   // 바깥 클릭
//   document.addEventListener('click', (e) => {
//     if (!nav.contains(e.target)) closeAll();
//   });
// });



// 봄의 수목원 - 토글 버튼
// document.addEventListener('DOMContentLoaded', () => {
//   // ✅ 봄 탭 영역만 스코프 고정 (추천코스랑 겹침 방지)
//   const springRoot = document.querySelector('.april-tabs');
//   if (!springRoot) return;

//   const tablist = springRoot.querySelector('.course-toggle[role="tablist"]');
//   const tabs = springRoot.querySelectorAll('.course-toggle .course-btn[data-spring]');
//   const panels = springRoot.querySelectorAll('.toggle-content [role="tabpanel"], .toggle-content .content');

//   if (!tablist || tabs.length === 0 || panels.length === 0) return;

//   function showPanel(key) {
//     const keyStr = String(key); // "vision" | "plant"

//     // ✅ 버튼에서 aria-controls로 targetId 가져오기 (가장 안정적)
//     const btn = Array.from(tabs).find((b) => b.dataset.spring === keyStr);
//     const targetId = btn ? btn.getAttribute('aria-controls') : null;
//     if (!targetId) return;

//     // 탭 상태 업데이트
//     tabs.forEach((b) => {
//       const on = b.dataset.spring === keyStr;
//       b.classList.toggle('active', on);
//       b.setAttribute('aria-selected', on ? 'true' : 'false');
//       b.setAttribute('tabindex', on ? '0' : '-1');
//     });

//     // 패널 show/hide
//     panels.forEach((panel) => {
//       const on = panel.id === targetId;
//       panel.classList.toggle('active', on);

//       if (on) panel.removeAttribute('hidden');
//       else panel.setAttribute('hidden', '');
//     });
//   }

//   // 클릭 이벤트
//   tabs.forEach((btn) => {
//     btn.addEventListener('click', () => showPanel(btn.dataset.spring));
//   });

//   // ✅ 키보드 조작(← → / Home / End)
//   tablist.addEventListener('keydown', (e) => {
//     const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
//     if (!keys.includes(e.key)) return;

//     e.preventDefault();

//     const tabArray = Array.from(tabs);
//     const currentIndex = tabArray.indexOf(document.activeElement);

//     // 포커스가 버튼에 없을 수도 있어서 fallback
//     const safeIndex = currentIndex >= 0 ? currentIndex : 0;

//     let nextIndex = safeIndex;

//     if (e.key === 'ArrowLeft') nextIndex = Math.max(0, safeIndex - 1);
//     if (e.key === 'ArrowRight') nextIndex = Math.min(tabArray.length - 1, safeIndex + 1);
//     if (e.key === 'Home') nextIndex = 0;
//     if (e.key === 'End') nextIndex = tabArray.length - 1;

//     const nextTab = tabArray[nextIndex];
//     if (!nextTab) return;

//     nextTab.focus();
//     showPanel(nextTab.dataset.spring);
//   });

//   // 초기 상태 보정
//   const initial =
//     springRoot.querySelector('.course-toggle .course-btn.active[data-spring]') || tabs[0];
//   showPanel(initial.dataset.spring);
// });

// 봄의 수목원 - 다른 느낌
document.addEventListener('DOMContentLoaded', () => {
  // ✅ 봄 섹션만 스코프 고정 (추천코스와 완전 분리)
  const springRoot = document.querySelector('.spring-tabs');
  if (!springRoot) return;

  const tablist = springRoot.querySelector('.spring-tablist[role="tablist"]');
  const tabs = springRoot.querySelectorAll('.spring-tab-btn[data-spring-tab]');
  const panels = springRoot.querySelectorAll('.spring-panel[role="tabpanel"]');

  if (!tablist || tabs.length === 0 || panels.length === 0) return;

  function showPanel(key) {
    const keyStr = String(key);

    const btn = Array.from(tabs).find((b) => b.dataset.springTab === keyStr);
    const targetId = btn ? btn.getAttribute('aria-controls') : null;
    if (!targetId) return;

    // 탭 상태 업데이트
    tabs.forEach((b) => {
      const on = b.dataset.springTab === keyStr;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.setAttribute('tabindex', on ? '0' : '-1');
    });

    // 패널 show/hide
    panels.forEach((panel) => {
      const on = panel.id === targetId;
      panel.classList.toggle('active', on);

      if (on) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
    });
  }

  // 클릭 이벤트
  tabs.forEach((btn) => {
    btn.addEventListener('click', () => showPanel(btn.dataset.springTab));
  });

  // 키보드 조작(← → / Home / End)
  tablist.addEventListener('keydown', (e) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(e.key)) return;

    e.preventDefault();

    const tabArray = Array.from(tabs);
    const currentIndex = tabArray.indexOf(document.activeElement);
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;

    let nextIndex = safeIndex;
    if (e.key === 'ArrowLeft') nextIndex = Math.max(0, safeIndex - 1);
    if (e.key === 'ArrowRight') nextIndex = Math.min(tabArray.length - 1, safeIndex + 1);
    if (e.key === 'Home') nextIndex = 0;
    if (e.key === 'End') nextIndex = tabArray.length - 1;

    const nextTab = tabArray[nextIndex];
    if (!nextTab) return;

    nextTab.focus();
    showPanel(nextTab.dataset.springTab);
  });

  // 초기 상태 보정
  const initial =
    springRoot.querySelector('.spring-tab-btn.active[data-spring-tab]') || tabs[0];

  showPanel(initial.dataset.springTab);
});









// 전시 및 행사 (섹션 3)
// 클래스명 변경 후, 스크롤바 위치가 바뀜 (문제점 : 상단으로 조금 올라감)
document.addEventListener('DOMContentLoaded', () => {
  const swiperEl = document.querySelector('.exhibitSwiper');
  if (!swiperEl) return;

  const toggleBtn = document.querySelector('.event-toggle');
  if (!toggleBtn) return;

  // ✅ SVG 아이콘
  const PLAY_ICON = `
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <polygon points="8,6 18,12 8,18"
               fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>
  `;
  const PAUSE_ICON = `
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <line x1="9" y1="6" x2="9" y2="18"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="15" y1="6" x2="15" y2="18"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;

  let isPlaying = true;        // autoplay 상태
  let pausedByHover = false;  // hover로 멈춘 건지

  const swiper = new Swiper('.exhibitSwiper', {
    slidesPerView: 4,
    slidesPerGroup: 1,
    spaceBetween: 46,
    centeredSlides: false,
    loop: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    navigation: {
      nextEl: '.event-next',
      prevEl: '.event-prev',
    },

    scrollbar: {
      el: '.exhibit-scrollbar',
      draggable: true,
      hide: false,
    },

    breakpoints: {
      0: { slidesPerView: 1.2, spaceBetween: 16 },
      640: { slidesPerView: 2, spaceBetween: 24 },
      1024: { slidesPerView: 3, spaceBetween: 36 },
      1280: { slidesPerView: 4, spaceBetween: 46 },
    },
  });

  /* ===== 토글 UI ===== */
  function setToggleUI(playing) {
    toggleBtn.innerHTML = playing ? PAUSE_ICON : PLAY_ICON;
    toggleBtn.setAttribute(
      'aria-label',
      playing ? '자동 재생 정지' : '자동 재생 시작'
    );
    toggleBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
  }

  // Swiper 실제 autoplay 상태로 초기 UI 동기화
  isPlaying = !!(swiper.autoplay && swiper.autoplay.running);
  setToggleUI(isPlaying);

  /* ===== 토글 클릭 ===== */
  toggleBtn.addEventListener('click', () => {
    if (isPlaying) {
      swiper.autoplay.stop();
      isPlaying = false;
      pausedByHover = false; // 사용자가 직접 멈춤
      setToggleUI(false);
    } else {
      swiper.autoplay.start();
      isPlaying = true;
      setToggleUI(true);
    }
  });

  /* ===== autoplay 이벤트 동기화 ===== */
  swiper.on('autoplayStart', () => {
    isPlaying = true;
    setToggleUI(true);
  });

  swiper.on('autoplayStop', () => {
    isPlaying = false;
    setToggleUI(false);
  });

  /* ===== hover 시 stop / leave 시 start (hover로 멈춘 경우만) ===== */
  swiperEl.addEventListener('mouseenter', () => {
    if (isPlaying) {
      pausedByHover = true;
      swiper.autoplay.stop();
    }
  });

  swiperEl.addEventListener('mouseleave', () => {
    if (pausedByHover) {
      pausedByHover = false;
      swiper.autoplay.start();
    }
  });

  /* ===== (선택) 마우스 움직일 때만 활성 상태 ===== */
  let hideTimer;
  swiperEl.addEventListener('mousemove', () => {
    swiperEl.classList.add('is-active');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      swiperEl.classList.remove('is-active');
    }, 1200);
  });
});


// ( 섹션 5 ) - 추천 코스
// document.addEventListener('DOMContentLoaded', () => {
//   const buttons = document.querySelectorAll('.course-btn');
//   const panels  = document.querySelectorAll('.course-panel');

//   if (buttons.length === 0 || panels.length === 0) return;

//   function openCourse(courseNumber){
//     // 버튼 active + aria-selected
//     buttons.forEach(btn => {
//       const isActive = btn.dataset.course === courseNumber;
//       btn.classList.toggle('active', isActive);
//       btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
//     });

//     // 패널 show/hide
//     panels.forEach(panel => {
//       const isTarget = panel.id === `course-panel-${courseNumber}`;
//       if (isTarget) {
//         panel.classList.add('active');
//         panel.hidden = false;
//       } else {
//         panel.classList.remove('active');
//         panel.hidden = true;
//       }
//     });
//   }

//   // 클릭 이벤트
//   buttons.forEach(btn => {
//     btn.addEventListener('click', () => {
//       openCourse(btn.dataset.course);
//     });
//   });

//   // 초기 상태
//   openCourse('1');
// });

// 추천 코스 - 토글 버튼
document.addEventListener('DOMContentLoaded', () => {
  const tablist = document.querySelector('.course-toggle[role="tablist"]');
  const tabs = document.querySelectorAll('.course-toggle .course-btn[data-course]');
  const panels = document.querySelectorAll('.course-panel[role="tabpanel"], .course-panel');

  if (!tablist || tabs.length === 0 || panels.length === 0) return;

  function showPanel(course) {
    const courseStr = String(course);
    const targetId = `course-panel-${courseStr}`;

    // 탭 상태 업데이트
    tabs.forEach((btn) => {
      const on = btn.dataset.course === courseStr;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
      btn.setAttribute('tabindex', on ? '0' : '-1');
    });

    // 패널 show/hide (안정적으로)
    panels.forEach((panel) => {
      const on = panel.id === targetId;
      panel.classList.toggle('active', on);

      if (on) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });
  }

  // 클릭 이벤트
  tabs.forEach((btn) => {
    btn.addEventListener('click', () => showPanel(btn.dataset.course));
  });

  // ✅ 키보드 조작(← → / Home / End)
  tablist.addEventListener('keydown', (e) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(e.key)) return;

    e.preventDefault();

    const tabArray = Array.from(tabs);
    const currentIndex = tabArray.indexOf(document.activeElement);

    let nextIndex = currentIndex;

    if (e.key === 'ArrowLeft') nextIndex = Math.max(0, currentIndex - 1);
    if (e.key === 'ArrowRight') nextIndex = Math.min(tabArray.length - 1, currentIndex + 1);
    if (e.key === 'Home') nextIndex = 0;
    if (e.key === 'End') nextIndex = tabArray.length - 1;

    const nextTab = tabArray[nextIndex];
    if (!nextTab) return;

    nextTab.focus();
    showPanel(nextTab.dataset.course);
  });

  // 초기 상태 보정
  const initial = document.querySelector('.course-toggle .course-btn.active[data-course]') || tabs[0];
  showPanel(initial.dataset.course);
});







