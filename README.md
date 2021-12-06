#  디스코드 스터디 챗봇




>디스코드 상에서 스터디 진행할 수 있는 툴.

<br/>

## About The Project
------------------

### 개요
~ 공부합시다 우리 ~<br/>
블라블라

### 핵심기능

1. **오늘 얼마나 공부했는지 (시간, 공부시작, 공부중지, 등)<br/>**
    + 어제보다 얼마나 공부했는지<br/>
    + 주간 평균, 한달 평균 공부 시간<br/>
<br/>
2. **공부시간 순위<br/>**
    + 일간 순위<br/>
    + 주간 순위<br/>
<br/>
3. **D-day 기능<br/>**
<br/>
4. 음악 재생 기능

+ 공부에 집중되는 백색소음 재생 기능<br/>
+ 유튜브에서 원하는 노래 재생 기능

<br/>

### Built With

+ Node.js

## Getting Started
----------------------------

* 이 챗봇 프로그램은 디스코드 상에서 동작합니다. 먼저 [디스코드를 설치](https://discord.com/)해 주신 후 다음의 과정을 진행해주시기 바랍니다.

* [**여기**](https://discord.com/api/oauth2/authorize?client_id=907956665113018408&permissions=8&scope=bot)를 클릭하여 챗봇을 서버에 초대하시기 바랍니다.<br/>(본인이 관리자인 서버에서만 초대 가능)

### Module Installation

+ discord.js
```
npm install discord.js@12.5.3
```
+ moment
```
npm install --save moment
```
+ simple-youtube-api
```
npm install simple-youtube-api
```
+ ytdl-core
```
npm install ytdl-core
```
+ ffmpeg-binaries
```
npm install --save ffmpeg-binaries
```

### API Installation

+ Discord Developer Applications (https://discord.com/developers/applications)
+ Youtube API (https://console.developers.google.com/)

위의 두 API를 다운받으신 후에 config.json 파일에 입력해주어야합니다.

```
config.json
{
    "prefix": "~",  
    "token": "이곳에 디스코드 봇 API를 입력해주세요",
    "youtubeAPI": "이곳에 유튜브 API를 입력해주세요"
}
```


<br/>

## Usage
------------------------

### 명령어


<br/>

## Roadmap
----------------

<br/>

## Contributing
-----------------


<br/>

## License
---------------

MIT License

Copyright (c) 2021 김건우

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


<br/>

## Contact
------------------

김건우 - kgu0515@khu.ac.kr
