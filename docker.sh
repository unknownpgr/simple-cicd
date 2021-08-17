# Docker execute script for development

docker run                             \
--rm -it                               \
-v $(pwd):/app                         \
-v $(pwd)/deploy-key:/root/.ssh        \
-w /app                                \
node:14                                \
/bin/bash