# Description
This is a sample MERN (Mongo Express ReactJs Node) CRUD app

# Installation
1. `git clone https://github.com/HectorCintron/sample-react-app.git`
2. `cd sample-react-app/`
3. `npm install --prefix ./react-backend && npm install --prefix ./`
4. Mongo:
  * If you would like to sign up for an mlab account, continue with step 5
  * If you are using a pre-existing mlab account move to step 6
  * If you would prefer to roll your own mongo configuration, please reference the ./react-backend/db/index.js and ./react-backend/routes/apps.js files to create your own Mongo connection. Continue to step 8
5. Sign up for an mlab account at [mlab.com](https://mlab.com/signup/) and create a mongo instance and user / password combo. Learn more [here]
6. Run command `touch ./react-backend/db/config.json` from the project root directory
7. `cd ./react-backend/db`
8. Copy and paste the following code into this config.json file (Note: you will want to replace the values below with your appropriate mlab configuration):
  * `{
      "url": "YOUR_MLAB_DB_URL",
      "dbuser": "YOUR_DB_USER",
      "dbpassword": "YOUR_DB_PASSWORD",
    }`
9. In a terminal, type and run: `npm run server`
10. In another terminal, type and run: `npm run start`
11. Happy Coding :)

## Future Improvements or Features
#### In no particular order ...
* UI form validation
* Incorporate Redux
* Create a deployment script to Heroku or AWS
* Rethink and reimplement redirects
* Break the app into smaller, more reusable parts
* Incorporate multi-delete on front page

## Bugs
* There is a minor form console bug with the AppView.jsx file that I will tackle at a future date.

## Issues & Contact
If you have any thoughts, suggestions, bugs or just want to chat about software, please feel free to reach out to me at [hector.cintron.works@gmail.com](hector.cintron.works@gmail.com) or post an issue [here](https://github.com/HectorCintron/sample-react-app/issues)