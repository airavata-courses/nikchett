node {
def app

stage('Clone repository') {

checkout scm

}

stage('Build image') {

    app = docker.build("nikchett/gateway")

}

stage('Deploy'){

   def c = docker.image('nikchett/gateway').run('-p 3000:3000 --link hey-rabbit:rabbithost')
}

}
