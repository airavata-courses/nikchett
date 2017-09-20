node {
def app

stage('Clone repository') {

checkout scm

}

stage('Build image') {
sh '''docker stop flask'''
sh '''docker rm flask'''
app = docker.build("nikchett/microserviceflask")

}

stage('Deploy'){

def c = docker.image('nikchett/microserviceflask').run('-p 5000:5000 --name flask --link hey-rabbit:rabbithost')
}

}
