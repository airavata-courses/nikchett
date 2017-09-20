node {
def app

stage('Clone repository') {

checkout scm

}

stage('Build image') {
sh '''docker stop nodeapi'''
sh '''docker rm nodeapi'''
app = docker.build("nikchett/nodeapi")

}

stage('Deploy'){

def c = docker.image('nikchett/nodeapi').run('-p 3001:3001 --name nodeapi --link hey-rabbit:rabbithost')
}

}
