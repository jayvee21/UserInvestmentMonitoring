# Pure-Node-JS-API
Credits to the tutor Leslie Lewis. (for the pure NodeJs API developement.)

# Dont forget
- Create ".data" directory for the filesystem library destination

Install OPENSSL
- Create HTTPS directory
- Inside HTTPS directory generate certificates by running command:
  <br>
  <pre> openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem </pre>
 
 - Run application by <pre> NODE_ENV=staging node index.js </pre> or <pre> NODE_ENV=production node index.js </pre>

About
- Develop using NodeJs
- NoSQL pattern database.