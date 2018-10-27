VERSION ?= $(shell git rev-parse HEAD)
APP     ?= fakerai-service-api
IMAGE   ?= gcr.io/matthewdavis-devops/$(APP):$(VERSION)

.PHONY: build

all: build push

build: 	; docker build -t $(IMAGE) .
run: 	; docker run -p 8080:8080 $(IMAGE)
push:	; docker push $(IMAGE)
test:	; curl -XPOST -vv -d '["{{company.companyName}} ({{internet.email}})"]' 'http://localhost:8080/pattern?n=10&unique=true' -H 'Content-type: application/json'

k8/install:

	kubectl apply -f manifests/

k8/delete:

	kubectl delete -f manifests/
