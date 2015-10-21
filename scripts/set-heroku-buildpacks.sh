curl -X PUT https://api.heroku.com/apps/ba40e227-764a-41c1-80cb-6a74c946d45c/buildpack-installations \
-H "Accept: application/vnd.heroku+json; version=3" \
-H "Authorization: Bearer ${WRI_HEROKU_API_KEY}" \
-H "Content-Type: application/json" \
-d '{
  "updates": [
    {
      "buildpack": "https://github.com/heroku/heroku-buildpack-nodejs"
    },
    {
      "buildpack": "https://github.com/heroku/heroku-buildpack-php"
    }
  ]
}'
