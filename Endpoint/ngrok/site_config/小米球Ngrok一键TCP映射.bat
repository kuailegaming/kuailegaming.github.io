@echo OFF
color 0a
Mode con cols=109 lines=22
:START
:TUNNEL
ngrok http -config=ngrok_neo.yml -subdomain=klgaming 80
PAUSE
goto TUNNEL