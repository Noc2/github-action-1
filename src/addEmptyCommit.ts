import octokit from './octokit'
import * as core from '@actions/core'
import { context } from '@actions/github'

export async function addEmptyCommit() {
    core.info(`Adding empty commit with the contributor name who has signed the CLA `)
    try {

        const pullRequestResponse = await octokit.pulls.get({
            owner: context.repo.owner,
            repo: context.repo.repo,
            pull_number: context.payload.issue!.number
        })

        const baseCommit = await octokit.git.getCommit({
            owner: context.repo.owner,
            repo: context.repo.repo,
            commit_sha: pullRequestResponse.data.head.sha
        })

        const tree = await octokit.git.getTree({
            owner: context.repo.owner,
            repo: context.repo.repo,
            tree_sha: baseCommit.data.tree.sha
        })
        await octokit.git.createCommit(
            {
                owner: context.repo.owner,
                repo: context.repo.repo,
                message: 'test Commit',
                tree: tree.data.sha,
                parents: [pullRequestResponse.data.head.sha]
            }
        )
        core.info(`successfully added empty commit with the contributor's signature name who has signed the CLA`)
    } catch (e) {
        core.error(`failed when adding empty commit  with the contributor's signature name `)

    }

}