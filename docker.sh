# Docker execute script for development

docker run                             \
--rm -it                               \
-v $(pwd):/app                         \
-v $(pwd)/deploy-keys:/root/.ssh        \
-w /app                                \
node:14                                \
/bin/bash