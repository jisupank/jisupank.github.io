var mainVisual = document.querySelector('#main_visual'), // main_visual 찾아옴
    // 마우스 커서
    cursorDotEl = document.querySelector('#cursor-dot'),
    cursorBGEl = document.querySelector("#cursor-bg"),
    progressEl = document.querySelector("#progress");

// setTimeout - 1초뒤에 gray_visual 클래스 추가 / mainVisual에 있는 -webkit-filter 스타일 목록 제거
setTimeout(function() { 
    console.log('Works!');
    // mainVisual.style.removeProperty("-webkit-filter");
    mainVisual.classList.add('gray_visual');
}, 1000);

// 마우스커서이벤트
function onMouseMove(e){
    // 마우스의 좌표를 받아올 posX, poxY 변수 생성
    var posX = e.clientX, 
        posY = e.clientY;
    // gsap 애니메이션, to (param1- 요소, param2-옵션값)
    gsap.to(cursorDotEl,{
        "top": posY,
        "left": posX,
        "duration": 0.5,
        "ease" : "sine.out"
    });
    gsap.to(cursorBGEl, {top: posY, left: posX, duration: 0.3, ease: "sine.out"});
    gsap.to(progressEl, {top: posY, left: posX, duration: 0.25, ease: "sine.out"});
}
// 이벤트 바인딩
window.addEventListener("mousemove", onMouseMove);
