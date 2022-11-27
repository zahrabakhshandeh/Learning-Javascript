setInterval(()=>{
  let clockElement= document.querySelector(".clock");
  let dateElement= document.querySelector(".date");
  const now = new Date();
  let hour = now.getHours();
  let minut = now.getMinutes();
  let second = now.getSeconds();
  let dayNight = "AM";
  if(hour > 12){
    dayNight = "PM";
    hour = hour - 12;
  }
  if(hour < 10){
    hour = "0" + hour;
  }
  if(minut < 10){
    minut = "0" + minut;
  }
  if(second < 10){
    second = "0" + second;
  }
  const clock = hour+": "+minut+": "+second+" "+dayNight;
  clockElement.textContent = clock;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const curWeekDay = days[now.getDay()];
  const curDay = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const date = curWeekDay + ", " + curDay + " " + month + " " + year;
  dateElement.textContent = date;
});