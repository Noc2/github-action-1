# WORK IN PROGRESS

## CLA GitHub Action

We are excited to announce that we are  in development of CLA Assistant Github Action (a light version of CLA Assistant). With this Action, we can get rid of the need of a centrally managed database and rather storing all the contributors data in the repository's file system itself.  This action won't be able to provide all the feature-sets  of the current `CLA Assistant OAuth App`, However, this will work just fine If you want to configure CLA Assistant for a repo and store all the contributors data inside the repository. Feel free to test this GitHub Action and give us the feedback. 

### Advantages
1. decentralized database
1. fully integrated with github environment 
1. no UI is required
1. no need to grant any permission/scope
1. contributors can sign the CLA by posting a Pull Request Comment
1. Signatures will be stored inside the repository 

## Usage 

You can use and test the CLA Action by just adding the below example workflow file to your repository in `.github/workflow/cla.yml`

```yml
name: "CLA Assistant"
on:
  issue_comment:
    types: [created]
  pull_request:
    types: [opened,closed,synchronize]
    
jobs:
  CLAssistant:
    runs-on: ubuntu-latest
    steps:
    - name: "CLA Assistant"
      if: (github.event.comment.body == 'recheckcla' || github.event.comment.body == 'I have read the CLA Document and I hereby sign the CLA') || github.event_name == 'pull_request'
      uses: cla-assistant/github-action@master
      env: 
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with: 
        path-to-signatures: 'signatures/cla.json'
        path-To-cladocument: 'https://github.com/ibakshay/test-action-workflow/blob/master/cla.md'
        branch: 'master'
```
### Environmental Variables :


| Name                  | Requirement | Description |
| --------------------- | ----------- | ----------- |
| `GITHUB_TOKEN`        | _required_ | Must be in the form of `GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}`  ,  CLA Action uses this in-built GitHub token to make the API calls for interacting with GitHub. It is built into Github Actions and does not need to be manually specified in your secrets store. [More Info](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret)|

### Inputs Description :

| Name                  | Requirement | Description |
| --------------------- | ----------- | ----------- |
| `path-To-cladocument`     | _required_ |  provide full URL `https://<clafile>` to the Contributor License Agreement (CLA) to which the Contributor can read  before signing the CLA. It can be a file inside the repository or it can be a gist |
| `path-to-signatures`       | _optional_ |  Path to the JSON file where  all the signatures of the contributors will be stored inside the repository. Default path is  "./signatures/cla.json". |
| `branch`   | _optional_ |  Branch in which all the signatures of the contributors will be stored and Default branch is `master`  |


