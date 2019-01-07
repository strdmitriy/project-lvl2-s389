install:
	npm install
start:
	npx babel-node -- src/bin/gendiff.js -f
publish:
	npm publish
lint:
	npx eslint .
test:
	jest