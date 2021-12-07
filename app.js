const {prefix, token, youtubeAPI} = require('./config.json');
const Discord = require("discord.js") // npm install discord.js 필요
const {MessageEmbed} = require('discord.js');
const client = new Discord.Client()
const fs = require('fs'); // 파일 입출력 모듈
const internal = require("stream");
var now = new Date(); // 현재날짜 및 시간 객체
const moment = require('moment') // npm install --save moment 필요 (디데이 출력 모듈)
const Youtube = require('simple-youtube-api'); // npm install simple-youtube-api
const youtube = new Youtube(youtubeAPI);
const ytdl = require('ytdl-core'); // npm install ytdl-core
const { getVideoID } = require('ytdl-core');




//npm install discord.js @discord/opus 필요
//npm install --save ffmpeg-binaries 필요



//로그인 콘솔 출력
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('쿠옹이사용법! ➤ '+prefix+'도움말', {
    type : 'PLAYING'
  })
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
    msg.reply(":ping_pong:  Pong!")
  }
  if (command === "현재시간") { 
    msg.reply(now.getFullYear() + "년 " + (now.getMonth()+1)  + "월 " +now.getDate() + "일 " + now.getHours() + "시 " + now.getMinutes() + "분");
  } // 테스트 조건문 end




  //도움말 출력
  if (command === "help" || command === "도움말") {
    const helpEmbed = new MessageEmbed()
      .setColor('#A40F16')
      .setTitle(':lion_face: 쿠옹이 사용법 :lion_face: ')
      .addField(prefix+'ping', '쿠옹이와 탁구를 칩니다.')
      .addField(prefix+'현재시간', '현재시간을 알려줍니다.')
      .addField(prefix+'공부시작', '공부 시작!\n스톱워치가 켜집니다.')
      .addField(prefix+'공부끝', '공부 끝!\n스톱워치가 멈춥니다.')
      .addField(prefix+'순위', '공부한 시간 순위를 알려줍니다.')
      .addField(prefix+'디데이설정 ①  ②', '디데이를 설정합니다.\n① : 이벤트이름\n② : 이벤트날짜 (mm/dd)\nex) '+prefix+'디데이설정 기말고사 12/15')
      .addField(prefix+'디데이보기', '설정된 디데이를 보여줍니다.')
      .addField(prefix+'디데이삭제 ①', '입력한 이벤트를 삭제합니다.\n① : 이벤트이름\nex)'+prefix+'디데이삭제 기말고사')
      //.addField('백색소음', '백색소음을 재생합니다.\n(먼저 음성채널에 입장해야합니다)')
      .addField(prefix+'재생 ①','①을 재생합니다.\n① : 노래제목\n(먼저 음성채널에 입장해야합니다')
      .setTimestamp()
      .setFooter('쿠옹이 사용법');

      
    msg.reply(helpEmbed);
  }









  //공부시작 시간 체크
  if (command === "공부시작") {
    var data = String(now.getHours()) +"."+ String(now.getMinutes());
    console.log(msg.author.id);

    var fileName = "./data/stopWatch/" + msg.author.id + ".txt";
    fs.writeFileSync(fileName, data, 'utf8', function(error){  // 파일에 data내용 저장
      console.log('studyStart write end');
    });
    
    msg.reply("공부시작! 열공~ :lion_face::lion_face:");
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
        msg.reply(studyHours + "시간 " + studyMinutes + "분 공부했어요.");
        console.log(studyHours + "h " + studyMinutes + "m");

        //studyTime 기록
        var fileName = "data/studyTime/" + msg.author.id + ".txt";
        var appendData = String(studyHours) + "." + String(studyMinutes) + " ";
        fs.appendFile(fileName, appendData, function(err) {
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
        });

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
        msg.reply("아직 공부를 시작하지 않았어요.");
      }
    }

  } //공부끝 시간 체크 end




  //수정 필요
  //공부시간 순위
  if (command === '순위') {
    var studyTimeArr = [];
    fs.readdir('./data/studyTime', (err, file_list) => { //폴더열기
      var fileArr = file_list.toString().split(','); //studyTime 파일 배열
      var cnt = 0
      fileArr.forEach((el,i) => {
        var data = fs.readFileSync("./data/studyTime/"+el, 'utf8');
          data = data.slice(0,-1);
          var timeDiv = data.toString().split(' ');
          var sumTime = 0;
          timeDiv.forEach((j,k) => { // j형식 = ~.@ ( ~는 시, @는 분)
            var timeData = j.toString().split('.');
            sumTime += Number(timeData[0])*60;
            sumTime += Number(timeData[1]);
          });
          var tempArr = new Array(2);
          tempArr[0] = sumTime;
          tempArr[1] = el.replace('.txt','');
          studyTimeArr.push(tempArr);
      });

      //순위 출력
      studyTimeArr.sort((a, b) => (b[0]+b[1]) - (a[0]+a[1]));
      for (var i = 0; i < studyTimeArr.length; i++) {
        msg.channel.send((i+1)+"등 <@"+studyTimeArr[i][1]+"> 님 "+parseInt(studyTimeArr[i][0]/60)+"시간 "+studyTimeArr[i][0]%60+"분 공부했어요");
      }
    });
  }//공부시간 순위 end





  /*
  if (command === '순위출력') {
    const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('공부시간 순위')
            .setDescription('누가 공부를 제일 많이 했을까요?')
            .addField("<@"+studyTimeArr[0][0]+">", String(studyTimeArr[0][1]) + ' ' + String(studyTimeArr[0][2]))
            .addField("<@"+studyTimeArr[1][0]+">", String(studyTimeArr[1][1]) + ' ' + String(studyTimeArr[1][2]))
            .setTimestamp()
            .setFooter('공부시간 순위');
          msg.reply(exampleEmbed);
  }
  */




  


  //디데이부분 수정 필요
  //디데이 설정 
  if (msg.content.startsWith(prefix+"디데이설정")) {
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
      msg.reply("양식이 올바르지 않아요. 예) "+prefix+"디데이설정 기말고사 12/15");
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
          var dDayPrint = (Number(t2.diff(t1,'days')) + 2);
          if (dDayPrint > 0) {
            msg.reply(el.replace('.txt','') + "까지 D - "+ dDayPrint); //dDay 답장 (날짜안지난경우)
          }
          else if (dDayPrint < 0) {
            msg.reply(el.replace('.txt','') + "까지 D + "+ (-dDayPrint)); //dDay 답장 (날짜지난경우)
          }
          else {
            msg.reply(el.replace('.txt','') + "까지 D - day"); //dDay 답장 (오늘인경우)
          }

        });
      });
    });
  } //디데이 달력 보기 end


  //디데이 삭제
  if (msg.content.startsWith(prefix+"디데이삭제")) {
    var dDayData = msg.toString().split(" ");
    var fileName = "data/dDay/" + dDayData[1] + ".txt";
    try {

      fs.statSync(fileName); //파일 존재 확인
      try {
        fs.unlinkSync(fileName) // 파일 존재시 삭제
        msg.reply("해당 이벤트가 삭제되었어요");
    } catch (error) {
        if(err.code == 'ENOENT'){
            console.log("file delete error");
        }
    }
    
    } catch (error) {
    
      //파일이 없다면 에러 발생
      msg.reply("설정되지 않은 이벤트입니다.");
        if (error.code === "ENOENT") {
           console.log("파일이 존재하지 않아요");
        }
    }
    
    

  } //디데이 삭제 end






  // 음악재생
  if (command === "백색소음") {
    if (msg.member.voice.channel) {
      msg.member.voice.channel.join()
        .then(connection => {
          msg.reply("재생한다!");
          const dispatcher = connection.play("music/comfortable.mp3"); 
          dispatcher.on("end", end => {});
        })
        .catch(console.log); 
    } else {
      msg.reply("먼저 보이스채널에 입장해주세요!");
    }
  } // 음악재생 end


  // 보이스채널 나가기
  if (command === "나가") {
    
    if (msg.member.voice.channel) {
      msg.member.voice.channel.leave();
      msg.reply('bye!');
    } else {
      msg.reply('이미 나왔어요 :lion_face:...');
    }
  } // 보이스채널 나가기 end





  //유튜브 음악 재생
  if (msg.content.startsWith(prefix+"재생")) {
    var msgData = msg.toString().split(" ");
    if (msg.member.voice.channel) {
      msg.member.voice.channel.join()
        .then(connection => {
          youtube.searchVideos(msgData[1]).then(results => { // 유튜브에 msgData[1] 검색
            const play = connection.play(ytdl("https://www.youtube.com/watch?v="+results[0].id)); 
            play.on('start', () => {
              //내용 추가 필요
            });
            console.log(results[0].title);
            msg.reply(results[0].title + " 을 재생할게요!");
          });
        }).catch(err => {
          console.error(err);
          return msg.member.voice.channel.leave();
        }); 
    } else {
      msg.reply("먼저 보이스채널에 입장해주세요!");
    }
  } // 유튜브 음악 재생 end
  




})


//디스코드 봇 토큰
client.login(token);