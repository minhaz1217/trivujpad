FROM nginx:alpine
COPY . /usr/share/nginx/html


# To build
# docker build -t trivujpad-image .

# To run
# docker run -d -p 8004:80 --name trivujpad --network minhazul-net trivujpad-image