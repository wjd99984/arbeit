# react project build
cd ../frontend
npm run build

# index.html, main.js 복사(이동) : dist -> static
cd ../backend
rm -rf src/main/resources/static
mv ../frontend/dist src/main/resources/static
cp -r ../frontend/public src/main/resources/static

# spring project build
./gradlew bootJar

# build image
docker build -t jeonghyeon123/alba-connector .

# push image
docker push jeonghyeon123/alba-connector

# remote 에서

# 컨테이너 멈추고
ssh -i src/main/resources/secret/key0527.pem ubuntu@43.201.25.153 'docker stop alba-connector'
# 컨테이너 삭제
ssh -i src/main/resources/secret/key0527.pem ubuntu@43.201.25.153 'docker rm alba-connector'
# pull image
ssh -i src/main/resources/secret/key0527.pem ubuntu@43.201.25.153 'docker pull jeonghyeon123/alba-connector'
# 컨테이너 실행
ssh -i src/main/resources/secret/key0527.pem ubuntu@43.201.25.153 'docker run -d -p 8080:8080 --restart always --name alba-connector jeonghyeon123/alba-connector'