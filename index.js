const {prefix, token} = require('./config.json');
const Discord = require("discord.js") // npm install discord.js 필요
const client = new Discord.Client()
const fs = require('fs'); // 파일 입출력 모듈
const internal = require("stream");
var now = new Date(); // 현재날짜 및 시간 객체
const moment = require('moment') // npm install --save moment 필요 (디데이 출력 모듈)

//npm install discord.js @discord/opus 필요
//npm install --save ffmpeg-binaries 필요



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
    msg.reply(now.getFullYear() + "년 " + (now.getMonth()+1)  + "월 " +now.getDate() + "일 " + now.getHours() + "시 " + now.getMinutes() + "분");
  } // 테스트 조건문 end





  //공부시작 시간 체크
  if (command === "공부시작") {
    var data = String(now.getHours()) +"."+ String(now.getMinutes());
    console.log(msg.author.id);

    var fileName = "./data/stopWatch/" + msg.author.id + ".txt";
    fs.writeFileSync(fileName, data, 'utf8', function(error){  // 파일에 data내용 저장
      console.log('studyStart write end');
    });
    
    msg.reply("공부시작! 열공~ ⁽⁽◝( ˙ ꒳ ˙ )◜⁾⁾");
  } //공부시작 시간 체크 end





  //공부끝 시간 체크
  if (command === "공부끝") {
    var fileName = "data/stopWatch/" + msg.author.id + ".txt";

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






  


  //디데이부분 수정 필요
  //디데이 설정 
  if (msg.content.startsWith("~디데이설정")) {
    console.log("dDaySetStart");
    try {
      var dDayData = msg.toString().split(" ");
      var dDayTitle = dDayData[1];
      var dDayWhen = dDayData[2].toString().split('/');
      var fileName = "data/dDay/" + dDayTitle + ".txt";
    
      fs.writeFileSync(fileName, dDayData[2], 'utf8', function(error){  // 파일에 data내용 저장
        console.log('dDaySet write end');
      });
      console.log(dDayWhen[0] + "월 " + dDayWhen[1] + "일에 " + dDayTitle + "이(가) 설정되었습니다.");
      msg.reply(dDayWhen[0] + "월 " + dDayWhen[1] + "일에 " + dDayTitle + "이(가) 설정되었습니다.");
    
    } catch {
      msg.reply("양식이 올바르지 않습니다. 예) ~디데이설정 기말고사 12/15");
    }

    
  } //디데이 설정 end





  //디데이 달력 보기
  if (command === "디데이보기") {
    fs.readdir('./data/dDay', (err, file_list) => { //폴더열기
      var fileArr = file_list.toString().split(','); //dDay 배열

      fileArr.forEach((el,i) => {
        fs.readFile("./data/dDay/"+el, 'utf8', function(err, data) {
          var dDayWhen = data.toString().split('/');
          var t1 = moment(); //현재 날짜
          var t2 = moment(String(now.getFullYear()) + "-" + dDayWhen[0] + "-" + dDayWhen[1] , 'YYYY-MM-DD'); // 저장된 날짜

          msg.reply(el.replace('.txt','') + "까지 D - "+ (Number(t2.diff(t1,'days')) + 2)); //dDay 답장
        });
      });
    });
  } //디데이 달력 보기 end


  //디데이 삭제
  if (msg.content.startsWith("~디데이삭제")) {
    var dDayData = msg.toString().split(" ");
    var fileName = "data/dDay/" + dDayData[1] + ".txt";
    try {

      fs.statSync(fileName); //파일 존재 확인
      try {
        fs.unlinkSync(fileName) // 파일 존재시 삭제
        msg.reply("해당 이벤트가 삭제되었습니다.");
    } catch (error) {
        if(err.code == 'ENOENT'){
            console.log("file delete error");
        }
    }
    
    } catch (error) {
    
      //파일이 없다면 에러 발생
      msg.reply("설정되지 않은 이벤트입니다.");
        if (error.code === "ENOENT") {
           console.log("파일이 존재하지 않습니다.");
        }
    }
    
    

  } //디데이 삭제 end






  // 음악재생
  if (command === "음악") {
    if (msg.member.voice.channel) {
      msg.member.voice.channel.join()
        .then(connection => {
          msg.reply("재생한다!");
          const dispatcher = connection.play("music/square.mp3");
          dispatcher.on("end", end => {});
        })
        .catch(console.log);
    } else {
      msg.reply("먼저 보이스채널에 입장해주세요.");
    }
  } // 음악재생 end


  // 보이스채널 나가기
  if (command === "나가") {
    
    if (msg.member.voice.channel) {
      msg.member.voice.channel.leave();
      msg.reply('bye!');
    } else {
      msg.reply('이미 나왔어요.');
    }
  } // 보이스채널 나가기 end






})


//디스코드 봇 토큰
client.login(token);