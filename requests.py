import requests
import json


def printResponse(response):
    print("-" * 20)
    print(f"URL: {response.url}")
    print(f"REQUEST:\n{response.request.headers}\n{response.request.body}\n")
    print(f"STATUS:\n{response.status_code}\n")
    try:
        print(f"RESPONSE: {json.dumps(response.json(), indent=4)}\n\n")
    except:
        print("No RESPONSE BODY.")


# Create Users ---------------------------------------------------------------
mateo = {
    "firstName": "Mateo",
    "lastName": "Díaz",
    "email": "mateo.diaz@correo.com",
    "password": "mateo123456",
}

santiago = {
    "firstName": "Santiago",
    "lastName": "Mejías",
    "email": "santiago.mejias@correo.com",
    "password": "santiago123456",
}

lucas = {
    "firstName": "Lucas",
    "lastName": "Rojas",
    "email": "lucas.rojas@correo.com",
    "password": "lucas123456",
}

facundo = {
    "firstName": "Facundo",
    "lastName": "Fernandez",
    "email": "facundo.fernandez@correo.com",
    "password": "facundo123456",
}

signUpUrl = "http://localhost:3000/api/signup"

createMateo = requests.post(signUpUrl, json=mateo)

createSantiago = requests.post(signUpUrl, json=santiago)

createLucas = requests.post(signUpUrl, json=lucas)

createFacundo = requests.post(signUpUrl, json=facundo)


print("Mateo Created:")
printResponse(createMateo)

print("Santiago Created:")
printResponse(createSantiago)

print("Lucas Created:")
printResponse(createLucas)

print("Facundo Created:")
printResponse(createFacundo)

# Sign In --------------------------------------------------------------------

# test unregistered user
signInPostUnreg = requests.post(
    "http://localhost:3000/api/signin",
    json={"email": "myemail@correo.com", "password": "12345"},
)

print("Sing in Unregistered User")
printResponse(signInPostUnreg)

# sign in as Mateo in order to access protected routes
signInPost = requests.post(
    "http://localhost:3000/api/signin",
    json={"email": mateo["email"], "password": mateo["password"]},
)

print("Sign In Post")
printResponse(signInPost)

accessToken = "Bearer " + signInPost.json()["accessToken"]


# Create Bootcamps -----------------------------------------------------------
# bootcamps info:
bootcamp1Data = {
    "title": "Introduciendo El Bootcamp de React",
    "cue": "10",
    "description": "React es la librería más usada en JavaScript"
    + " para el desarrollo de interfaces",
}

bootcamp2Data = {
    "title": "Bootcamp Desarrollo Web Full Stack",
    "cue": "12",
    "description": "Crearás aplicaciones web utilizando las tecnologías y "
    + "lenguajes más actuales y populares como JavaScript, nodeJS, Angular, "
    + "MongoDB, ExpressJs",
}

bootcamp3Data = {
    "title": "Bootcamp Big Data, Inteligencia Artificial & Machine Learning",
    "cue": "18",
    "description": "Domina Data Science todo el ecosistema de lenguages y"
    + "herramientas de Big Data e integrarlos con modelos avanzados de "
    + "Artificial Intelligence y Machine Learning",
}


# create bootcamps
bootcamp1 = requests.post(
    "http://localhost:3000/api/bootcamp",
    headers={"Authorization": accessToken},
    json=bootcamp1Data,
)

print("Create first bootcamp")
printResponse(bootcamp1)

bootcamp2 = requests.post(
    "http://localhost:3000/api/bootcamp",
    headers={"Authorization": accessToken},
    json=bootcamp2Data,
)

print("Create second bootcamp")
printResponse(bootcamp2)

bootcamp3 = requests.post(
    "http://localhost:3000/api/bootcamp",
    headers={"Authorization": accessToken},
    json=bootcamp3Data,
)

print("Create third bootcamp")
printResponse(bootcamp3)

# Add users to bootcamps -----------------------------------------------------

addUsersToBootUrl = "http://localhost:3000/api/bootcamp/adduser"

# add users to bootcamp1:
print("Add Mateo to bootcamp1")
printResponse(
    requests.post(
        addUsersToBootUrl,
        headers={"Authorization": accessToken},
        json={"idBootcamp": "1", "idUser": "1"},
    )
)

print("Add Santiago to bootcamp1")
printResponse(
    requests.post(
        addUsersToBootUrl,
        headers={"Authorization": accessToken},
        json={"idBootcamp": "1", "idUser": "2"},
    )
)

# add users to bootcamp2:
print("Add Mateo to bootcamp2")
printResponse(
    requests.post(
        addUsersToBootUrl,
        headers={"Authorization": accessToken},
        json={"idBootcamp": "2", "idUser": "1"},
    )
)

# add users to bootcamp3
print("Add Mateo to bootcamp3")
printResponse(
    requests.post(
        addUsersToBootUrl,
        headers={"Authorization": accessToken},
        json={"idBootcamp": "3", "idUser": "1"},
    )
)

print("Add Santiago to bootcamp3")
printResponse(
    requests.post(
        addUsersToBootUrl,
        headers={"Authorization": accessToken},
        json={"idBootcamp": "3", "idUser": "2"},
    )
)

print("Add Lucas to bootcamp3")
printResponse(
    requests.post(
        addUsersToBootUrl,
        headers={"Authorization": accessToken},
        json={"idBootcamp": "3", "idUser": "3"},
    )
)


# List all users with their bootcamps
urlAllBootcamps = "http://localhost:3000/api/user"

print("List all users and their bootcamps")
printResponse(
    requests.get(urlAllBootcamps, headers={"Authorization": accessToken})
)

# list user with id 3
print("List user with id 3")
printResponse(
    requests.get(
        "http://localhost:3000/api/user/3",
        headers={"Authorization": accessToken},
    )
)

# update user
print("Update user with id 1")
printResponse(
    requests.put(
        "http://localhost:3000/api/user/1",
        json={"firstName": "Pedro", "lastName": "Sánchez"},
        headers={"Authorization": accessToken},
    )
)

# delete user
print("Delete user with id 4")
printResponse(
    requests.delete(
        "http://localhost:3000/api/user/4",
        headers={"Authorization": accessToken},
    )
)

# list bootcamp 1 with users

# list all bootcamps with their users

# list user by id with bootcamps
