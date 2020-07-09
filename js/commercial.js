    // 이미지 갤러리 변수 불러오기
var galleryEl = document.querySelector("#gallery"),
    viewEl = galleryEl.querySelector(".view"),
    viewContainerEl = viewEl.querySelector(".view-container"),
    viewItemEls = viewContainerEl.querySelectorAll(".view-item"),
    viewItemImgEls = viewContainerEl.querySelectorAll(".view-item > img"),
    _isAni = false,
    _galleryW = 1000,
    _cuId = 0,
    _exId = null,
    _max = null;
    _duration = 400,
    _addDuration = 200,
    // 슬라이드 버튼 변수 불러오기
    paddleNavEl = galleryEl.querySelector(".nav"),
    btnPaddleNavEls = paddleNavEl.querySelectorAll("button.arrow"),
    btnPaddleNavPrevEl = paddleNavEl.querySelector("button.arrow.prev"),
    btnPaddleNavNextEl = paddleNavEl.querySelector("button.arrow.next");


// onClickPaddleNav 함수를 만들어 오른쪽 왼쪽 버튼을 누르면 이미지가 슬라이드 되도록 함
function onClickPaddleNav(e) {
    e.preventDefault();
    var el = e.currentTarget; //이벤트가 바인딩된 div 요소를 반환
    if(el.classList.contains("prev")) { // 변수 el에 prev라는 클래스가 포함되어있다면
        console.log("이전"); // "이전" 출력
        _cuId--; // -1
        // -1 이 되었을 때 0 으로 값을 강제 변경.
        if(_cuId < 0) {
            _cuId = 0;
        }
    }else if(el.classList.contains("next")) { // 변수 el에 next라는 클래스가 포함되어있다면
        console.log("다음"); // "다음" 출력
        _cuId++; // +1
        // _max값이 되었을 때 거기서 -1한 값으로 강제 변경.
        if(_cuId > _max - 1) {
            _cuId = _max - 1;
        }
    }
    // 갤러리슬라이드 함수 불러옴
    gallerySlide();
}

// onTransitionEnd 함수를 만들어 transtion 스타일 요소 지움
function onTransitionEnd(e) {
    _isAni = false;
    viewContainerEl.style.removeProperty("transition");
}

// 이미지 갤러리 리사이즈
function galleryResize() {
    // 브라우저에 보여지는 이미지크기 width값을 _galleryW 값 적용
    viewEl.style.width = _galleryW + "px";
    // 갤러리이미지를 전부 묶어 놓은 viewContainerEl에 galleryW, 이미지 개수 곱한 값 적용
    viewContainerEl.style.width = _galleryW * _max + "px";
    // 갤러리이미지들의 width값을 galleryW 값으로 적용
    // for문을 사용해서 이미지 개수만큼 반복
    for(var i = 0; i < _max; i++) {
        viewItemEls[i].style.width = _galleryW + "px";
    }
    gallerySlide(true);
}

// 이미지 갤러리 슬라이드
function gallerySlide(static) {
    var left = _galleryW * _cuId * -1,
        duration = _duration + _addDuration * Math.abs(_cuId - _exId),
        bool = (static) ? static : false;
    viewContainerEl.style.transform = "translate3d(" + left + "px, 0, 0)";
    if(!bool) {
        _isAni = true;
        viewContainerEl.style.transition = "transform " + duration + "ms cubic-bezier(0.455, 0.03, 0.515, 0.955)";
        _exId = _cuId;
    }else{
        viewContainerEl.style.removeProperty("transition");
        _isAni = false;
    }
}
function addEvent() {
    viewContainerEl.addEventListener("webkitTransitionEnd", onTransitionEnd);
    viewContainerEl.addEventListener("transitionend", onTransitionEnd);
    for(var j = 0; j < btnPaddleNavEls.length; j++){
        btnPaddleNavEls[j].addEventListener("click", onClickPaddleNav);
    }
}

// 초기화 기능.
function init() {
    _max = viewItemEls.length;
    _exId = _cuId;
    addEvent();
    galleryResize();
}
init();

// 각 함수마다 다른 링크로 넘어갈 수 있도록 설정 - html에서 onclick="함수명"을 통해 클릭했을때 함수가 실행되도록 설정
function page1() {
    location.href="./gentle.html";
}
function page2() {
    location.href="./kingkong.html";
}
function page3() {
    location.href="./hotel.html";
}
function page4() {
    location.href="./le.html";
}
function page5() {
    location.href="./magazine.html";
}
function pageKingkong() {
    location.href="https://kingkongmagazine.com/";
}