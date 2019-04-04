sudo docker stop coercion
sudo docker rm coercion
git pull
sudo docker build -t coercion .
sudo docker run -d -p 80:80 --name=coercion --restart=always coercion