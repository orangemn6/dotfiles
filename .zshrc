# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# Lines configured by zsh-newuser-install
HISTFILE=~/.histfile
HISTSIZE=999999999999
SAVEHIST=999999999999
setopt SHARE_HISTORY
# End of lines configured by zsh-newuser-install

source ~/powerlevel10k/powerlevel10k.zsh-theme



# Antigen Stuff

source ~/antigen.zsh
antigen bundle "MichaelAquilina/zsh-auto-notify"
antigen use zsh-auto-notify
export AUTO_NOTIFY_TITLE="Hey! %command has just finished"
export AUTO_NOTIFY_BODY="It completed in %elapsed seconds with exit code %exit_code"





# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
source /home/jacob/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

source /home/jacob/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh

alias screenshot='grim -g "$(slurp)"'

alias apt=apt-fast

alias neofetch='neofetch --loop'

# Import colorscheme from 'wal' asynchronously
# &   # Run the process in the background.
# ( ) # Hide shell job control messages.
# Not supported in the "fish" shell.
(cat ~/.cache/wal/sequences &)

# Which information to display.
# NOTE: If 'ascii' will be used, it must come first.
# Default: first example below
# Valid: space separated string
#
# OFF by default: shell editor wm de palette
PF_INFO="ascii title os host kernel uptime pkgs memory"

# Example: Only ASCII.
PF_INFO="ascii"

# Example: Only Information.
PF_INFO="title os host kernel uptime pkgs memory"

# A file to source before running pfetch.
# Default: unset
# Valid: A shell script
PF_SOURCE=""

# Separator between info name and info data.
# Default: unset
# Valid: string
PF_SEP=":"

# Enable/Disable colors in output:
# Default: 1
# Valid: 1 (enabled), 0 (disabled)
PF_COLOR=1

# Color of info names:
# Default: unset (auto)
# Valid: 0-9
PF_COL1=4

# Color of info data:
# Default: unset (auto)
# Valid: 0-9
PF_COL2=7

# Color of title data:
# Default: unset (auto)
# Valid: 0-9
PF_COL3=1

# Alignment padding.
# Default: unset (auto)
# Valid: int
PF_ALIGN=""

# Which ascii art to use.
# Default: unset (auto)
# Valid: string
PF_ASCII="uhuh"

export PATH="/home/jacob/.emacs.d/bin:/home/jacob/.local/bin:$PATH"

motivate

alias ls=ls_extended

alias nnn='nnn -H'

alias trans='trans -shell -brief'

alias when="sudo dumpe2fs $(mount | grep 'on \/ ' | awk '{print $1}') | grep 'Filesystem created:'"

alias tty-clock="tty-clock -n -t -b -c  "

export CLOUDFLARE_API_KEY=2f54a2d58e250d85033b17cbb43d674d7a301
export CLOUDFLARE_EMAIL=jbensa081@gmail.com
export CLOUDFLARE_SITE=jacobgoldstein.tk

export MOZ_WEBRENDER=1

export DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/1000/bus"

alias nano=vim
alias picom-blur='picom --experimental-backend --blur-method=dual_kawase --blur-strength=4 --inactive-opacity=0.8'

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


#keep this at the bottom
antigen bundle zsh-users/zsh-syntax-highlighting
antigen apply
# -- START ACTIVESTATE DEFAULT RUNTIME ENVIRONMENT
export PATH="/home/jacob/.cache/activestate/bin:$PATH"
# -- STOP ACTIVESTATE DEFAULT RUNTIME ENVIRONME
typeset -g POWERLEVEL9K_INSTANT_PROMPT=quiet

alias spotify="spotify --no-zygote"

alias dsc2fa="oathtool -b --totp '4qjb obm3 yti2 wa6w'"   

alias chrome=chromium

alias pping=prettyping

export DOT_REPO="https://github.com/orangemn6/dotfiles.git"
export DOT_DIR="$HOME/.dotfiles"
fpath=($HOME/.zsh/dot $fpath)  # <- for completion
source $HOME/.zsh/dot/dot.sh
