@echo OFF
color 0a
Mode con cols=109 lines=22
:START
:TUNNEL
ngrok -config=ngrok.yml start klg
PAUSE
goto TUNNEL

