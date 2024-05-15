# Project Proposal - Tasktician
The title we propose for our project is ***Tasktician***.

## Problem
Students often get distracted or procrastinate on their studying. Additionally, many students do not have a way of tracking their study hours, setting clear weekly goals for themselves, or tracking tasks needing to be done for the week. Our app is a general ***study tracker and productivity tool*** that makes studying more interesting by having users accumulate points for each hour they study. Our target users are  predominantly highschool and college age students. During and after highschool, a student's workload becomes significantly harder, so our app aims to help students keep up with their studying by making it a more fun, game-like process. 

## General Features
The main feature of our app is to incentivise studying by having an internal point tracking system where users will earn points for each hour they study. At the beginning of the week, users will be able to enter the number of hours they want to study for the week. Throughout the week, they can use the timer to track the amount they are studying. 

The home page will feature a weekly calendar that users can block out times they plan to set aside for studying. Clicking a day in the weekly calendar opens up the daily view where users can see the study hours for that day up closer. In addition to the calendar, the home page will feature a side tab system which will hold the user's profile, the daily and weekly to-do lists, the user's progress on their weekly study goal, and the user's latest study sessions. The profile tab will hold general information about the user such as their username, email, and password. The to-do list tab can be added to as the user sees fit to prioritize the tasks they want to get done. The progress tab will allow users to input how many hours they want to study for a given week and will also show the user how close they are to their weekly study goal.

We plan to include push notifications so a user can be notified when it is the end of the week and they haven't met their weekly study goal. Finally, the study session tab will keep track of all the latest timers that the user has started and named. At the top of the home page will be a timer with the current time or the amount the user has been studying. When a user starts a study session, they can name the timer based on what they are studying, which will add it to the list of timers in the tab view. 

Logging into the app will require the user to input their email, username, and password. This data will be displayed in the user profile. We will also need to keep track of times/dates for the timers and calendars which we plan to use a Javascript library for. All other data in the app, such as the to-do list information, weekly goals, and study session names will be provided by the user as they interact with the app. 

## PWA Capabilities
We believe this app would be successful as a progressive web application for a variety of reasons. First, we want this app to be transportable and accessible to all kinds of students so the fact that a PWA can support all systems and can be run from a broswer or installed as an app is vital. Additionally, the offline capabilities of PWAs would be very helpful for this app because people may be studying in public settings or other places where they may not have internet access. We also want to have push notification capabilities to send users notifications when they aren’t currently using the app. Finally, we want to take advantage of the mobile-first design to make our app more user friendly and accessible.

## Draft Wireframes
Below are some draft wireframes representing the main views - both mobile and desktop - of our app.

### Mobile View

|Weekly|Daily|
|:-:|:-:|
![Mobile Weekly View](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupS/blob/main/Proposal/Wireframes/mobile-weekly-view.png) | ![Mobile Daily View](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupS/blob/main/Proposal/Wireframes/mobile-daily-view.png)

### Desktop View

|Weekly|Daily|
|:-:|:-:|
![Desktop Weekly View](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupS/blob/main/Proposal/Wireframes/desktop-weekly-view.png) | ![Desktop Daily View](https://github.ncsu.edu/engr-csc342/csc342-2024Spring-GroupS/blob/main/Proposal/Wireframes/desktop-daily-view.png)

## Team Contributions

### Proposal
|Member|Contribution|
|:-:|---|
|dmbojo|<ul><li>Set up repository</li><li>Added content to README files</li><li>Helped draft project proposal</li><li>Helped draft wireframes</li></ul>|
|dkang8|<ul><li>Created wireframe drafts</li><li>Wrote initial source code for project</li><li>Helped draft project proposal</li></ul>|
|svjacobs|<ul><li>Created project proposal draft</li><li>Helped draft wireframes</li></ul>|

### Future Work (tentative)
|Member|Contribution|
|:-:|---|
|dmbojo|<ul><li>Style</li></ul>|
|dkang8|<ul><li>Backend</li></ul>|
|svjacobs|<ul><li>Frontend</li></ul>|
