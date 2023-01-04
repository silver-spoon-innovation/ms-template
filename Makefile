default: start

project:=ms-sssm
service:=ms-template
COMMIT_HASH = $(shell git rev-parse --verify HEAD)

.PHONY: start
start:
	docker-compose -p ${project} up -d

.PHONY: stop
stop:
	docker-compose -p ${project} down

.PHONY: restart
restart: stop start

.PHONY: ps
ps:
	docker-compose -p ${project} ps

.PHONY: build
build:
	docker-compose -p ${project} build --no-cache

.PHONY: clean
clean: stop build start

.PHONY: shell
shell:
	docker-compose -p ${project} exec ${service} sh

.PHONY: commit-hash
commit-hash:
	@echo $(COMMIT_HASH)