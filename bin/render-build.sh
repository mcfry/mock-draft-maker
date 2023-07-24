#!/usr/bin/env bash
# exit on error
set -o errexit

# https://github.com/rails/jsbundling-rails/blob/main/README.md
# https://github.com/rails/cssbundling-rails
# yarn build:css and js build is attached to rake assets:precompile
bundle install
bundle exec rake assets:precompile
bundle exec rake assets:clean

# migrate
bundle exec rake db:migrate