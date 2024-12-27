document.addEventListener("DOMContentLoaded", function () {
  const start_btn = document.querySelector(".start");
  const stop_btn = document.querySelector(".stop");
  const reset_btn = document.querySelector(".reset");

  const hour = document.querySelector(".hours");
  const minute = document.querySelector(".minutes");
  const second = document.querySelector(".seconds");

  let countdown = null;

  function startInterval() {
    if (hour.value == 0 && minute.value == 0 && second.value == 0) return;
    countdown = setInterval(() => {
      timer();
    }, 1000);

    start_btn.style.display = "none";
    stop_btn.style.display = "block";
  }

  function stopInterval(state) {
    start_btn.innerHTML = state === "pause" ? "Continue" : "Start";

    start_btn.style.display = "initial";
    stop_btn.style.display = "none";
    clearInterval(countdown);
  }

  function resetInterval() {
    hour.value = "";
    minute.value = "";
    second.value = "";
    stopInterval();
  }

  function timer() {
    if (second.value > 60) {
      minute.value++;
      second.value = parseInt(second.value) - 59;
    }

    if (minute.value > 60) {
      hour.value++;
      minute.value = parseInt(minute.value) - 60;
    }

    if (hour.value == 0 && minute.value == 0 && second.value == 0) {
      resetInterval();
      return;
    } else if (second.value != 0) {
      second.value = `${second.value < 10 ? "0" : ""}${second.value - 1}`;
    } else if (minute.value != 0 && second.value == 0) {
      second.value = 59;
      minute.value = `${minute.value < 10 ? "0" : ""}${minute.value - 1}`;
    } else if (hour.value != 0 && minute.value == 0) {
      minute.value = 60;
      hour.value = `${hour.value < 10 ? "0" : ""}${hour.value - 1}`;
    }
  }

  start_btn.addEventListener("click", startInterval);
  stop_btn.addEventListener("click", () => stopInterval("pause"));
  reset_btn.addEventListener("click", resetInterval);
});
