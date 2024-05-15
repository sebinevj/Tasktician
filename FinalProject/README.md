# Tasktician
## Group S: Final Project

### Features
* User login (authentication), authorization, and account registration functionalities are fully implemented and working.
* Once authenticated, users can view their dashboard which features a main calendar, a timer, and some tabs.
  - The main calendar is dynamic and shows the days of the week depending on the current day. It shows the times throughout the day, and users can drag created to-dos onto any timeblock of a day.
  - The timer can be started and stopped. It will continue to run until stopped. Once stopped, the timer, along with its details, will be added to the timers tab.
* The left hand side of the app (or the very top of the app if on mobile) has 4 main tabs:
  - To-Do Items: Displays a list of to-do items for the user. They may add and delete to-dos from their list. They may also click and drag to-do items onto a timeblock on the calendar.
  - Weekly Progress: Displays a list of weekly goals, as well as a progress bar that the user can manipulate (by adding or subtracting) in real time to reflect their progress.
  - Timers: Contains a list of timers that the user has started and stopped. The duration of the timer, as well as its start and end time, are shown for each timer.
  - Profile: Displays information relevant to the current user. Features a logout button to sign out of the app.

***

### Known Issues
We have seen some inconsistent behavior with our offline functionalities, but that could be due to external/unseen factors. Also, the content blocks work, but are unable to be persisted.

***

### Authentication & Authorization Process
Authentication was handled using the crypto package. When a user registers an account, they are given a randomly generated 64-bit salt. The user's hashed password and salt are stored in the database. To authenticate credentials, the password from user input, as well as their salt, are hashed via the `crypto.pbkdf2()` function and then tested against their stored password hash. Authorization was handled via JWT and our TokenMiddleware implementation, which is used for all of our API endpoints (other than login, register, and logout), so that no unauthenticated users are able to visit any other pages or handle any data within our app. Also, users cannot see the information of any other user (like visiting their homepage).

***

### Pages
Page|How to Navigate|Offline Functionality
:-:|:--|:--
Login|The login page is the default page of our app. It is the first page you see when opening the app.|The user cannot log in if they are offline, as there is no reliable way to verify credentials. An alert is displayed if this is the case.
Register|Can be reached by clicking the 'Sign up' button on the login page.|The user cannot register if they are offline, as an account cannot be created without a connection to the server. An alert is displayed if this is the case.
Dashboard|Can be reached by logging in. Contains a main calendar, a timer, and tabs.|The calendar can still be interacted with by inserting to-do items onto timeblocks and the timer can be started/stopped. These changes are not persisted and that is gracefully communicated to the user if they are offline.
To-Do Items (tab)|Can be reached by clicking on the purple 'To-Do Items' tab.|To-do items cannot be added/removed if offline, but the user can still drag and drop them onto calendar timeblocks.
Weekly Progress (tab)|Can be reached by clicking on the blue 'Weekly Progress' tab.|Weekly goals cannot be added/removed if offline, but the user can still change their study goal / hours studied to manipulate their progress bar. A note is displayed in the tab to let the user know that their changes will not be saved if offline.
Timers (tab)|Can be reached by clicking on the green 'Timers' tab.|The user can still see their previous timers if offline, but if they start a new timer, it will not be saved to the timers tab. This is communicated to the user.
Profile (tab)|Can be reached by clicking on the yellow 'Profile' tab.|The user can still see their profile information if offline, and they can also log out of the app.

***

### Caching Strategy
Instead of using a dedicated offline page, we chose to simply display alerts to the user due to it being more appropriate for our app, which is how we are communicating to the user that they are offline. A service worker is used to cache the GET requests when the user is online, which are then subsequently used whenever the user goes offline. We opted to go for a network-first strategy with the CacheAPI so that our dynamic content would retrieved first before attempting to access the cache. All the GET requests are cached and, whenever offline, any action from the user that requires a non-GET request will instead display an alert to the user that they must be online to make that request.

***

### API Endpoints

Method|Route|Description
:-:|---|---
`POST`|`/users/login`|Receives an username and password
`GET`|`/users/logout`|Logs a user out, removing the JWT from their cookie
`POST`|`/users/register`|Create a new user object (when a user registers)
`GET`|`/users/current`|Retrieves the currently logged-in user
`GET`|`/users/:userID`|Retrieves a user by its ID
`POST`|`/timers/:userID`|Create a new timer
`GET`|`/timers/:userID`|Get the timers for a specific user
`POST`|`/progress/:userID`|Create the weekly goals of the user
`GET`|`/progress/:userID`|Get the weekly goals of the user
`PUT`|`/progress/:userID`|Update the weekly goals of the user
`POST`|`/progress/goals/:userID`|Add a goal for a particular user
`DELETE`|`/progress/goals/:goalID`|Remove a goal for a particular user
`POST`|`/todo/:userID`|Create a new TODO component
`GET`|`/todo/:userID`|Retrieve all TODO components of given user ID
`DELETE`|`/todo/:todoID`|Delete a TODO components of given todo ID
`POST`|`/timeblock/:userID`|Create a new timeblock section on the calendar
`GET`|`/timeblock/:day/:userID`|Retrieve all the timeblocks for that day on the calendar
`DELETE`|`/timeblock/:timeblockID`|Delete a specified timeblock

***

### Database ER Diagram
![Database ER Diagram](https://github.com/sebinevj/csc342Project/blob/main/FinalProject/diagrams/db-er-diagram-final.png)

***

### Team Member Contributions

#### Doc Bojo (dmbojo)

* Implemented service worker logic utilizing the CacheAPI for handling offline functionalities.
* Added code to gracefully handle the login and register pages if the user is offline.
* Created and populated the Final Project README.

#### Oro Kang (dkang8)

* Updated the calendar styling and functionality.
* Ensured mobile-first design and styling.

#### Sebine Jacobson (svjacobs)

* Updated our filesystem structure for the final project.
* Updated tab structure and integrated the requests into the tabs, which each handle offline functionality.
* Made the app installable by creating a webmanifest. Created app icons and set the fields in the webmanifest.

#### Project Effort Contribution

Milestone|Doc Bojo|Oro Kang|Sebine Jacobson
:--|:-:|:-:|:-:
Milestone 1|33.33%|33.33%|33.33%
Milestone 2|33.33%|33.33%|33.33%
Final|33.33%|33.33%|33.33%
**========**|**=======**|**=======**|**===========**
**TOTAL:**|**100%**|**100%**|**100%**
