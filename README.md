# Sweeft Acceleration Assignment

Fun and challenging task that I have been given as an assignment from Sweeft Digital.

## Run this locally

1. clone repo
2. `cd` into it
3. run `npm install && npm run dev`
4. the server should be available on `http://127.0.0.1:5173/`

## Task

Write an application where a person can view the user list (picture, name etc.) provided by the API.

Since the amount of users are quite large, only the small parts of the data should be fetched at the time. For this, use **infinite scroll** functionality (Once you have scrolled the whole page, get the next page of the data until the end of the user list).

Each of the user displayed on the page, should be clickable and should take you to their corresponding pages where the full information about this person along with their friend list will be seen. Friend list could be quite large, so use **infinite scroll** here as well.

You can use any technology and approach you like.

**Infinite scroll logic should be implemented by you, without using any external libraries.**

API Documentation - [http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/swagger]
Example - [http://sweeftdigital-intern.s3-website.eu-central-1.amazonaws.com/]
