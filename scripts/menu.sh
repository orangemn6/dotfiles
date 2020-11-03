compgen -c | sort -u | fzf --reverse --prompt "> " --tabstop 4 -e --print-query | tail -n 1 | xargs -r swaymsg -t command exec
#sh ~/.local/share/scripts/print_aliases.sh 
#compgen -c | sort -u | fzf | xargs -r swaymsg -t command exec

