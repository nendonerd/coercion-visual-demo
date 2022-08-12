# Coercion Visual Demo
this is an interactive demo about javascript type coercion in '==' (loosy equalling operator)
It follows the complicated [ECMA spec coercion rules](https://262.ecma-international.org/5.1/#sec-11.9.3) to show every step of type conversions happened in a coercion.

## [Online Example](https://coercion.live)
## [My Blog](https://nendo.ml)


## Running in Cloud
> Warning: I have only test my automation script on Google Cloud Platform. If you're running them on any other host, I'm assuming you know how to modify bash script to fix potential failures.

### How to deploy:

create a new vm that runs latest debian, then ssh into it and paste the following
```
wget https://raw.githubusercontent.com/nendonerd/coercion-visual-demo/master/deploy.sh
sudo chmod 777 deploy.sh
./deploy.sh
```
deploy.sh can accept two OPTIONAL parameters, `./deploy.sh <name> <repo>`
- `<name>` will be the project folder name, docker image name and docker container name, the default value for `<name>` is 'coercion'
- `<repo>` is the git remote location to pull down the project. the default value is https://github.com/nendonerd/coercion-visual-demo.git

After finished installation, it will show your external ip address at the bottom, copy it and paste into a browser, have fun!

### How to update:
```
cd cocercion
sudo chmod 777 update.sh
./update.sh
```

## Running in local
<!-- ## You can run the coercion.js without the bloated html
```
node coercion.js
``` -->
### just simply open index.html with a browser

### Or run in inside vscode locally with quokka.js pro plugin
Shift + Cmd + P -> quokka start


## Todo list:
- [x] add quick tests to frontend
- [x] unit testing
- [x] fix JSON.stringify(NaN) => null bug
- [x] fix double result bug
- [ ] add a domain for the example
- [ ] better css visuals (type highlighting)
- [ ] node interface
