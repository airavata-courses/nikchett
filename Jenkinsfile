node {
def app

stage('Clone repository') {

checkout scm

}

stage('Build image') {

app = docker.build("nikchett/nodeapi")

}

stage('Deploy'){

def c = docker.image('nikchett/nodeapi').run('-p 3001:3001 --link hey-rabbit:rabbithost')
}

}
