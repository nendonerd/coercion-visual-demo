install_docker () {
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  sudo usermod -aG docker $(users)
}

type docker || install_docker

type git || sudo apt-get install git -y

IMAGE_NAME=${$1:-instance}

sudo docker build -t IMAGE_NAME .
sudo docker run -d -p 80:80 IMAGE_NAME