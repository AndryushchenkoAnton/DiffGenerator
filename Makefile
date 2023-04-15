install:
	npm ci

link:
	npm link

difference:
	node bin/gendiff.js -h

lint:
	npx eslint .

fix:
	npx eslint --fix .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage