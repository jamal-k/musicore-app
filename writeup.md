## Login:
- Login with email and password
- Users are stored in a database with hashed passwords
- JWT token is used and stored in local storage 
- Allows user to stay logged in
- User can logout by click on the top right for their email and -> logout

## Dashboard:
- Metrics at the top showing summarizations of the leads and revenue values for this month. Conversion rate which shows how many leads changed into successful leads (i.e acutally sold) which is an important metric.
- Also shows change in percentage last month.
- Then shows the leads on a map, to show where leads are concentrated (not clickable yet). Also has leads in a list view on the right. 
- On the bottom there are data chart visualizations, showing the leads number per month over the year as well as the revenue. Also shows successful leads by category and venue in a doughnut chart.

## Lead Details:
- Clicking on a lead from the dashboard or lead data page takes you a page with more details on that lead.
- Here you can see the lead title, date, category, revenue, confidence score etc.
- The confidence score is based on the generation process at the bottom. We use layers of data analysis (first checking its category, e.g if it is a political event vs performing arts event, the performing arts event has more confidence for using music). Then we look for tweets and the event description for any mention of the use of music using NLP. The NLP is currently using Snips-NLU and doesn't work very well and could be improved. We also made a small ML model using tensorflow based on fake "successful" leads, however since the dataset is very small as of now we put little confidence on this part. 
- You can also change the status of the lead to show how long you are with it. This could be helpful for a PRO rep. You can also save a lead to go back to it (this is different from the status).

## Lead Data:
- Going to the lead data page shows you all the leads for a PRO.
- Leads are loaded from the PredictHQ API and seeded into the database. 
- Here you can filter the leads based on title, location (with fuzzy filter), confidence etc. More filters can be added. 
- You can also export the leads into a csv. There are sometimes formatting issues with this one because of the commas.

## Add Lead:
- You can add a lead into the database to better keep track of all of them, in case there are leads that the app doesn't have or you want to keep track of previous leads.
- We ask for latitutde and longtitude directly in order to place a marker on the map however this can be improved by getting it directly from the address. As well, we should do more error checking on the input.
- The load data (e.g loading multiple leads from a csv at once) doesn't work at the moment (if you click it will show an upload box though) however we didn't consider this a main flow. 