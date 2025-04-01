@echo off
echo Moving files to public directory...

:: Copy main files
copy index.html public\
copy -r css public\
copy -r js public\

:: Copy images
copy images\* public\images\

:: Copy downloads
copy downloads\* public\downloads\

echo Done!
pause 