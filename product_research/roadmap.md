# Roadmap
 
## Note
 
We have decided to make a change in direction since our previous roadmap update, by focusing solely on licencing representatives as the users of our application rather than both licencing reps and event organizers. We feel that this targeted approach will allow us to deliver a more in-depth solution that licencing reps can rely on to provide accurate and reliable leads.
 
**Completed since previous roadmap update**
 
- Built many front-end components of app, including static user interface with organized dashboard for event listings, map view using Google Maps, filter page for event leads, static lead details page, static exporting leads button and manually adding lead pages
- Integrated with Twitter for social media data and PredictHQ for event data
- Created CI based on Docker and basic tests with Jest and Unittest for application in order to streamline the QA process
- Set up local developer environments with script/bootstrap as well as a docker-compose file so developers can easily come in and develop our application
- Deployed application to Heroku in order for users to easily access our site
- Connected to Sentry and LogDNA for error and logs tracking to make our application more robust
- Conducted in-depth user testing with employees who worked in sales. See our ux_research document for more detail. 
 
## Short Term
 
**Duration:** March 2020
 
Having built the majority of the front-end components of the app and completing our initial UX user research studies with it, we intend to integrate improvements based on our findings. This will involve reworking certain aspects of our UI to be more user-friendly and adding features that can help increase productivity. From the results of the user study, this includes making the save functionality for event leads more intuitive. As well as making certain elements clearer and easier to interact with such as the “register” link. 
 
We will also add and modify pages to our application, such as adding a focused page for detailed data analytics with charts and graphs away from the dashboard. This will leave the dashboard focused primarily on the newest and most relevant discovered leads for our users. This was another improvement suggestion from our user study. 
 
While we will be working on making the front-end updates and improvements mentioned above, the main focus during the short-term will now shift to the back-end of our application. Although we completed the front-end components for the ability to view event details, saving functionality for reps to be able to easily prioritise select event leads, statuses for event leads, exporting leads and also manually adding leads. We must now actually work on the backend functionality for these and make it dynamic. 
 
Also, we intend to further collect as much event data as possible during this time through the use of various social media (e.g. Twitter) and event listing API's. Using AI/ML/NLP, we intend to develop technology to allow us to search through this raw data and detect which events and organizers are the most viable licencing targets to approach. This will involve training a model with our data using a Tensorflow classifier and then hosting the model. We are especially trying to detect which events are using music because we aim to prioritize the most viable targets for the licencing reps to view in the application.
 
We aim to perform in-depth analysis on captured data that leads to the most accurate and reliable leads, as well as display relevant information such as confidence ratings and supporting evidence for each of those leads.
 
Throughout this stage, we'll improve our code testing to expand coverage and ensure that the base functionality of our application is stable and secure. This will be included in our CI as we maintain our application. 
 
## Medium Term
 
**Duration:** Q2 2020
 
One of our focuses during this phase will be on improving the accessibility of our application, and making it easy to use for users with disabilities. This will better prepare us for another set of comprehensive user testing, by allowing a larger sample size of users to interact with our application in a meaningful way and provide us with useful feedback.
 
From the user studies we already completed, one of their main feature requests was building a revenue estimation functionality based on which license they should sell to a lead. This would use smart prediction methods to provide them with reliable estimates of how much revenue they can expect to generate from each discovered event lead.
 
Although we already completed user studies with employees in sales, we also want to conduct in-depth user testing with licencing reps who work at PROs. They are our end-users and they would have more insight on specifically what a music license lead generation software should have. From the licencing reps, we also hope to gather feedback regarding our event discovery and priority/viability detection. From this, we can then fine-tune our models and algorithms to perform more effectively. 
 
Throughout this process, we will also conduct testing as any new features or functionality are introduced to the application. We may introduce scraping into our application as well to see if we can improve our ML Models with more data.
 
We also aim to improve the maintainability of our code during this stage, in order to be prepared for an alpha launch. When this phase of user research and touch-ups on our application are done, we're aiming for an alpha launch of our application. This will involve a functional MVP which is deployed and that we can present to demo to a wider audience.
 
## Long Term
 
**Duration:** Q3 2020 and beyond
 
In the long term, our goal is to work on launching the application to production. One step will be to find better hosting infrastructure for our machine learning models. Others include acquiring and setting up a domain, servers, and more.
 
We also intend to expand and integrate with performance rights organizations (PRO's) globally. We hope to have a complete user system that supports licencing reps from different PRO's, with each potentially having unique features and event-targeting priorities based on their own demands and requirements.
 
We also aim to integrate with event organizers globally to deliver region-specific connections to licencing representatives from the most relevant PRO's for their needs.
 
At this point, we may also look at consulting subject matter experts to further optimize certain aspects of our application technology (e.g. AI/ML experts for improved event priority detection).
