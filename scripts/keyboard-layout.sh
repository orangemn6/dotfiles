#!/bin/bash
swaymsg -p -t get_inputs | grep -A 3 1:1:AT_Translated_Set_2_keyboard | tail -n 1 | cut -f6 -d" " | head -c 2 | tr '[:upper:]' '[:lower:]'
