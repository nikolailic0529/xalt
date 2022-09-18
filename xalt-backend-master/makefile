.DEFAULT_GOAL := help

colon := :
$(colon) := :

help:
	@ echo "Open 'makefile' to see what targets there are"
	@ echo "'make up' to create everything. 'make down' do take everything down'"


setup:
	bundle

first_setup: setup
	cp .env.example .env
	cp .erdconfig.example .erdconfig

infra:
	docker-compose -f docker-compose/compose.development.yml up -d

migrate: infra
	scripts/migrate.sh

up: setup infra
	bundle exec rails s

down:
	docker-compose -f docker-compose/compose.development.yml stop
	docker-compose -f docker-compose/compose.development.yml down

clean: down
	docker kill $(docker ps -q) || echo "return 0"
	docker rm $(docker ps -a -q) || echo "return 0"
	docker volume rm $(docker volume ls -q) || echo "return 0"
	docker system prune
