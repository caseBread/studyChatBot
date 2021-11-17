const Discord = require("discord.js")
const client = new Discord.Client()
var fs = require('fs'); //파일입출력 모듈
const internal = require("stream");
var now = new Date(); // 현재날짜 및 시간 객체




//로그인 콘솔 출력
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})


//명령어 인식
client.on("message", msg => {

  //테스트 조건문
  if (msg.content === "ping") {
    msg.reply("Pong!")
  }
  if (msg.content === "!현재시간") { 
    msg.reply(now.getHours() + "시 " + now.getMinutes() + "분");
  }

  //공부시작 시간 체크
  if (msg.content === "!공부시작") {
    var data = String(now.getHours()) +"."+ String(now.getMinutes());


    fs.writeFile('data.txt', data, 'utf8', function(error){  // 파일에 data내용 저장
      console.log('write end');
    });
    
    msg.reply("공부시작! 열공~ ⁽⁽◝( ˙ ꒳ ˙ )◜⁾⁾");
  }

  //공부끝 시간 체크
  if (msg.content === "!공부끝") {
    fs.readFile('data.txt', 'utf8', function(err, data) { 

      var arr = data.split('.'); // arr[0] = 공부시작시간, arr[1] = 공부종료시간

      //공부시간 계산
      var studyHours = now.getHours() - Number(arr[0]);
      if (now.getMinutes() - Number(data[1]) < 0) {
        var studyMinutes = 60 + now.getMinutes() - Number(arr[1]);
      }
      else {
        var studyMinutes = now.getMinutes() - Number(arr[1]);
      }

      //공부시간 출력
      msg.reply(studyHours + "시간 " + studyMinutes + "분 공부하였습니다.");
      console.log(studyHours + "h " +studyMinutes + "m");
    });
    

  }


})


//디스코드 봇 토큰
client.login('OTA3OTU2NjY1MTEzMDE4NDA4.YYuuiQ.Rn2yQ9lGPLr_24sky29TWQHLOYA');