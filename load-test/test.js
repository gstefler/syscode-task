import http from "k6/http";
import { check } from "k6";

export let options = {
  iterations: 10000,
  vus: 100,
};

export default function () {
  let uniqueId = `${__VU}-${__ITER}`;
  let payload = JSON.stringify({
    address: "string",
    name: "string",
    email: `student-${uniqueId}@example.com`,
  });

  let params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = http.post(
    "http://host.docker.internal:4000/student",
    payload,
    params
  );

  check(res, {
    "status is 200 or 201": (r) => r.status === 200 || r.status === 201,
  });
}
