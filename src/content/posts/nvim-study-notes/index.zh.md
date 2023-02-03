---
pubDate: '2022-03-12 22:25:44'
---

# Nvim 学习笔记

跟着[官网](https://neovim.io/)走～

刚发现这个和 vimtutor 内容是一样的而且 vimtutor 还有中文翻译，wssb<!--more-->

## Tutor

_Normal_ 模式下键入 `:Tutor <Enter>`

### Lesson 0

- 狂按 `<ESC>` 返回 _Normal_ 模式
- 所有指令在 `Normal` 模式下进行
- `Normal` 模式下按下 `u` 撤销操作
- `Normal` 模式下光标在链接处按下 `<Enter>` 可以打开链接
- `K` 查询光标所在单词读应手册
- `:help` 后面可以跟好多东西，多试一试吧，不要忘记 `<Enter>` !

### Lesson 1

#### Lesson 1.1: 移动光标

- `h`、`j`、`k`、`l` 分别对应左、下、上、右

#### Lesson 1.2: 退出 Vim/Nvim

- `:q! <Enter>` 不保存并退出（ `q` 退出，`!` 强制）

#### Lesson 1.3: 删除内容

- `x` 删除光标对应字符

#### Lesson 1.4: 插入内容

- `i` 在光标前插入内容（进入 _Insert_ 模式）

#### Lesson 1.5: 在行尾添加内容

- `A` 在当前行行尾添加内容（进入 _Insert_ 模式）

#### Lesson 1.6: 编辑一个文件

- `:wq <Enter>` 来保存一个文件并退出 Vim/Nvim
- 打开终端，`$ nvim /path/to/your/file` 使用 Nvim 编辑文件

🌿 怎么原文到这里有个 Lesson 1 的总结，前面看了这么多感觉自己被骗了 w(ﾟ Д ﾟ)w

### Lesson 2

#### Lesson 2.1: 删除指令

- `dw` 从光标处开始向后删除直到遇到下一个单词

#### Lesson 2.2: 更多删除指令

- `d$` 从光标处开始删除直到行尾的内容

#### Lesson 2.3: 组合

- `d` + motion，`d` 表示删除操作，motion 是光标移动的操作，和 `d` 结合起来就是删除光标移动经过的内容
- `w` : 光标移动到下一个单词开头，`dw` 删除直到下一个单词开头
- `e` : 光标移动到当前单词结尾，`de` 删除当前单词
- `$` : 光标移动到行尾，`d$` 将光标当前位置到结尾的内容全部删除（注意和前两种不同，会将行尾的字符一并删除）

#### Lesson 2.4: 给操作指定重复次数

- 移动操作前加上数字，如 `2w`、`3e`

#### Lesson 2.5: 多次删除

- 类似 `d2w`

#### Lesson 2.6: 和整行有关的操作

- `dd` 删除一整行
- `2dd` 删除两行

#### Lesson 2.7: 撤销和重做

- `u` 撤销上一次操作
- `U` 恢复当前行
- `<C-r>` 重做

### Lesson 3

#### Lesson 3.1: PUT 命令

- 按下 `p` 将上次删除的内容插入到光标之后

#### Lesson 3.2: REPLACE 命令

- 按下 `rx` 将光标处内容替换为 `x`

#### Lesson 3.3: CHANGE 操作

- 按下 `ce` 来替换到当前单词词尾的内容

#### Lesson 3.4: 更多 CHANGE 操作

- `c    [number]    motion`

### Lesson 4

#### Lesson 4.1 光标位置和文件状态

- 按下 `<C-g>` 在页面下方显示文件名和光标在当前文件位置信息。
- 按下 `<C-g>` 后，按下 `G` 可以移动到文件最后一行，按下 `gg` 可以移动到文件第一行
- 输入行数（会在页面底部显示）后再按下 `G` 可以跳转到指定行

#### Lesson 4.2 查找指令

- 输入 `/` 后跟内容可以进行查找，按下 `<Enter>`
- 继续按下 `n` 向下查找，`N` 向上查找
- 反向查找，使用 `?` 而不是 `/`
- 按下 `<C-o>` 返回查找前的位置，`<C-i>` 前进

#### Lesson 4.3 括号匹配

- 将光标移动到 `()`、`[]`、`{}` 一边，按下 `%` 将光标移动到另一边

#### Lesson 4.4 替换命令

- `:s/old/new/g` 来将当前行的 "old" 替换成 "new"
- `g` flag 表示将这一行所有的 "old" 替换成 "new"
- `:#,#s` 指定起止行范围
- `:%s` 全文替换
- `c` flag 在替换前进行询问
- 还有其他 flag

### Lesson 5

#### Lesson 5.1: 执行外部命令

- `:!` 后跟完整命令，然后 `<Enter>`

#### Lesson 5.2: 更多有关保存文件的操作

- `:!ls` 列出当前目录所有文件
- `:w TEST` 以 TEST 文件名保存当前编辑内容
- `:!rm TEST` 删除当前目录下的 TEST 文件

#### Lesson 5.3: 保存选择内容到文件

- 按下 `v` 进入 _Visual selection_ 模式
- 移动光标选择内容
- 输入 `:w FILENAME`，底部出现 `:'<,'>w FILENAME` 类似内容
- `<Enter>`

#### Lesson 5.4: 读取和合并文件

- `:r TEST` 从文件 TEST 中读取内容写入到光标位置
- 形似 `:r !ls` 可以读取外部命令的运行结果

### Lesson 6

#### Lesson 6.1: OPEN 命令

- `o` 在光标下新建一行并转到 _Insert_ 模式
- `0` 在光标上新建

#### Lesson 6.2: APPEND 命令

- `a` 从光标后插入内容

#### Lesson 6.3: 替换更多内容

- `R` 进入 _Replace_ 模式，替换更多内容

#### Lesson 6.4: 复制粘贴内容

- `v` 选择内容
- `y` 复制内容
- `j$` 跳到下一行行尾
- `p` 粘贴内容
- 单独的 `y` 行为类似 `yw`

#### Lesson 6.5: SET OPTION

- `:set ic` (Ignore case) 开启忽略大小写
- `:set noic` 关闭忽略大小写
- `:set invic` 切换忽略大小写

### Lesson 7

#### Lesson 7.1: 获取帮助

- `<HELP>`、`<F1>`、`:help` 打开帮助窗口
- `<C-w>` 在窗口之间跳转
- `:q` 关闭帮助窗口
- `:help` 后可跟参数

#### Lesson 7.2: 配置 vimrc 文件

- `:call mkdir(stdpath('config'),'p')`
- `:exe 'edit' stdpath('config').'/init.vim'`

#### Lesson 7.3: 补全

- `<C-d>` 列出
- `Tab` 补全

### 进阶

- [Learn Vim Progressively](http://yannesposito.com/Scratch/en/blog/Learn-Vim-Progressively/)
- [Learning Vim in 2013](http://benmccormick.org/learning-vim-in-2014/)
- [Vimcasts](http://vimcasts.org/)
- [Vim Video-Tutorials by Derek Wyatt](http://derekwyatt.org/vim/tutorials/)
- [Learn Vimscript the Hard Way](http://learnvimscriptthehardway.stevelosh.com/)
- [7 Habits of Effective Text Editing](http://www.moolenaar.net/habits.html)
- [vim-galore](https://github.com/mhinz/vim-galore)

看了感觉跟没看一样 (。・\_・)/~~~
