pipeline {
  agent {
    node {
      label 'master'
    }
  }
  tools {nodejs "12.17.0"}
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