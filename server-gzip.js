#!/usr/bin/env node

// This program creates a server which returns gzipped html if requested
const zlib = require("zlib");
const http = require("http");
const fs = require("fs");

http.createServer((request,response) =>{
	// Read the data from index.html
	const raw = fs.createReadStream(__dirname+"/index.html");
	const acceptEncoding = request.headers["accept-encoding"] || "";
	// Set response header
	response.setHeader("Content-Type", "text/plain");
	console.log(acceptEncoding);

	// Check if client requested a compressed data
	if(acceptEncoding.includes("gzip")){
			console.log("encoding with gzip");
			// Specify the encoding type in response
			response.setHeader("Content-Encoding","gzip");
			// Compress the data with gzip and add to response
			raw.pipe(zlib.createGzip()).pipe(response);
	}else{
		console.log("no encoding");
		raw.pipe(response);
	}

} ).listen(process.env.PORT || 1337);


