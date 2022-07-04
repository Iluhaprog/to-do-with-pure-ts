"use strict";
const CACHE_NAME = "to-do-app";

const assets = [
    "../",
    "../index.html",
    "../icons/icon-64x64.png",
    "../icons/icon-128x128.png",
    "../icons/icon-256x256.png",
    "/index.js",
    "/main.js",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                cache.addAll(assets);
            })
            .catch((err) => {
                console.error("[SERVICE_WORKER_INSTALL_ERROR] ", err);
            })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
            .catch((err) => {
                console.error("[SERVICE_WORKER_FETCH_ERROR] ", err);
            })
    );
});