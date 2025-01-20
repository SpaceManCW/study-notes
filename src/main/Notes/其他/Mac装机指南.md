# Mac装机指南-前端环境配置

* 软件安装器：Homebrew

  ```
  // 官网命令安装brew，不好使的话使用下面这个命令
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
* 安装git    brew install git

  ```
  git config --global user.name "" 
  git config --global user.email ""
  ```
* brew install zsh  推荐使用的终端Shell

    ohmyzsh 常用插件[https://github.com/zeus911/blog-3/blob/master/others/oh-my-zsh-common-plugins.md](https://github.com/zeus911/blog-3/blob/master/others/oh-my-zsh-common-plugins.md)

* brew install fnm  node多版本管理工具 [https://github.com/Schniz/fnm#shell-setup](https://github.com/Schniz/fnm#shell-setup)
* brew install autojump   用于在终端快速跳转目录，增强版 cd
* brew install yarn
* brew install --cask  iterm2  目前用的最多评价最好的**终端工具**[https://iterm2.com/](https://iterm2.com/)  item2 主题：[https://draculatheme.com/iterm](https://draculatheme.com/iterm)

```
hosts 目录是  /etc/hosts
vscode 打开 code /etc/hosts
```

使用vscode打开zsh的配置文件

```
open ~/.zshrc -a Visual\ Studio\ Code
```

```
# zsh主题
ZSH_THEME=af-magic

# zsh插件
plugins=(git autojump zsh-autosuggestions zsh-syntax-highlighting aliases)

# 快捷打开vscode
function code {
    if [[ $# = 0 ]]
    then
        open -a "Visual Studio Code"
    else
        local argPath="$1"
        [[ $1 = /* ]] && argPath="$1" || argPath="$PWD/${1#./}"
        open -a "Visual Studio Code" "$argPath"
    fi
}

## 自定义merge命令
function gme(){
   git merge --no-edit  "$1"
}

function gm-s(){
   git merge --no-edit  "$1" --squash
}

# fnm配置
eval "$(fnm env)"
```
