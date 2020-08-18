import axios from "axios";

export class HttpClient {
  static get(
    url: string,
    endpoint: string = ""
    // query?: { [key: string]: string; }
  ) {
    // const params = new URLSearchParams();
    // Object.keys(query).map((key: string) => params.append(key, query[key]));
    return axios.get(`${url}${endpoint}`).then((response) => {
      return response;
    });
  }
}
