docker run      \
--rm -it        \
-v $(pwd):/app  \
-w /app         \
node:14         \
/bin/bash