# xAlt

--Dk: last good commit before changing User to Profile

## Installation

Follow these easy steps to install and start the app:

### Set up dependencies

Install `graphviz` dependency for rails-erd (https://github.com/voormedia/rails-erd):

For MacOS:

    brew install graphviz

For Linux:

    sudo apt install graphviz

### Set up Rails app

First, install the gems required by the application:

    bundle

Prepare config-files:

    cp .env.example .env
    cp .erdconfig.example .erdconfig

Next, execute the database migrations/schema setup:

    docker-compose -f docker-compose/development-compose.yml up -d / docker-compose -f docker-compose/compose.development.yml down
    bundle exec rake db:create
    bundle exec rake db:migrate:with_data
***NOTE***
  Use `rake db:migrate:with_data` instead of `rake db:migrate`

## Running the app

    bundle exec rails s

## Chat testing
For testing chat from browser use:  <https://chrome.google.com/webstore/detail/browser-websocket-client/mdmlhchldhfnfnkfmljgeinlffmdgkjo>

Connect to websocket:
`ws://localhost:3000/cable?access_token=Gwo8xjfghbeN0k_l9y3zqg&access_client=s-zYzPxJZXYNHrH8SUP-NA&access_uid=coach1@example.com`
Connect to channel:
```json
{
  "command":"subscribe",
  "identifier":"{\"channel\":\"ConversationChannel\",\"conversation_id\":\"742a15db-4dc3-4d5b-99a7-ee93ccf619a6\"}"
}
```

## Github/Git WorkFlow
1. The naming of the branches should be as follows `XALT-123/ticket_name`
2. All comments must start with the prefix `[XALT-123]`, for automation you need to use a commit hook `prepare-commit-msg` which is oriented on the branch name! prepare-commit-msg file included in root of project, you need copy them in to `.git/hooks/` and make it executable
3. We rebase the development branch from the master, not make a merge commit!
4. The PR is named as follows:
	1. If development is still underway then `[WIP][XALT-213] What we do or ticket title'.
	2. If development in the PR is over, remove the prefix `[WIP]`, which means that the PR is ready for review
5. PRs are merged into the master branch by rebase (comments may be squashed beforehand)
