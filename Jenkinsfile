node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */
        sh '''docker stop uinode'''
        sh '''docker rm uinode'''
        app = docker.build("nodeui")
    }
    stage('Deploy'){
def c = docker.image('nodeui').run('-p 3002:3002 --name uinode')
    }

}
