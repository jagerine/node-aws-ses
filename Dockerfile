FROM node:19-alpine

WORKDIR /app

RUN npm install nodemailer smtp-server mailparser dotenv

COPY index.js ./
COPY sendmail.js ./
COPY .env ./
COPY node_modules ./node_modules

CMD [ "node", "index.js" ]