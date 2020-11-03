coverage run -m unittest tests/test.py
coverage report && coverage xml
codeclimate-test-reporter --token "" --debug

npm test
CODECLIMATE_REPO_TOKEN="" ./node_modules/.bin/codeclimate-test-reporter < coverage/lcov.info