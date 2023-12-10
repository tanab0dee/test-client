import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvEndpointService {

  // Node-Express API endpoint
  ENV_REST_API: string = 'https://test-server-api-ynrr.onrender.com/api';

  constructor() { }
}
