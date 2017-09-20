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
        sh '''docker stop $(docker ps -q --filter ancestor=appui )'''
        def c = docker.image('appui').run('-p 3007:3007')
    }

}
