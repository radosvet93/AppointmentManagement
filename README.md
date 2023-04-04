# DevProjects - Appointment management system

This is an open source project from [DevProjects](http://www.codementor.io/projects). Feedback and questions are welcome!
Find the project requirements here: [Appointment management system](https://www.codementor.io/projects/web/appointment-management-system-compu19a0t)

## Tech/framework used

- React
- Express

## Screenshots and demo
![screencapture-127-0-0-1-3001-dashboard-2023-04-04-06_40_43](https://user-images.githubusercontent.com/18429009/229698124-b3ff4015-765f-462c-8ab2-ea7f4a1cb349.png)


## Installation
```
npm install
```

Create a ```.env``` file with:
```
MONGOOSE_DB=mongo db URL for the DB
JWT_SECRET=some secret for JWT
```
## License

[MIT](https://choosealicense.com/licenses/mit/)
Most open source projects use the MIT license. Feel free to choose whichever license you prefer.

## Introduction

An appointment management system is a software used by companies and service providers to streamline their service appointments. By using the system, potential customers can know and choose their preferred appointment times according to the companies and service providers' available time slots. This project does not include a B2C marketplace-like interface for customers to browse different service providers.

## Requirements

1. Create a login system for users to register an account with the system. You may add social logins like Google or Facebook to enhance the sign up/sign in user experience.
2. Use a third party JavaScript library or plugin to display a calendar with the available time slots for selected time periods (e.g. a week).
3. A business side admin dashboard for businesses to manage available appointment times and future appointments.
4. A customer interface where customers can schedule, view, or cancel their appointments with a business.
5. Use the simplest scheduler (cron job) to send customers email reminders prior to their appointments.

## Suggested Implementation

- Create a simple login system for registration. Alternatively, use Google, Facebook, or other social login integrations for sign up/sign in.
- Use third party JavaScript calendar like FullCalendar or Javascript event calendar.
- Create a form for logged in customers. The form will allow customers to book an appointment in the upcoming week.
- Create a report where businesses can view the scheduled appointments.
- Allow customers to view and edit their appointments (e.g. reschedule or cancel).
- Allow businesses to change the status of the event (e.g. confirmed, paid, cancelled).
