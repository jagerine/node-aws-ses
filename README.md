# NodeJS AWS SES SMTP Relay

The purpose of this is to allow you to quickly start up a custom smtp server that is ready to relay your messages to AWS-SES with minimal to no configuration in your applications. Simply point your SMTP connections to your location and configure the server with your AWS credentials. 

This can assist in places where applications use native mail functions where the SMTP destination is not easily configurable.

Using: **nodemailer**, **smtp-server**, **mailparser**, **dotenv**

## Installation 

1. Clone this repostory 
2. Rename `.env.example` to `.env` and update with your credentials
3. Use `npm install` 

#### Run with node: 

```bash 
$ node index.js 
```

#### Run with Docker: 

```bash 
$ docker build -t ses-test . 

$ docker run -d -p 25:25 ses-test 
```

#### Service in Docker Compose 

```yml 
version: '3'
services:
  smtp:
    container_name: smtp
    expose: 
      - "25"
    build:
      context: ./
    volumes:
      - ./index.js:/app/index.js
```

## Testing 

### Test with Node

You can test the sending with NodeJS without running the server or any docker containers by running the provided test script along with a recipient: 

```bash 
$ node test.js test.me@example.com
```

### Test with Telnet 

If you server is running, you can test a successful connection with telnet: 

```bash
$ telnet localhost 25
```

This will open a connection to the SMTP server. Then, manually enter SMTP commands to see the responses. For example:

```bash
EHLO localhost
MAIL FROM: <authorized.sender@example.com>
RCPT TO: <test.me@example.com>
DATA
Subject: Test Subject
From: authorized.sender@example.com
To: test.me@example.com

Testing email server listening.
.
QUIT
```