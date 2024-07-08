# react project build
cd ../frontend
npm run build

# index.html, main.js 복사(이동) : dist -> static
cd ../backend
rm -rf src/main/resources/static
mv ../frontend/dist src/main/resources/static
cp -r ../frontend/public src/main/resources/static/

# spring project build
./gradlew bootJar

# build image
docker build -t jungtaewook/arbeit .

# push image
docker push jungtaewook/arbeit

# remote 에서

# 컨테이너 멈추고
ssh -i src/main/resources/secret/key0507.pem ubuntu@54.180.9.228 'docker stop prj3'
# 컨테이너 삭제
ssh -i src/main/resources/secret/key0507.pem ubuntu@54.180.9.228 'docker rm prj3'
# pull image
ssh -i src/main/resources/secret/key0507.pem ubuntu@54.180.9.228 'docker pull jungtaewook/arbeit'
# 컨테이너 실행
ssh -i src/main/resources/secret/key0507.pem ubuntu@54.180.9.228 'docker run -d -p 8080:8080 --restart always --name prj3 jungtaewook/arbeit'