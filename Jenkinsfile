node {
def app

stage('Clone repository') {

checkout scm

}

stage('Build image') {
    sh '''docker stop gateway'''
    sh '''docker rm gateway'''
    app = docker.build("nikchett/gateway")

}

stage('Deploy'){

   def c = docker.image('nikchett/gateway').run('-p 3000:3000 --name gateway --link hey-rabbit:rabbithost')
}

}
