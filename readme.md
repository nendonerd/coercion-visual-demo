## How to deploy:

install_docker () {
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  sudo usermod -aG docker $(users)
}

type docker || install_docker

type git || sudo apt-get install git -y

sudo groupadd docker
sudo gpasswd -a $USER docker
sudo service docker restart

IMAGE_NAME=${1:-coercion}
GIT_REPO=${2:-'https://github.com/nendonerd/coercion-visual-demo.git'}

mkdir $IMAGE_NAME
cd $IMAGE_NAME
git clone $GIT_REPO .

sudo docker build -t $IMAGE_NAME .
sudo docker run -d -p 80:80 $IMAGE_NAME