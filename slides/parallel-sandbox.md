## Tips and Tricks
### Parallel Agents

````md magic-move
```shell
❯ mkdir my-code-repo.git
```
```shell
❯ mv my-code-repo my-code-repo.git
```
```shell
❯ tree .
.
└── my-code-repo.git
    └── my-code-repo
```
```shell
❯ cd my-code-repo.git/my-code-repo
```
```shell
❯ git worktree add ../gemini-agent-worktree1
```
```shell
❯ git worktree add -b feature-1 ../gemini-agent-worktree2
No possible source branch, inferring '--orphan'
Preparing worktree (new branch 'feature-1')
```
```shell
❯ tree .
.
└── my-code-repo.git
    ├── gemini-agent-worktree1
    ├── gemini-agent-worktree2
    └── my-code-repo
```
````
