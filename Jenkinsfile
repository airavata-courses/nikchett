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
        def c = docker.image('nikchett/ui17').run('-p 3002:3002')
    }

}
