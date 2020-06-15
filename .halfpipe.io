team: saptech
pipeline: einvoice_api

triggers:
- type: git
  branch: master
  
feature_toggles:
- update-pipeline

tasks:
- type: run
  name: build
  script: build.sh
  save_artifacts: 
  - .
  docker:
    image: node:10.18.0

- type: deploy-cf
  name: stage app in dev env
  api: ((cloudfoundry.api-snpaas))
  space: dev
  manifest: cf/manifest-dev.yml
  deploy_artifact: .