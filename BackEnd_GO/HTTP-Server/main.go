package main

import "net/http"

func main() {
	http.HandleFunc("/hello-world", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World"))
	})

	http.HandleFunc("/editor", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./Main front end/index.html")
	})
	http.ListenAndServe(":8080", nil)
}
