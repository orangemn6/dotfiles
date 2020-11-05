#!/bin/bash
WALLDIR=~/Pictures/wallpapers/
WALL=$(ls $WALLDIR | fzf -e)
if [ ! -z "$WALL" ];
then
    WALLSTRING=$(echo output \"*\" background "$WALLDIR$WALL" fill)
    swaymsg $WALLSTRING
    cp "$WALLDIR$WALL" $XDG_CONFIG_HOME/sway/wallpaper.png
fi
