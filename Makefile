install:
	npm install
start:
	npx babel-node -- src/bin/gendiff.js -f json beforeTree.json afterTree.json
publish:
	npm publish
lint:
	npx eslint .
test:
	jest