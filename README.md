# owner_api

## Goals

The goal of this structuring is to allow code to be packaged into 'modules':
collections of files all related to a specific purpose/content type packaged
together. This is so it is easy to find all pieces (models, routes, controllers,
tests) related to a content type in the same place, and so it can easily be
picked up and placed in another project. We also wanted to make sure that the
stack was built with testing from the start.

## Installation/Docker Commands

It is intended that you will use [docker](https://docs.docker.com/engine/installation/)
and [docker compose](https://docs.docker.com/compose/install/). You'll need to
copy variables.env.example to variables.env and set the values and then run the
commands below via command line to get started:

---
NOTE: We are going to use a bash alias to make running docker-compose files a bit less verbose. You can run the following to create `docker-compose-local`, `docker-compose-test`, and `docker-compose-deploy` alias commands:
```
echo "alias docker-compose-local='docker-compose --file=docker-compose-local.yml'" >> ~/.bashrc
echo "alias docker-compose-test='docker-compose --file=docker-compose-test.yml'" >> ~/.bashrc
source ~/.bashrc
echo "alias docker-compose-deploy='docker-compose --file=docker-compose-deploy.yml'" >> ~/.bashrc
source ~/.bashrc
```
---

Copy the deploy variables example file:

Copy the variables example file:
`cp docker/variables.env.example docker/variables.env`
(The file needs to exist even if you aren't deploying because docker will complain otherwise)

And if needed modify it:
`nano docker/variables.env`

Run this command:
`docker-compose build`

Then run the container:
`docker-compose up`

You should then be able to access the api at the following url:
`http://localhost:23086`

If you need terminal access inside your application (for example, to install new npm dependencies):

`docker-compose exec owner_api bash`
(Note: exec requires that we choose a service, which is why we have to specify api, which is defined in our docker/docker-compose.yml)

To run a one-off command without having to 'hold' the container open:
`docker-compose run owner_api COMMAND`

For example:
`docker-compose run owner_api npm install`

To stop the container:
`docker-compose stop`

To remove the container's image:
`docker-compose rm`

## Testing

In order to run the test suites, you can either run:

`docker-compose --file=docker-compose-test.yml`

or, if you've aliased the command, the simpler:

`docker-compose-test up`

## Auto Generated API Docs

The API docs are auto-generated with hapi-swagger when the server is running

To start the server, run the Installation/Docker Commands, primarily

`docker-compose up api`

The docs should now be available at http://localhost:23086/documentation

## More In Depth Written Docs

In this repo there is a `docs` folder which contains further documentation. See [Docs](docs/index.md)
