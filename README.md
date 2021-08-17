# Simple CI/CD Server

This is a simple CI/CD server.

## Requirements

`Node>=14`

## Usage

0. Install node packages with `yarn` or `npm`
1. Add required script into `scripts` directory. (e.g. `hello.sh`)
2. Add excution permission on file so that it can be executable. (e.g. `chmod 700 scripts/hello.sh`)
3. Run server. (`node src/index.js`)
4. To run the script, send a request to the server using the following form.

```
http(s)://{server host}:{server port}/run/{script name without extension}
```

5. Then the script (in this case, `scripts/hello.sh`) will be executed.

Use deploy key for git access. If you run this server with default `docker.sh` script, make a `deploy-keys` directory and put private key in there. Then it will be mounted to `/root/.ssh`.

## Example

To run `hello.sh` example (which is in scripts), send request below to server.

```
http://localhost:8080/run/hello
```

## Caution

This server do not limit permission of script. Do not put dangerous scripts, such as shell script that drops database / shutdown machine / create large files.

It is recommended to run this server in docker.
