import * as core from '@actions/core'
import * as github from '@actions/github'
import { context } from '@actions/github'
import { getclas } from '../src/checkcla'
import { lockPullRequest } from '../src/pullRequestLock'
import { run } from '../src/main'
import { mocked } from 'ts-jest/utils'

jest.mock('@actions/core')
jest.mock('@actions/github')
jest.mock('../src/pullRequestLock')
const mockedLockPullRequest = mocked(lockPullRequest)


describe('Pull request event', () => {

  beforeEach(async () => {
    // @ts-ignore
    github.context = {
      eventName: 'pull_request',
      ref: 'refs/pull/232/merge',
      workflow: 'CLA Assistant',
      action: 'ibakshaygithub-action-1',
      actor: 'ibakshay',
      payload: {
        action: 'closed',
        number: '1',
        pull_request: {
          number: 1,
          title: 'test',
          user: {
            login: 'ibakshay',
          },
        },
        repository: {
          name: 'auto-assign',
          owner: {
            login: 'ibakshay',
          },
        },
      },
      repo: {
        owner: 'ibakshay',
        repo: 'auto-assign',
      },
      issue: {
        owner: 'kentaro-m',
        repo: 'auto-assign',
        number: 1,
      },
      sha: ''
    }
  }
  )

  test('the lockPullRequest  method should be called if there is a pull request merge/closed', async () => {
    //const octokit = new GitHub('token')
    mockedLockPullRequest.mockImplementation(async () => { })
    await run()
    if (context.payload.action === 'closed') {
      expect(mockedLockPullRequest).toHaveBeenCalled()
    }

  })

  test('the lockPullRequest  method should not be called if there is a pull request opened', async () => {
    //const octokit = new GitHub('token')
    mockedLockPullRequest.mockImplementation(async () => { })
    await run()
    if (context.payload.action === 'opened') {
      expect(mockedLockPullRequest).not.toHaveBeenCalled()
    }

  })

  test('the lockPullRequest  method should not be called if there is a pull request sync', async () => {
    //const octokit = new GitHub('token')
    mockedLockPullRequest.mockImplementation(async () => { })
    await run()
    if (context.payload.action === 'synchronize') {
      expect(mockedLockPullRequest).not.toHaveBeenCalled()
    }

  })


})