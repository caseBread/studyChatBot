const {prefix, token} = require('./config.json');
const Discord = require("discord.js")
const client = new Discord.Client()
var fs = require('fs'); //파일입출력 모듈
const internal = require("stream");
var now = new Date(); // 현재날짜 및 시간 객체





//로그인 콘솔 출력
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setPresence({ game: { name: "챗봇 상태메시지 적는곳"}, status: "online"})
});


//명령어 인식
client.on("message", msg => {
  console.log(msg.author.id, msg.content); //채팅을 로그에 띄우기



  //prefix로 시작하지 않는경우 통과   를 위한 명령어 
  if (!msg.content.startsWith(prefix) || msg.author.bot) return; 
  const args=msg.content.slice(prefix.length).split(" "); 
  const command=args.shift().toLowerCase();
  //prefix로 시작하지 않는경우 통과   를 위한 명령어 end




  //테스트 조건문
  if (command === "ping") {
    msg.reply("Pong!")
  }
  if (command === "현재시간") { 
    msg.reply(now.getHours() + "시 " + now.getMinutes() + "분");
  } // 테스트 조건문 end





  //공부시작 시간 체크
  if (command === "공부시작") {
    var data = String(now.getHours()) +"."+ String(now.getMinutes());
    console.log(msg.author.id);

    var fileName = msg.author.id + ".txt";
    fs.writeFileSync(fileName, data, 'utf8', function(error){  // 파일에 data내용 저장
      console.log('studyStart write end');
    });
    
    msg.reply("공부시작! 열공~ ⁽⁽◝( ˙ ꒳ ˙ )◜⁾⁾");
  } //공부시작 시간 체크 end





  //공부끝 시간 체크
  if (command === "공부끝") {
    var fileName = msg.author.id + ".txt";

    try {
    // 파일 있는지 확인. 없으면 catch

    //(공부시작을 한 경우) : 공부시간 계산
      fs.readFile(fileName, 'utf8', function(err, data) { 
        console.log('find');
        var studyData = data.toString().split('.');
        var studyHours = now.getHours() - Number(studyData[0]);
        if (now.getMinutes() - Number(studyData[1]) < 0) {
          var studyMinutes = 60 + now.getMinutes() - Number(studyData[1]);
        }
        else {
          var studyMinutes = now.getMinutes() - Number(studyData[1]);
        }

        //공부시간 출력
        msg.reply(studyHours + "시간 " + studyMinutes + "분 공부하였습니다.");
        console.log(studyHours + "h " + studyMinutes + "m");
      });
      //공부시간 출력하였으면 공부시작 적은 파일 삭제.
      try {
          fs.unlinkSync(fileName)
      } catch (error) {
          if(err.code == 'ENOENT'){
              console.log("file delete error");
          }
      }

    } catch (error) {
      //(공부시작을 하지 않은 경우)
      if (error.code === "ENOENT") {
        console.log("user no start");
        msg.reply("아직 공부를 시작하지 않았습니다.");
      }
    }

  } //공부끝 시간 체크 end




















})


//디스코드 봇 토큰
client.login(token);