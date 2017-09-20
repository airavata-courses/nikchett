node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */
            app = docker.build("appui")
    }
    stage('Deploy'){

def c = docker.image('appui').run('-p 3015:3015')
    }

}
