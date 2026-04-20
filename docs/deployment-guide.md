# LEGO App Deployment Guide

## Step-by-step GCP setup
- 1. Create the Virtual Machine
 - Go to Google Cloud and login with your username and password
 - Create a projects folder and install **Compute Engine**
 - Go to **Compute Engine**
 - Click on **Create Instance**
  - *Machine Configuration*
   - **Name:** Name of the VM 
   - **Region:** us-west3 (Salt Lake City)
   - **Series:** N1
   - **Machine Type:** Shared core (f1 micro)
  - *Networking*
   - Allow both HTTP/HTTPS traffic (under Firewall)
   - **Network Interfaces:** External IPv4 address➡️Reserve a static external IP➡️Name: midterm-exam-devops-IP➡️Click Reserve
 - Click on **Create**
- 2. SSH into the VM
 - From the SSH command prompt, enter these commands for your SSH keys:
  - Create a folder for your keys: ```mkdir .ssh```
  - Change directory into that folder: ```cd .ssh```
  - Generate your SSH keys: ```ssh-keygen -t ed25519``` **(Name can be whatever - ex. keyname)**
  - Display your public key: ```cat keyname.pub``` **(Copy and paste the public key into your VM in the SSH section)**
  - Display your private key: ```cat keyname``` **(Copy and paste in Github Secrets)**
- 3. Install the Needed Software
 - cd into the root directory and enter these commands:
  - Update: ```sudo apt update```
  - Install nodejs, npm, git, and nginx: ```sudo apt update install -y nodejs npm git nginx ```
  - Install pm2: ```sudo npm install pm2 -g```
- 4. Clone your Github Repo
 - cd into the current user on your VM
  - Clone your repo to the VM: ```git clone [github repo url] app```
  - Change directories to your app: ```cd app```
  - Initialise the node modules: ```npm install```
- 5. Add the Enviroment Varaible
 - Run these commands from the SSH prompt:
  - Create the .env file: ```touch .env```
  - Install dotenv: ```npm i dotenv```
  - Edit the contents of .env: ```sudo vim .env```
 - In the content of .env, insert your own personal Mongo URI in there using VIM. Press I to edit, and once the URI is pasted, enetr :wq to save and quit
- 6. Set Up Nginx
 - Like before: enter these commannd into the VM:
  - Start nginx: ```sudo systemctl start nginx```
  - Enable nginx: ```sudo systemctl enable nginx```
  - Unlink default config file: ```sudo unlink /etc/nginx/sites-enabled/default```
  - Delete default config file: ```sudo rm /etc/nginx/sites-enabled/default```
  - Edit the current config file: ```sudo vim /etc/nginx/sites-available/reverse-proxy```
  - Copy and paste code below into VIM:
  ```nginx
  server {
  listen 80;
  server_name _;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
        }
  }
  ```
 - Add the symbolic link: ```sudo ln -s /etc/nginx/sites-available/reverse-proxy /etc/nginx/sites-enabled/```
 - Check the syntax: ```sudo nginx -t```
 - Restart nginx: ```sudo systemctl reload nginx```
- 7. Start pm2
 - Lastly enter these commands on the prompt:
  - Run your app: ```node app.js```
  - Start pm2 with app: ```pm2 start -f app.js```
  - Start pm2 on VM: ```pm2 startup```
  - Copy and paste the command given starting at **sudo**
  - Save pm2: ```pm2 save```
  - See is app is running: ```pm2 list```

## What is Pm2 + Nginx?
- Pm2 is a dameon process manager that includes a built in load balancer. Using pm2 will allow your app to keep running forever and reload with little to no downtime. Nginx is an HTTP web server, reverse proxy, content cache, load balancer, TCP/UDP proxy server, and mail proxy server. Nginx can complete many tasks but some of the thing I am using nginx for is to serve static and index files and virtual servers for IP adresses.

## Enviroment Varaibleds Dcoumentation
- The main enviroment variable that is going to be used in the VM is the MONGO URI. The MONGO URI uses the database name and password to connect to a certain database and collect entries. That is what keeps mongo running.

