# /api/bootcamp
set -x
curl -X POST http://localhost:3000/api/bootcamp -H "Content-Type: application/json" -d '{"title": "Introduciendo El Bootcamp de React", "cue": "10", "description": "React es la librería más usada en JavaScript para el desarrollo de interfaces"}' | jq
set +x

echo -e "\n"
sleep 2

set -x
curl http://localhost:3000/api/bootcamp | jq
set +x

echo -e "\n"

sleep 2

set -x
curl http://localhost:3000/api/bootcamp/1 | jq
set +x

echo -e "\n"
