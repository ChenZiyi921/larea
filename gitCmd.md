
# git 常用命令

>拉取代码
git pull -v

>重置成什么分支
git reset --hard release

>强制推送到什么分支
git push origin master -f

>强制推送
git push -f -u origin test1

>push空分支来删除分支
git push origin :master

>一个分支替换另一个分支
git push origin release:dev1 -f

>提交文件并添加备注
git commit -m — 

>向远端推送文件
git push

>查看所有分支
git branch -a

>查看本地分支
git branch

>删除清理文件
git clear

>查看用户名和邮箱地址：
git config user.name
git config user.email

>修改用户名和邮箱地址：
git config --global user.name "username"
git config --global user.email "email"

git stash 暂存修改；

>克隆仓库:
git clone https://github.com/ChenZiyi921/notes.git

>创建本地仓库:
git init

>本地修改
>显示工作路径下已修改的文件：
git status

>显示与上次提交版本文件的不同：
git diff

>把当前所有修改添加到下次提交中：
git add .

>把对某个文件的修改添加到下次提交中：
git add -p <file>

>提交本地的所有修改：
git commit -a

>提交，并将提交时间设置为之前的某个日期:
git commit --date="`date --date='n day ago'`" -am "Commit Message"

>修改上次提交：请勿修改已发布的提交记录!
git commit --amend

>把当前分支中未提交的修改移动到其他分支
git stash
git checkout branch2
git stash pop

>从当前目录的所有文件中查找文本内容：
git grep "Hello"

>在某一版本中搜索文本：
git grep "Hello" v2.5


>从最新提交开始，显示所有的提交记录（显示hash， 作者信息，提交的标题和时间）：
git log

>显示所有提交（仅显示提交的hash和message）：
git log --oneline

>显示某个用户的所有提交：
git log --author="username"

>显示某个文件的所有修改：
git log -p <file>

>谁，在什么时间，修改了文件的什么内容：
git blame <file>

>切换分支：
git checkout <branch>

>创建并切换到新分支:
git checkout -b <branch>

>基于当前分支创建新分支：
git branch <new-branch>

>基于远程分支创建新的可追溯的分支：
git branch --track <new-branch> <remote-branch>

>删除本地分支:
git branch -d <branch>

>给当前版本打标签：
git tag <tag-name>

>列出当前配置的远程端：
git remote -v

>显示远程端的信息：
git remote show <remote>

>添加新的远程端：
git remote add <remote> <url>

>下载远程端版本，但不合并到HEAD中：
git fetch <remote>

>下载远程端版本，并自动与HEAD版本合并：
git remote pull <remote> <url>

>将远程端版本合并到本地版本中：
git pull origin master

>将本地版本发布到远程端：
git push remote <remote> <branch>

>发布标签:
git push --tags

>将分支合并到当前HEAD中：
git merge <branch>

>将当前HEAD版本重置到分支中:请勿重置已发布的提交!
git rebase <branch>

git rebase --abort
解决冲突后继续重置：
git rebase --continue

>使用配置好的merge tool 解决冲突：
git mergetool

>在编辑器中手动解决冲突后，标记文件为已解决冲突
git add <resolved-file>
git rm <resolved-file>

>放弃工作目录下的所有修改：
git reset --hard HEAD

>移除缓存区的所有文件（i.e. 撤销上次git add）:
git reset HEAD

>放弃某个文件的所有本地修改：
git checkout HEAD <file>

>重置一个提交（通过创建一个截然不同的新提交）
git revert <commit>

>将HEAD重置到指定的版本，并抛弃该版本之后的所有修改：
git reset --hard <commit>

>将HEAD重置到上一次提交的版本，并将之后的修改标记为未添加到缓存区的修改：
git reset <commit>

>将HEAD重置到上一次提交的版本，并保留未提交的本地修改：
git reset --keep <commit>

git submodule add 仓库地址 路径

>推送报错 The remote end hung up unexpectedly
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999