node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build("nikchett/ui17")
    }
    stage('Deploy'){
        docker.image('nikchett/nodeui2').withRun('-p 3002:3002'){ c ->

            sh 'make check'
        }
    }


    stage('Push image') {
        
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("${env.BUILD_NUMBER}")
            app.push(“latest”)
        }
    }
}
