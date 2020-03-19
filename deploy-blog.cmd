@echo off

echo Committing to master.
git checkout master
git add --all && git commit -m %1
git push origin --all

echo Deleting old publication.
rd /s /q public
mkdir public
git worktree prune
rd /s /q .git/worktrees/public/

echo Adding to worktree.
git worktree add -B gh-pages public origin/gh-pages

echo Generating site.
hugo --buildFuture

echo Updating gh-pages branch.
cd public && git add --all && git commit -m %1

echo Pushing to GH.
git push origin --all

echo Cleaning up.
cd ..