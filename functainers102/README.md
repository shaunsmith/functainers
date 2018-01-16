# Creating a Hot Function from a Docker Image

This tutorial walks through how to use a custom Docker image to define an
Fn hot function.

1. Login to Docker Hub with `docker login`
2. Run `./build.sh \<docker userid\>`  to build the function container
3. Test the container image by directly passing in a JSON request similar to 
the one Fn will construct when the function is invoked.

  Run `docker run --rm -it \<docker userid\>/functainer102:0.0.1`.  The container
  will run and await input.   Copy and paste the following example JSON request
  into your terminal to send it into the container on standard input:

  ```json
  {
    "call_id": "123",
    "content_type": "application/json",
    "body": {"name": "Tom"},
    "protocol": {
      "request_url": "http://localhost:8080/r/myapp/myfunc"
    }
  }
  ```

  You should see the following output:

  ```json
  {"body":{"greeting":"Hello Tom"},"content_type":"application/json","protocol":{"status_code":200}}
  ```

  If you see the JSON response with the body containing the greeting "Hello Tom" 
  then everything is going perfectly!  So we've got a container that accepts 
  the Fn JSON hot function payload and returns the required JSON response.  Now let's
  move on to using the container as a function by deploying it to Fn. 

3. Run `./push.sh \<docker userid\>` to push the container image to Docker Hub
4. Run `./defineroute.sh \<docker userid\>` to define the `functainer` application
and a route to the container image. 
5. Call the deployed function with the following JSON input:

  ```json
  {"name" : "Tom"}
  ```

  This JSON is the content of `sample-input1.json` so you can invoke the function
  with this input using `fn call functainer /functainer102 < sample-input1.json`.
  The output should be:

  ```json
  {"greeting" : "Hello Tom"}
  ```
