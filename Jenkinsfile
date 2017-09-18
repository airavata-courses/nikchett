node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build("nikchett/ui25")
    }
    stage('Deploy'){
        def c = docker.image('nikchett/ui25').run('-p 3004:3004')
    }

}
