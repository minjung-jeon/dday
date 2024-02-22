//값들.

//기본창.
//전체 입력창.
const inputContainer = document.getElementById('input-container');
//전체 폼.
const countdownForm = document.getElementById('countdownForm');
//날짜 입력창.
const dateEl = document.getElementById('date-picker');

//카운트다운창.
//전체 카운트다운.
const countdownEl = document.getElementById('countdown');
//제목
const countdownElTitle = document.getElementById('countdown-title');
//시간을 표기하는 숫자들.
const timeElements = document.querySelectorAll('span');

//완료창
//전체 완료창.
const completeEl = document.getElementById('complete');

const urlParams = new URLSearchParams(window.location.search);
let countdownDate = urlParams.get('day');
let countdownValue = Date;
let countdownActive;
let savedCountdown;

//시간.
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;




//오늘의 날짜를 date의 최솟값으로 설정해 카운트다운의 기준점을 만든다.
const today = new Date().toISOString().split('T')[0];


// 문서에 카운트다운 값 채우기. / UI 완성.
function updateDOM() {
  countdownActive = setInterval(() => {
    //현재시간의 총량을 가져옴.
    const now = new Date().getTime();
    //선택시간- 현재시간량은 걸리는 기간.
    const distance = countdownValue - now;
    //시간 계산.
    const days = Math.floor(distance / day);
    // const hours = Math.floor((distance % day) / hour);
    // const minutes = Math.floor((distance % hour) / minute);
    // const seconds = Math.floor((distance % minute) / second);
    // 카운트다운이 끝나면 최종 실행.
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeEl.hidden = false;
    } else {
      // 카운트다운이 진행되는 동안에는 시간이 줄어드는 게 보여야 한다.
      timeElements[0].textContent = `${days}`;
      // timeElements[1].textContent = `${hours}`;
      // timeElements[2].textContent = `${minutes}`;
      // timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
  //setinterval의 간격이 초단위로 가면서 초시계 완성!
}

function updateCountdown() {
  savedCountdown = {
    date: countdownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  //선택한 날짜가 가지는 전체 시간.
  countdownValue = new Date(countdownDate).getTime();
  updateDOM();
}

function restorePreviousCountdown() {
  // 유효값이 있을 경우 저장소에서 날짜를 가져온다.
  if (localStorage.getItem('countdown')) {
    //값이 있으면 카운트다운 실행.
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    //parse를 통해 문자값을 변환.
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
    //저장값으로 카운트다운 실행.
  }
}

// On Load, check localStorage
updateCountdown();
// restorePreviousCountdown();
