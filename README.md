# Server

Sinder 프로젝트의 서버 리포지토리 입니다.

### 폴더 구조

```
.
├── README.md
├── __tests__
│   └── LogInFlow.spec.js
├── app.js
├── config
│   ├── mongodb.js
│   ├── passport.js
│   ├── redis.js
│   └── secrets.js
├── constants
│   └── errorConstants.js
├── controllers
│   ├── auth.js
│   ├── chats.js
│   ├── index.js
│   └── user.js
├── loaders
│   ├── middleware.js
│   └── socket.js
├── middlewares
│   ├── checkJWT.js
│   ├── errorHandler.js
│   ├── protect.js
│   └── validation.js
├── models
│   ├── ChatRoom.js
│   ├── CoffeeForm.js
│   ├── Language.js
│   ├── Match.js
│   └── User.js
├── package-lock.json
├── package.json
├── routes
│   ├── auth.js
│   ├── chat.js
│   ├── index.js
│   └── user.js
├── services
│   ├── ChatRoomService.js
│   ├── CoffeeFormService.js
│   ├── LanguageService.js
│   ├── MatchService.js
│   └── UserService.js
└── utils
    ├── ErrorResponse.js
    ├── asyncCatcher.js
    ├── duplicateChatroomChecker.js
    ├── generateJWT.js
    └── helpers.js
```

### 배포 링크

[AWS Elastic Beanstalk 에 배포 했습니다.](http://sinderproject-env.eba-p3ciumxi.us-east-1.elasticbeanstalk.com)
