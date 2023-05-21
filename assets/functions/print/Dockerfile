# i want to create a golang image that will be pushed to ecr and used as a lambda function

FROM golang AS builder

WORKDIR /go-example
COPY go.mod .

RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /bin/go-example .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
RUN addgroup -S go-example && adduser -S go-example -G go-example
USER go-example
WORKDIR /home/go-example
COPY --from=builder /bin/go-example ./

ENTRYPOINT ["./go-example"]