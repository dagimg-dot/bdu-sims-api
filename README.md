# BDU - SIMS - API

This is Unofficial API for Bahir Dar University Student Information Management System built using JavaScript.

## Disclaimer

This API is not officially supported by BDU. It is only for educational purpose.

To use this API, you need to have a valid SIMS login credentials. Which means you need to be a student of Bahir Dar University. If you are not a student and want to use this API to develop your own application for BDU students that's cool too. You should do it 😄😄.

## Usage

### Available Endpoints

| Endpoint                           | Method | Description                                                                    | Auth Required | Response                                    |
| ---------------------------------- | ------ | ------------------------------------------------------------------------------ | ------------- | ------------------------------------------- |
| /api/login                         | POST   | Login to SIMS                                                                  | No            | Token, Your Name and Success message        |
| /api/logout                        | GET    | Logout                                                                         | Yes           | Success message                             |
| /api/status/general                | GET    | Get general grade info for all semesters that the student learned              | Yes           | See [General Status](#general-status)       |
| /api/status/detail/:year/:semester | GET    | Get grade info about a specific semester with all the courses the student took | Yes           | See [Detail Satus](#detail-status)          |
| /api/remaining-courses             | GET    | Get remaining courses that the student will take in the coming semesters       | Yes           | See [Remaining Courses](#remaining-courses) |

- When making a request to the endpoints that require authentication, you need to pass a valid token that you get from `/api/login` endpoint in the header.

### General Status

```json
{
  "generalStatus": [
    {
      "academicyear": "2023/2024",
      "year": "1",
      "semester": "I",
      "registrationDate": "1/24/2024",
      "registrationCondition": "Normal Load",
      "sgpa": "4.00",
      "cgpa": "4.00",
      "prevStatus": "Pass",
      "finalStatus": "Pass"
    },
    {
      "academicyear": "2023/2024",
      "year": "1",
      "semester": "II",
      "registrationDate": "5/7/2024",
      "registrationCondition": "Normal Load",
      "sgpa": "4.00",
      "cgpa": "4.00",
      "prevStatus": "Pass",
      "finalStatus": "Not Complete"
    }
  ]
}
```

### Detail Status

```json
{
  "detailStatus": [
    {
      "courseCode": "SEng2122",
      "courseTitle": "Data Structure and Algorithm",
      "credit": "5",
      "letterGrade": "A",
      "gradePoint": "20",
      "courseStatus": "N",
      "gradeRemark": "Normal"
    },
    {
      "courseCode": "SEng3022",
      "courseTitle": "Computer Organization and Architecture",
      "credit": "5",
      "letterGrade": "A",
      "gradePoint": "20",
      "courseStatus": "N",
      "gradeRemark": "Normal"
    },
    {
      "courseCode": "SEng3122",
      "courseTitle": "Operating Systems and Systems Programming",
      "credit": "7",
      "letterGrade": "A",
      "gradePoint": "28",
      "courseStatus": "N",
      "gradeRemark": "Normal"
    },
    {
      "courseCode": "SEng6022",
      "courseTitle": "Object Oriented Programming",
      "credit": "5",
      "letterGrade": "A",
      "gradePoint": "20",
      "courseStatus": "N",
      "gradeRemark": "Normal"
    },
    {
      "courseCode": "SEng7022",
      "courseTitle": "Fundamental of Networking",
      "credit": "7",
      "letterGrade": "A",
      "gradePoint": "28",
      "courseStatus": "N",
      "gradeRemark": "Normal"
    },
    {
      "courseCode": "Stat4012",
      "courseTitle": "Probability and Statistics",
      "credit": "4",
      "letterGrade": "A",
      "gradePoint": "16",
      "courseStatus": "N",
      "gradeRemark": "Normal"
    }
  ]
}
```

### Remaining Courses

```json
{
  "success": false,
  "message": "This endpoint is not available yet"
}
```

## Built With

- NodeJS
- ExpressJS
- Puppeteer
