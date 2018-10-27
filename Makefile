VERSION ?= $(shell git rev-parse HEAD)
APP     ?= fakerai-service-api
IMAGE   ?= gcr.io/matthewdavis-devops/$(APP):$(VERSION)

.PHONY: build

all: build push

build: 	; docker build -t $(IMAGE) .
run: 	; docker run -p 8080:8080 $(IMAGE)
push:	; docker push $(IMAGE)

k8/install:

	kubectl apply -f manifests/

k8/delete:

	kubectl delete -f manifests/
