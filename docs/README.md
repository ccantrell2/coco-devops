# LEGO App
- Author: Cohen Cantrell
- <a href="https://dev-coco-devops.onrender.com/">Render</a>
- <a href="https://legodevops.barrycumbie.com/">Production</a>
- This app allows you to track the current and future aspects of your LEGO sets. It alllows the user to keep track of thier current progress with the set and create a wishlist of future sets they want to add to thier collection. Good luck and enjoy!

## User Story
 - I created this app because I had a problem keeping up with what bag number I was on when I would work on a Lego Set and leave it for a time, such as going back to school. This app will allow me to track what set I was builidng and what bag I recently completed, allowing me to pick up right where a left off. Secondly, my girlfirend wanted a wishlist of the lego sets I wanted, so she could know which sets I wanted for gifts. In the past my lego wishlist was just simply a page on my notes app I shared with her and this system was janky and confusing. With my lego wishlist feature, it will allow her to see the name of the set, brand, pieces, and price.
 
## Target Users
- This app can be used by anyone involved with lego building. If you are currently an active collector or just buy a set here and there, this app allows you to trak your progress of any set at any time. This app can be used for all ages, and its easy to understand user interface allows anyone, tech savy or not, to undersatnd and use it.

## Features
- Search Features
- Login System
- Database Connection
- Easy navigation
- Input fields
- Consistent layout design

## Tech Stack
- node.js
- express.js
- MongoDB
- nodemon
- dotenv
- Render
- RESTful API
- Normalize.css
- Bootstrap 5
- .yaml
- GCP

## Milestones and Issues
 - <a href="https://github.com/ccantrell2/coco-devops/milestones" target="_blank">Milestones</a>
 - <a href="https://github.com/ccantrell2/coco-devops/issues" target="_blank">Issues</a>

## Value Proposition
- My app improves the way I keep track of my current set building and it also improves the way I can get a wishlist to my friends and family, plus keeping a personal list for myself.
  - **Before:**
    - No orginization of lists
    - Didn't know where I left off when I would leave a set for an extended period of time
    - My wishlist was confusing and severly non user friendly
  - **After:**
    - Wishlist is more accesible, with it being stored in a container with a search function
    - I am able to keep up with current sets I am building, no matter how long I am gone for
    - Allows me to have a secure way in which to store all of my LEGO information

## Capability Boxes
| Box | What I Did | Evidence | Notes |                                                                           
|---|---|---|---|
| **Database Upgrade** | I switched from Dr. Cumbie's database to my own personal MongoDB Atlas Database. I created my own account, created a new project and cluster, set a database name and password, and set all my necessary IP addresses up. | <a href="https://github.com/ccantrell2/coco-devops/issues/14" target="_blank">Database Upgrade Milestone</a>, <a href="https://github.com/ccantrell2/coco-devops/issues/14" target="_blank">Database Upgrade Issue</a> | I set up a IP address to listen to all machines in my database: `0.0.0.0/0` |
| **Debug Case Study** | I wrote a debug case study about how my GCP VM was holding up and not allowing my new code to update my app on the URL.  | <a href="https://github.com/ccantrell2/coco-devops/milestone/4?closed=1" target="_blank">Debug Case Study Milestone</a>, <a href="https://github.com/ccantrell2/coco-devops/issues/9" target="_blank">Main Branch Code Problem Issue</a>, <a href="https://github.com/ccantrell2/coco-devops/issues/10" target="_blank">Full Debug Case Study Issue</a>  | I had to add an update a couple of days later because my solution did not work as I originally thought. I had to do a cat on my app in my VM and realized that my code never updated. I then did a ```git pull main origin``` which fixed the issue.  |                                                                    
| **Search Function**| I added a search function that filters through the database entries dynamically and displays the desired entry in both containers for the user | <a href="https://github.com/ccantrell2/coco-devops/milestone/2?closed=1" target="_blank">Search Function Milestone</a>,  <a href="https://github.com/ccantrell2/coco-devops/issues/11" target="_blank">Completed Search Function Issue</a>| I basically had to reteach myself how to implement a search bar and It was a humbling experience. A past project from 376 saved me with the idea of storing the entries into arrays. |   
| **Authentication Upgrade**| I added a login page that connects to a JWT token system which uses protected routes in my index and app files. | <a href="https://github.com/ccantrell2/coco-devops/milestone/6?closed=1" target="_blank">Authentication Upgrade Milestone</a>, <a href="https://github.com/ccantrell2/coco-devops/issues/19" target="_blank">Authentication Upgrade Issue</a> | Completing this capability box was one of the most challenging things I encountered this semester. Dr. Cumbie's tutorial on JWT saved me on this box but I still got lost in the code and websites I visited to figure this out. Also, it took me about an hour to figure out where this code would fit into my huge app and index files (should have focused on the advanced architecture)|
| **Deployment Guide**| I created a deployment guide that gives a full step-by-step explanation of setting up your GCP VM for your app, along with the environment variables needed and an explanation of Pm2 + Nginx | <a href="https://github.com/ccantrell2/coco-devops/milestone/5?closed=1" target="_blank">Deployment Guide Milestone</a>, <a href="https://github.com/ccantrell2/coco-devops/issues/12" target="_blank">Full Deployment Guide Issue</a>, <a href="https://github.com/ccantrell2/coco-devops/issues/13" target="_blank">Sources Cited Issue</a>| To set mu my deployment guide, I went back to the notes I had taken for the midterm exam. This allowed me to give exact, step by step instructions with commands |
---

## Sprint 99
- <a href="https://github.com/ccantrell2/coco-devops/milestone/9" target="_blank">Sprint 99 Milestone</a>
