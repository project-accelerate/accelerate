set -eo pipefail

export PATH=$(pwd)/node_modules/.bin:$PATH

gulp build
npm run lint
(cd modules/frontend && npm test && codecov)