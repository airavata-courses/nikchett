node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build("nikchett/ui19")
    }
    stage('Deploy'){
        def c = docker.image('nikchett/ui19').run('-p 3025:3025')
    }

}
