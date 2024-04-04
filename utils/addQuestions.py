import requests 
import json

FILEPATH = "./utils/questions.txt"

with open(FILEPATH, "r") as f:
    lines = f.readlines()

for line in lines:
    if not line.strip():
        continue
    questionString, testCases, tags = line.split("|")
    questionString
    questionString = questionString.strip()
    testCases = testCases.strip()
    tags = tags.strip()
    data = {'questionString':questionString,'testCases': testCases,'tags': tags}
    print(data)

    requests.post("http://127.0.0.1:5050/api/questions/add", json=data)
    