FROM ruby:2.7.2
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
RUN apt-get install -y libasound2-dev libsndfile-dev
RUN mkdir /app
WORKDIR /app
COPY Gemfile Gemfile.lock /app/
#RUN gem update --system
RUN gem install bundler -v 2.2.14
RUN bundle config set without 'development test'
RUN bundle install
RUN mkdir /var/run/puma/
RUN touch /var/run/puma/my_app.sock
RUN chmod -R 777 /var/run/puma/my_app.sock
COPY . /app
EXPOSE 3000
CMD bundle exec rake db:migrate:with_data && \
    bundle exec puma -C config/puma.rb
