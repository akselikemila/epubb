pipeline {
  agent {
    node {
      label 'master'
    }

  }
  stages {
    stage('install') {
      steps {
        sh 'npm install'
      }
    }

    stage('build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('deploy') {
      steps {
        sh 'aws s3 sync build s3://epubb-devel/'
      }
    }

  }
}