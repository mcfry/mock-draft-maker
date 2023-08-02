#!/usr/bin/env bash
# exit on error
set -o errexit

# https://github.com/rails/jsbundling-rails/blob/main/README.md
# https://github.com/rails/cssbundling-rails
# yarn build:css and js build is attached to rake assets:precompile
# make sure .keep is in builds folder (or have to run precompile twice)

# migrate
bundle install
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate
bundle exec rake custom:unseed_db
bundle exec rake db:seed