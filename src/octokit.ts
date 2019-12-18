import { GitHub } from '@actions/github'

const octokit = new GitHub(process.env.pat as string)

export default octokit 