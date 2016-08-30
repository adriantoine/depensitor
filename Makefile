build:
	cd packages/depensitor; ../../node_modules/.bin/rollup -c ./rollup.config.js

test:
	./node_modules/.bin/xo && NODE_ENV=test ./node_modules/.bin/nyc --cache --reporter=text ./node_modules/.bin/ava

lerna-publish:
	./node_modules/.bin/lerna publish --only-explicit-updates

publish: test build lerna-publish
