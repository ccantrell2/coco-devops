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
| **Database Upgrade** | I switched from Dr. Cumbie's database to my own personal MongoDB Atlas database. I created my own account, project, and cluster, set a database name and password, and configured IP access. | <a href="https://github.com/ccantrell2/coco-devops/issues/14" target="_blank">Database Upgrade Milestone</a>, <a href="https://github.com/ccantrell2/coco-devops/issues/14" target="_blank">Database Upgrade Issue</a> | I set up an IP address to allow all machines: `0.0.0.0/0` |
| **Debug Case Study** | I wrote a debug case study explaining how my GCP VM was not updating my deployed app. | <a href="https://github.com/ccantrell2/coco-devops/milestone/4?closed=1" target="_blank">Debug Case Study Milestone</a>, <a href="https://github.com/ccantrell2/coco-devops/issues/9" target="_blank">Main Branch Code Problem Issue</a>, <a href="https://github.com/ccantrell2/coco-devops/issues/10" target="_blank">Full Debug Case Study Issue</a> | I discovered my VM code never updated and fixed it using `git pull origin main`. |
| **Search Function** | I added a dynamic search function that filters database entries and displays matching results in both containers. | <a href="https://github.com/ccantrell2/coco-devops/milestone/2?closed=1" target="_blank">Search Function Milestone</a>, <a href="https://github.com/ccantrell2/coco-devops/issues/11" target="_blank">Completed Search Function Issue</a> | I reused an approach from a previous project using arrays to store and filter entries. |
| **Authentication Upgrade** | I implemented a login system using JWT tokens with protected routes in my app. | <a href="https://github.com/ccantrell2/coco-devops/milestone/6?closed=1" target="_blank">Authentication Upgrade Milestone</a>, <a href="https://github.com/ccantrell2/coco-devops/issues/19" target="_blank">Authentication Upgrade Issue</a> | This was one of the most challenging features and required integrating JWT into a large codebase. |
| **Deployment Guide** | I created a step-by-step deployment guide for setting up a GCP VM, environment variables, and using PM2 + Nginx. | <a href="https://github.com/ccantrell2/coco-devops/milestone/5" target="_blank">Deployment Guide Milestone</a>, <a href="https://github.com/ccantrell2/coco-devops/issues/12" target="_blank">Full Deployment Guide Issue</a>, <a href="https://github.com/ccantrell2/coco-devops/issues/13" target="_blank">Sources Cited Issue</a> | I used my midterm notes to build a clear, command-based deployment walkthrough. |

## Sprint 99
- <a href="https://github.com/ccantrell2/coco-devops/milestone/9" target="_blank">Sprint 99 Milestone</a>