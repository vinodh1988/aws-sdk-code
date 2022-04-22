FROM node:16
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
ENV ACCESS_KEY=AKIATDB3G2NAIUT4GCWD
ENV SECRET_KEY=7Lqsyy+nlzrNkpolQ3g+8edaGrDQ3rVW8RJiVUVC

COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .
EXPOSE 3000
CMD [ "node", "app.js" ]