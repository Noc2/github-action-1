import * as core from '@actions/core'
import { context } from '@actions/github'
const io = require('@actions/io')
import { getclas } from './checkcla'
import { lockPullRequest } from './pullRequestLock'
import { addEmptyCommit } from './addEmptyCommit'



export async function run() {
  try {
    const pullRequestNo: number = context.issue.number
    //s   console.log("the context is " + JSON.stringify(context, null, 2))
    core.info('CLA Assistant GitHub Action has started')
    core.info('the PR No is ' + JSON.stringify(pullRequestNo))
    if (context.payload.action === 'closed') {
      return lockPullRequest(pullRequestNo)
    }
    else {
      await getclas(pullRequestNo)
      if (context.payload.comment.body === 'I have read the CLA Document and I hereby sign the CLA') {
        await addEmptyCommit()
      }
      // const rateLimit = await octokit.rateLimit.get()
      // console.log(JSON.stringify(rateLimit.data.resources, null, 4))
    }

  } catch (error) {
    core.setFailed(error.message)
  }

}
run()