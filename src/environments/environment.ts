// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginUrl: 'http://10.0.33.12:8017',
  // loginUrl: 'https://apigateway.myapiservices.net/identity-manager/UserLogin',
  baseUrl: 'http://10.0.33.12:2245',
  centralAdmin: 'http://10.0.33.12:8063'
  // twoFactor: 'http://10.0.33.122:43003/api/v1',
  // nibss: 'http://10.0.33.12:1889',
  // bankUrl: 'http://10.0.33.122:43002',
  // nibssBVN: 'http://10.0.33.12:1090/api/v1',
  // nibssAccNoVal: 'http://10.0.33.122:43001/api/v1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
