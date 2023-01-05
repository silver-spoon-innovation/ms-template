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

.PHONY: logs
logs:
	docker-compose -p ${project} logs -f ${service}

.PHONY: logs-db
logs-db:
	docker-compose -p ${project} logs -f ${service}-db

.PHONY: ps
ps:
	docker-compose -p ${project} ps

.PHONY: build
build:
	docker-compose -p ${project} build --no-cache

.PHONY: clean
clean: stop build start

.PHONY: add
add: install-package-in-container build

.PHONY: install-package-in-container
install-package-in-container:
	docker-compose -p ${project} exec ${service} npm install -S ${package}

.PHONY: add-dev
add-dev: install-dev-package-in-container build

.PHONY: install-dev-package-in-container
install-dev-package-in-container: start
	docker-compose -p ${project} exec ${service} npm install -D ${package}

.PHONY: shell
shell:
	docker-compose -p ${project} exec ${service} sh

.PHONY: commit-hash
commit-hash:
	@echo $(COMMIT_HASH)