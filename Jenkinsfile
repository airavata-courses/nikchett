node {
def app

stage('Clone repository') {

checkout scm

}

stage('Build image') {

    app = docker.build("nikchett/gateway")

}

stage('Deploy'){

    def b = docker.run('--hostname my-rabbit --name hey-rabbit -p 15673:15672 -p 5672:5672 rabbitmq:3-management')

    def c = docker.image('nikchett/gateway').run('-p 3002:3002 --link hey-rabbit:rabbithost')
}

}
