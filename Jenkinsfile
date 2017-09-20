node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */
        sh '''docker stop $(docker ps -q --filter ancestor=nodeui )'''
        sh '''docker rm $(docker ps -q --filter ancestor=nodeui )'''
        app = docker.build("nodeui")
    }
    stage('Deploy'){
        def c = docker.image('nodeui').run('-p 3002:3002')
    }

}
