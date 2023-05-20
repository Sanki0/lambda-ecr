aws ecr --region <region> | docker login -u AWS -p <encrypted_token> <repo_uri>

need to execute docker logout after pushing

docker tag [image name]  [repository Uri]

docker push [repository Uri]