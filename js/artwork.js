    // 이미지 갤러리 변수 불러오기(기본 vivid-mode)
var galleryEl = document.querySelector("#gallery"),
    viewEl = galleryEl.querySelector(".view"),
    viewContainerEl = viewEl.querySelector(".view-container"),
    viewItemEls = viewContainerEl.querySelectorAll(".view-item"),
    viewItemImgEls = viewContainerEl.querySelectorAll(".view-item > img"),
    
    // 이미지 갤러리 변수(soft-mode) 
    softContainerEl = viewEl.querySelector(".soft-container"),
    softItemEls = softContainerEl.querySelectorAll(".soft-item"),
    softItemImgEls = softContainerEl.querySelectorAll(".soft-item > img"),

    // list불러오는 변수인데 없애면 갤러리 이미지들도 같이 없어져서 지울수 없었습니다..
    // 다른 이미지 갤러리 만들땐 없애도 아무렇지도 않았는데 여기서만...
    listEl = galleryEl.querySelector(".list"),

    _isAni = false,
    _galleryW = 700,
    _cuId = 0,
    _exId = null,
    _max = null;
    _duration = 400,
    _addDuration = 200,

    // 슬라이드 버튼
    paddleNavEl = galleryEl.querySelector(".nav"),
    btnPaddleNavEls = paddleNavEl.querySelectorAll("button.arrow"),
    btnPaddleNavPrevEl = paddleNavEl.querySelector("button.arrow.prev"),
    btnPaddleNavNextEl = paddleNavEl.querySelector("button.arrow.next");

    // 모드 바꾸는 변수
var htmlEl = document.querySelector("html"),
    h1SpanEl = document.querySelector("h1.tit > span"),
    modeListEl = document.querySelector(".mode dl"),
    modeItemEls = modeListEl.querySelectorAll("dt"),
    btnModeEls = modeListEl.querySelectorAll("dt > a"),
    _mode = "VIVID";

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
        console.log("다음") // "다음" 출력
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
    softContainerEl.style.removeProperty("transition");
}

// 이미지 갤러리 리사이즈
function galleryResize() {
    // 브라우저에 보여지는 이미지 크기 width값을 _galleryW 값 적용
    viewEl.style.width = _galleryW + "px"; 
    // 갤러리이미지를 전부 묶어 놓은 viewContainerEl에 galleryW, 이미지 개수 곱한 값 적용
    viewContainerEl.style.width = _galleryW * _max + "px"; 
    softContainerEl.style.width = _galleryW * _max + "px";
    // 갤러리이미지들의 width값을 galleryW 값으로 적용
    // for문을 사용해서 이미지 개수만큼 반복
    for(var i = 0; i < _max; i++) {
        viewItemEls[i].style.width = _galleryW + "px";
        softItemEls[i].style.width = _galleryW + "px";
    }
    gallerySlide(true);
}

// 이미지 갤러리 슬라이드
function gallerySlide(static) {
    var left = _galleryW * _cuId * -1,
        duration = _duration + _addDuration * Math.abs(_cuId - _exId),
        bool = (static) ? static : false;
    viewContainerEl.style.transform = "translate3d(" + left + "px, 0, 0)";
    softContainerEl.style.transform = "translate3d(" + left + "px, 0, 0)";
    if(!bool) {
        _isAni = true;
        viewContainerEl.style.transition = "transform " + duration + "ms cubic-bezier(0.455, 0.03, 0.515, 0.955)";
        softContainerEl.style.transition = "transform " + duration + "ms cubic-bezier(0.455, 0.03, 0.515, 0.955)";
        _exId = _cuId;
    }else{
        viewContainerEl.style.removeProperty("transition");
        softContainerEl.style.removeProperty("transition");
        _isAni = false;
    }
}

// 모드 변경 (VIVID / SOFT) 클릭하는 함수
function onClickMode(e) {
    e.preventDefault();
    var el = e.currentTarget, 
        parentEl = el.parentElement, 
        // href 찾아와서 vivid, soft 텍스트 대체
        type = el.getAttribute("href").replace("#", "");
    // parentEl에 selected가 있다면 - false 일 때    
    if(!parentEl.classList.contains("selected")) { 
        // 모드 개수만큼 반복
        for(var i = 0; i < modeItemEls.length; i++) { 
            // 모드에 selected 클래스 제거
            modeItemEls[i].classList.remove("selected"); 
        }
        // parentEl에 selected 클래스 추가
        parentEl.classList.add("selected"); 
        // 텍스트가 변경되는 type을 현재 "VIVID"인 _mode에 대입
        _mode = type; 
        // 모드 변경하는 setMode 함수 불러오기
        setMode(); 
    }
}

// 모드 변경 (VIVID / SOFT)
function setMode() {
    // htmlEl에 mode-VIVID, mode-SOFT 클래스 제거
    htmlEl.classList.remove("mode-VIVID", "mode-SOFT"); 
    // htmlEl에 ("mode-"+ 바뀐 type이 들어간 모드 변수) 클래스 추가
    htmlEl.classList.add("mode-" + _mode);
    // h1SpanEl에 모드텍스트 기입해서 브라우저에서 보이게 함
    h1SpanEl.innerText = _mode;
}

//------------------
// 이벤트가 바인딩되는 기능들.
function addEvent() {
    // 트렌지션 끝내는 이벤트 바인딩 기능
    viewContainerEl.addEventListener("webkitTransitionEnd", onTransitionEnd);
    viewContainerEl.addEventListener("transitionend", onTransitionEnd);
    // 이미지슬라이드 버튼 클릭 이벤트 바인딩 기능
    for(var j = 0; j < btnPaddleNavEls.length; j++){
        btnPaddleNavEls[j].addEventListener("click", onClickPaddleNav);
    }
    // 모드 변경 버튼 클릭 이벤트 바인딩 기능
    for(var i = 0; i < btnModeEls.length; i++) {
        btnModeEls[i].addEventListener("click", onClickMode);
    }
}

// 초기화 기능.
function init() {
    _max = viewItemEls.length;
    _exId = _cuId;
    addEvent();
    setMode();
    galleryResize();
}
init();