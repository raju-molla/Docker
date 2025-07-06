
📦 Docker Volume - Full Workflow Guide

This guide walks you through the **complete process** of using Docker volumes to persist data in containers.

---

🔧 Step 1: Create a Docker Volume

Run the following command to create a named volume:

    docker volume create my_volume

Confirm the volume was created:

    docker volume ls

Inspect volume details (optional):

    docker volume inspect my_volume

---

🚀 Step 2: Run a Container with the Volume

Mount the volume into a running container to persist data.

Option A: Using -v flag

    docker run -d \
      -v my_volume:/app/data \
      --name my_container \
      my_image

Option B: Using --mount flag (recommended)

    docker run -d \
      --name my_container \
      --mount source=my_volume,target=/app/data \
      my_image

my_volume is the volume name and /app/data is the directory inside the container where the data will be stored.

---

🧪 Step 3: Test Persistence

1. Exec into the container:

       docker exec -it my_container sh

2. Create a file inside /app/data:

       echo "Hello from container" > /app/data/hello.txt

3. Exit the container and stop/remove it:

       docker stop my_container
       docker rm my_container

4. Run a new container with the same volume:

       docker run -it --rm \
         --mount source=my_volume,target=/app/data \
         alpine sh

5. Check if the file still exists:

       cat /app/data/hello.txt

✅ You’ll see the previous content, confirming persistence.

---

🗃 Step 4: Using Volumes in Docker Compose

You can also declare and mount volumes in a docker-compose.yml file:

    version: '3.9'

    services:
      app:
        image: my_app_image
        volumes:
          - my_volume:/app/data

    volumes:
      my_volume:

To start the service:

    docker-compose up -d

---

🧼 Step 5: Clean Up

Remove a specific volume:

    docker volume rm my_volume

Remove all unused volumes:

    docker volume prune

---

📌 Notes

- Volumes are ideal for:
  - Databases (PostgreSQL, MySQL, MongoDB)
  - Uploads/logs
  - Shared storage between containers

- Volumes live at:
  - /var/lib/docker/volumes (Linux default)

---

✅ Summary

Task                  | Command
-----------------------|------------------------------------------
Create volume         | docker volume create my_volume
Use in container      | --mount source=my_volume,target=/path
List volumes          | docker volume ls
Inspect volume        | docker volume inspect my_volume
Remove volume         | docker volume rm my_volume
Prune unused volumes  | docker volume prune
