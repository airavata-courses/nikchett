node {
def app

stage('Clone repository') {

checkout scm

}

stage('Build image') {

app = docker.build("nikchett/microserviceflask")

}

stage('Deploy'){

def c = docker.image('nikchett/microserviceflask').run('-p 5000:5000 --link hey-rabbit:rabbithost')
}

}
