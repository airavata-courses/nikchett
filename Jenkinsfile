node {
def app

stage('Clone repository') {

checkout scm

}

stage('Build image') {

app = docker.build("nikchett/microserviceFlask")

}

stage('Deploy'){

def c = docker.image('nikchett/microserviceFlask').run('-p 5000:000 --link hey-rabbit:rabbithost')
}

}
